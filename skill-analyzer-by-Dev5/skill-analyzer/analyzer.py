from difflib import get_close_matches

# Define common synonyms
SKILL_SYNONYMS = {
    "js": "javascript",
    "javascript": "javascript",
    "py": "python",
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "tf": "tensorflow",
    "tensor flow": "tensorflow",
    "sql db": "sql",
}

def normalize_skill(skill: str) -> str:
    """Normalize skills (lowercase, replace synonyms)."""
    skill = skill.lower().strip()
    return SKILL_SYNONYMS.get(skill, skill)

def fuzzy_match(skill, skill_list, cutoff=0.8):
    """Return closest match if similarity >= cutoff."""
    matches = get_close_matches(skill, skill_list, n=1, cutoff=cutoff)
    return matches[0] if matches else None

def analyze_skills(resume_data, job_data):
    """
    Compare job requirements with resume skills
    Input:
      resume_data = {"skills": [...]}
      job_data = {"skills_required": {skill: priority}}
    Output: dict with ranked skill gap analysis + match percentage
    """

    resume_skills_raw = resume_data.get("skills", [])
    job_skills_raw = job_data.get("skills_required", {})

    # If dict → priority mode, if list → assign medium by default
    if isinstance(job_skills_raw, dict):
        job_skills = {normalize_skill(k): v for k, v in job_skills_raw.items()}
    else:
        job_skills = {normalize_skill(k): "medium" for k in job_skills_raw}

    resume_skills = set(normalize_skill(s) for s in resume_skills_raw)

    matched_skills = []
    extra_skills = list(resume_skills - set(job_skills.keys()))

    # Ranked missing skills
    missing_skills = {"critical": [], "important": [], "optional": []}

    for job_skill, priority in job_skills.items():
        if job_skill in resume_skills:
            matched_skills.append(job_skill)
        else:
            match = fuzzy_match(job_skill, resume_skills)
            if match:
                matched_skills.append(match)
            else:
                if priority == "high":
                    missing_skills["critical"].append(job_skill)
                elif priority == "medium":
                    missing_skills["important"].append(job_skill)
                else:
                    missing_skills["optional"].append(job_skill)

    # --- Skill Match Percentage ---
    total_required = len(job_skills)
    total_matched = len(matched_skills)
    match_percentage = round((total_matched / total_required) * 100, 2) if total_required > 0 else 0

    return {
        "resume_skills": list(resume_skills),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills,
        "match_percentage": match_percentage
    }


# Day 2 Update (Dev5): Load Skill Taxonomy
import json
def load_skill_taxonomy(path='skill_taxonomy.json'):
    with open(path, 'r') as f:
        return json.load(f)
