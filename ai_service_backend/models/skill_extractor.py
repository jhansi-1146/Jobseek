import re
import os
import json
import logging
from typing import List, Tuple, Optional
import spacy
from dotenv import load_dotenv

# Optional: load .env
load_dotenv()

# Logging
logger = logging.getLogger(__name__)
if not logger.handlers:
    h = logging.StreamHandler()
    h.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    logger.addHandler(h)
    logger.setLevel(logging.INFO)

# Load spaCy model with graceful fallback
try:
    nlp = spacy.load("en_core_web_sm")
except Exception:
    nlp = spacy.blank("en")

# Try to import sentence-transformers for higher-quality embeddings; gracefully fall back
try:
    from sentence_transformers import SentenceTransformer
    _ST_MODEL = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("Loaded SentenceTransformer model for embeddings")
except Exception:
    _ST_MODEL = None
    logger.info("SentenceTransformer not available; falling back to spaCy similarity")


class SkillExtractor:
    SKILLS = [
        "python", "java", "c", "c++", "sql", "javascript", "html", "css",
        "react", "react.js", "fastapi", "docker", "git",
        "machine learning", "deep learning", "rest api", "streamlit", "n8n",
        "oracle", "mysql", "mongodb", "creative thinking", "problem solving", "gemini api",
        "langchain"
    ]

    INVALID_NAMES = SKILLS + [
        "developer", "engineer", "resume", "curriculum vitae",
        "profile", "student", "technologies", "frameworks", "skills"
    ]

    @staticmethod
    def extract_with_gemini(text: str):
        # Stub: external LLM integration can be implemented here if needed
        return None

    @staticmethod
    def extract_entities(text: str) -> Tuple[str, str, str]:
        """Return (name, email, phone). Avoid returning tech lists as names."""
        name, email, phone = "", "", ""
        tech_set = set([s.lower() for s in SkillExtractor.SKILLS])
        invalid_lower = set([s.lower() for s in SkillExtractor.INVALID_NAMES])
        heading_blacklist = set([
            "learning", "basics", "course", "courses", "summary", "about", "objective",
            "profile", "certification", "certifications", "projects", "introduction", "overview",
            "contact"
        ])

        def is_name_candidate(s: str) -> bool:
            s = s.strip().strip("|")
            # Reject if very short or contains punctuation typical of lists
            if not s or len(s) < 3:
                return False
            if re.search(r"[@:\/\\]|\d", s):
                return False
            # tokens should be alphabetic name-like tokens
            tokens = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ'-]+", s)
            if len(tokens) < 2 or len(tokens) > 4:
                return False
            # tokens should be titlecase or initials
            if not all(t[0].isupper() for t in tokens if t):
                return False
            # reject if any token matches known tech words
            if any(t.lower() in tech_set or t.lower() in invalid_lower for t in tokens):
                return False
            # reject if the whole candidate matches any known multi-word skill (e.g., 'machine learning')
            cand_norm = " ".join(t.lower() for t in tokens)
            for sk in SkillExtractor.SKILLS:
                if sk.lower() == cand_norm:
                    return False
            # reject candidates containing heading-like words (e.g., 'Learning', 'Basics')
            if any(t.lower() in heading_blacklist for t in tokens):
                return False
            # reject common tech suffixes
            if re.search(r"\.js\b|\.ts\b|\bjs\b|\bts\b", s, re.I):
                return False
            return True

        # split into lines and preserve indices
        raw_lines = [ln for ln in text.splitlines()]
        lines = [ln for ln in raw_lines if ln.strip()]
        candidate_lines = []
        for i, ln in enumerate(lines):
            if re.search(r"^(skills|technical|frameworks|projects|experience|education|contact)\b", ln, re.I):
                continue
            candidate_lines.append((i, ln.strip()))

        # find email line index if present
        email_idx = None
        for i, ln in enumerate(lines):
            if re.search(r"[\w\.-]+@[\w\.-]+", ln):
                email_idx = i
                break

        # 1) Try spaCy PERSON entities first, prefer entities near top or near email
        try:
            doc = nlp(text)
            for ent in doc.ents:
                if ent.label_ == "PERSON":
                    ent_text = ent.text.strip()
                    # estimate line number
                    pos = text.find(ent_text)
                    line_no = text[:pos].count("\n") if pos >= 0 else 0
                    near_top = line_no <= 8
                    near_email = email_idx is not None and abs(line_no - email_idx) <= 6
                    if (near_top or near_email) and is_name_candidate(ent_text):
                        name = ent_text
                        break
        except Exception:
            pass

        # 2) Fallback: prefer candidates above the email, then top lines
        if not name:
            if email_idx is not None:
                # search up to 6 lines above the email for a candidate
                start = max(0, email_idx - 6)
                for i in range(email_idx, start - 1, -1):
                    chunk = re.split(r"[|,-]", lines[i])[0].strip()
                    if not chunk:
                        continue
                    if re.search(r"[\w\.-]+@[\w\.-]+", chunk) or re.search(r"\+?\d", chunk):
                        continue
                    tokens = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ'-]+", chunk)
                    if tokens:
                        skill_token_count = sum(1 for t in tokens if t.lower() in tech_set)
                        if skill_token_count / max(1, len(tokens)) > 0.4:
                            continue
                    if any(t.lower() in heading_blacklist for t in tokens):
                        continue
                    if is_name_candidate(chunk):
                        name = chunk
                        break

            if not name:
                # check top candidate lines
                for idx, ln in candidate_lines[:8]:
                    chunk = re.split(r"[|,-]", ln)[0].strip()
                    if not chunk:
                        continue
                    chunk_lower = chunk.lower()
                    if any(sk.lower() in chunk_lower for sk in SkillExtractor.SKILLS):
                        continue
                    tokens = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ'-]+", chunk)
                    if any(t.lower() in heading_blacklist for t in tokens):
                        continue
                    if is_name_candidate(chunk):
                        name = chunk
                        break

        # 3) Extract email and phone
        m = re.search(r"[\w\.-]+@[\w\.-]+\.[A-Za-z]{2,}", text)
        if m:
            email = m.group(0)
        p = re.search(r"(\+?\d[\d\s\-\(\)]{6,}\d)", text)
        if p:
            phone = p.group(0)

        # 4) Last resort: external LLM (not implemented by default)
        if not name:
            llm = SkillExtractor.extract_with_gemini(text)
            if llm:
                try:
                    data = json.loads(llm)
                    cand = data.get("name", "").strip()
                    if cand and is_name_candidate(cand):
                        name = cand
                    if not email:
                        email = data.get("email", "")
                    if not phone:
                        phone = data.get("phone", "")
                except Exception:
                    pass

        # Normalize name: strip trailing separators and convert all-caps to title case
        if name:
            name = name.strip().strip("|,;")
            # If name is in ALL CAPS, convert to title case
            letters = [c for c in name if c.isalpha()]
            if letters and all(c.isupper() for c in letters):
                name = name.title()

        return name or "", email or "", phone or ""

    @staticmethod
    # --- Skill extraction utilities ---------------------------------
    @staticmethod
    def _skill_synonyms() -> dict:
        """Return a mapping of canonical skill -> list of synonyms/aliases.

        Keep this small and extendable. All values should be lowercased.
        """
        return {
            "javascript": ["javascript", "js"],
            "python": ["python", "py"],
            "java": ["java"],
            "c": ["c"],
            "c++": ["c++", "cpp"],
            "sql": ["sql"],
            "react": ["react", "react.js", "reactjs"],
            "fastapi": ["fastapi"],
            "docker": ["docker"],
            "git": ["git"],
            "mysql": ["mysql"],
            "mongodb": ["mongodb", "mongo"],
            "machine learning": ["machine learning", "ml"],
            "rest api": ["rest api", "restapi", "rest"],
        }

    @staticmethod
    def _build_skill_patterns():
        """Compile regex patterns for each canonical skill and its synonyms.

        Returns a list of tuples (canonical, compiled_pattern).
        """
        patterns = []
        syn = SkillExtractor._skill_synonyms()
        for canonical, aliases in syn.items():
            # join aliases with alternation, use word boundaries for robust matching
            escaped = [re.escape(a) for a in aliases]
            pat = r"\b(?:" + r"|".join(escaped) + r")\b"
            patterns.append((canonical, re.compile(pat, flags=re.I)))
        return patterns

    @staticmethod
    def _canonical_alias_list() -> List[str]:
        """Return flat list of canonical names and aliases (lowercased)."""
        syn = SkillExtractor._skill_synonyms()
        flat = []
        for canon, aliases in syn.items():
            for a in aliases:
                flat.append(a.lower())
        # include canonical forms too
        for c in syn.keys():
            if c not in flat:
                flat.append(c.lower())
        return sorted(set(flat))

    @staticmethod
    def _embed_texts(texts: List[str]) -> Optional[List[List[float]]]:
        """Return embeddings for texts using SentenceTransformer if available, otherwise spaCy vectors.

        Returns None if neither model provides vectors.
        """
        if not texts:
            return []
        # Prefer sentence-transformers for quality
        if _ST_MODEL is not None:
            try:
                embs = _ST_MODEL.encode(texts, convert_to_numpy=True).tolist()
                return embs
            except Exception as e:
                logger.warning("SentenceTransformer encoding failed: %s", e)
        # Fall back to spaCy
        try:
            docs = [nlp(t) for t in texts]
            # Ensure spaCy provides non-empty vectors (avoid all-zero vectors from small models)
            vecs = []
            for d in docs:
                if not hasattr(d, 'vector') or d.vector is None:
                    vecs = []
                    break
                vecs.append(d.vector.tolist())
            if vecs:
                # compute norms; if all norms are effectively zero, treat as unavailable
                norms = []
                for v in vecs:
                    s = sum(x * x for x in v) ** 0.5
                    norms.append(s)
                if max(norms) < 1e-6:
                    # vectors are essentially zero -> not useful
                    return None
                return vecs
        except Exception as e:
            logger.debug("spaCy embedding fallback failed: %s", e)
        return None

    @staticmethod
    def _cosine(a: List[float], b: List[float]) -> float:
        # small, dependency-free cosine similarity
        try:
            import math
            sa = sum(x * x for x in a) ** 0.5
            sb = sum(x * x for x in b) ** 0.5
            if sa == 0 or sb == 0:
                return 0.0
            dot = sum(x * y for x, y in zip(a, b))
            return dot / (sa * sb)
        except Exception:
            return 0.0

    @staticmethod
    def extract_skills_enhanced(text: str, similarity_threshold: float = 0.72) -> dict:
        """Enhanced skill extraction that uses embeddings + synonym mapping.

        Returns a dict with keys:
          - recognized_skills: list of {span, match, canonical, confidence}
          - normalized_skills: list of unique canonical skill strings (lowercased)

        The similarity_threshold controls how close an embedding match must be to be accepted.
        If embeddings are not available, fallback to regex matching with lower confidence scores.
        """
        result = {"recognized_skills": [], "normalized_skills": []}
        if not text:
            return result

        # Prepare canonical mapping from aliases to canonical
        syn = SkillExtractor._skill_synonyms()
        alias_to_canon = {}
        for canon, aliases in syn.items():
            for a in aliases:
                alias_to_canon[a.lower()] = canon.lower()
            alias_to_canon[canon.lower()] = canon.lower()

        # Candidate spans: split on common separators and also consider sliding n-grams up to 3 words
        clean = re.sub(r"[\r\n]+", " \n ", text)
        tokens = re.findall(r"[A-Za-z0-9\.#\+\-]+", clean)
        candidates = set()
        for n in range(1, 4):
            for i in range(len(tokens) - n + 1):
                cand = " ".join(tokens[i:i + n])
                candidates.add(cand)

        candidates = sorted(candidates, key=lambda s: (-len(s), s))

        # Build embedding lists for canonical aliases
        alias_list = SkillExtractor._canonical_alias_list()
        alias_embs = SkillExtractor._embed_texts(alias_list)
        # Build embeddings for candidates
        cand_embs = SkillExtractor._embed_texts(candidates)

        if alias_embs is not None and cand_embs is not None:
            # vector-based matching
            for ci, cand in enumerate(candidates):
                best_sim = 0.0
                best_alias = None
                for ai, alias in enumerate(alias_list):
                    sim = SkillExtractor._cosine(cand_embs[ci], alias_embs[ai])
                    if sim > best_sim:
                        best_sim = sim
                        best_alias = alias
                confidence = float(best_sim)
                if best_alias and confidence >= similarity_threshold:
                    canon = alias_to_canon.get(best_alias.lower(), best_alias.lower())
                    result["recognized_skills"].append({
                        "span": cand,
                        "match": best_alias,
                        "canonical": canon,
                        "confidence": round(confidence, 3)
                    })
            # If embedding-based matching found nothing, fall back to regex-based matching
            if not result["recognized_skills"]:
                patterns = SkillExtractor._build_skill_patterns()
                lowered = text.lower()
                found_canons = set()
                for canonical, pattern in patterns:
                    for m in pattern.finditer(lowered):
                        span = m.group(0)
                        result["recognized_skills"].append({
                            "span": span,
                            "match": span,
                            "canonical": canonical,
                            "confidence": 0.5
                        })
                        found_canons.add(canonical)
                if not result["recognized_skills"]:
                    # as an extra fallback, use the original extract_skills
                    simple = SkillExtractor.extract_skills(text)
                    for s in simple:
                        result["recognized_skills"].append({
                            "span": s,
                            "match": s,
                            "canonical": s,
                            "confidence": 0.5
                        })
                        found_canons.add(s)
                normalized = list(found_canons)
        else:
            # fallback to regex matching with lower confidence
            patterns = SkillExtractor._build_skill_patterns()
            lowered = text.lower()
            found_canons = set()
            for canonical, pattern in patterns:
                for m in pattern.finditer(lowered):
                    span = m.group(0)
                    result["recognized_skills"].append({
                        "span": span,
                        "match": span,
                        "canonical": canonical,
                        "confidence": 0.5
                    })
                    found_canons.add(canonical)
            # ensure normalized skills are populated using the simpler extractor
            if not result["recognized_skills"]:
                # as an extra fallback, use the original extract_skills which returns canonical names
                simple = SkillExtractor.extract_skills(text)
                for s in simple:
                    result["recognized_skills"].append({
                        "span": s,
                        "match": s,
                        "canonical": s,
                        "confidence": 0.5
                    })
                    found_canons.add(s)
            normalized = list(found_canons)

        # Normalize: dedupe by canonical and sort
        normalized = []
        for r in result["recognized_skills"]:
            canon = r.get("canonical")
            if canon and canon not in normalized:
                normalized.append(canon)

        # final normalization: lowercase, strip
        result["normalized_skills"] = [SkillExtractor.normalize_skill(s) for s in normalized]

        # Log recognized skills with confidences
        for r in result["recognized_skills"]:
            logger.info("Recognized skill: %s -> %s (conf=%.3f)", r.get("span"), r.get("canonical"), r.get("confidence", 0.0))

        return result

    @staticmethod
    def normalize_skill(s: str) -> str:
        """Normalize a matched skill to its canonical lowercased form."""
        return s.strip().lower()

    @staticmethod
    def extract_skills(text: str) -> List[str]:
        """Extract technical skills from resume text.

        - Uses regex patterns over the text (case-insensitive).
        - Maps synonyms to canonical skill names.
        - Returns a sorted list of unique skills in lowercase.
        - Handles missing or empty text gracefully.
        """
        if not text:
            return []

        text = text.lower()
        patterns = SkillExtractor._build_skill_patterns()
        found = []
        for canonical, pattern in patterns:
            if pattern.search(text):
                found.append(canonical)

        # Ensure uniqueness and stable ordering
        unique = sorted(set(found))
        return unique

    @staticmethod
    def extract_experience(text: str) -> List[str]:
        lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
        experience = []
        for i, ln in enumerate(lines):
            if re.search(r"\b(experience|professional experience|work history|employment)\b", ln, re.I):
                for j in range(i + 1, min(i + 6, len(lines))):
                    if re.search(r"\b(education|skills|projects)\b", lines[j], re.I):
                        break
                    experience.append(lines[j])
            elif re.search(r"\b(19|20)\d{2}\b", ln):
                experience.append(ln)
        # dedupe
        cleaned = []
        for e in experience:
            if e and e not in cleaned:
                cleaned.append(e)
        return cleaned

    @staticmethod
    def extract_education(text: str) -> List[str]:
        degrees = ["bachelor", "master", "phd", "b.sc", "m.sc", "b.tech", "m.tech", "mba"]
        lines = [ln.strip() for ln in text.lower().splitlines() if ln.strip()]
        edu = [ln for ln in lines if any(d in ln for d in degrees)]
        return edu


if __name__ == "__main__":
    sample = """
    React.js, Git,
    abhin.kumar@example.com
    +91 9876543210
    B.Sc (Honours) in Computer Science, CGPA: 8.9
    """
    print(json.dumps({
        "text": sample,
        "parsed": {
            "name": SkillExtractor.extract_entities(sample)[0],
            "email": SkillExtractor.extract_entities(sample)[1],
            "phone": SkillExtractor.extract_entities(sample)[2]
        }
    }, indent=2))
