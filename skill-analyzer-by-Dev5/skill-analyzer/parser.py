import spacy
import re
import json
import os
from pdfminer.high_level import extract_text as extract_pdf_text
from docx import Document

# Load SpaCy model
nlp = spacy.load("en_core_web_sm")

# --- Extract text from PDF ---
def extract_text_from_pdf(file_path: str) -> str:
    return extract_pdf_text(file_path)

# --- Extract text from DOCX ---
def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

# --- Extract text from TXT ---
def extract_text_from_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

# --- Main Parser Function ---
def parse_resume(file_path: str):
    # Step 1: Extract raw text
    if file_path.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.lower().endswith(".docx"):
        text = extract_text_from_docx(file_path)
    elif file_path.lower().endswith(".txt"):
        text = extract_text_from_txt(file_path)
    else:
        raise ValueError("Unsupported file format. Please use PDF, DOCX, or TXT.")

    # Step 2: Run NLP
    doc = nlp(text)

    # Extract name (first PERSON entity)
    name = next((ent.text for ent in doc.ents if ent.label_ == "PERSON"), "")

    # Extract skills (simple keyword match – can expand later)
    known_skills = [
        "Python", "Java", "C++", "React", "Node.js", "MongoDB", "SQL",
        "Django", "Flask", "JavaScript", "TypeScript", "HTML", "CSS"
    ]
    skills = [skill for skill in known_skills if re.search(r"\b" + skill + r"\b", text, re.IGNORECASE)]

    # Extract experience (naive)
    experience = re.findall(r"(?i)(intern|developer|engineer|worked at .+)", text)

    # Extract education
    education = re.findall(r"(?i)(B\.Sc|B\.Tech|M\.Sc|MCA|Bachelor|Master).+", text)

    # Step 3: Build structured JSON
    parsed_data = {
        "name": name.strip(),
        "skills": list(set(skills)),
        "experience": experience,
        "education": education
    }

    return parsed_data


if __name__ == "__main__":
    # Default test file (now using TXT!)
    file_path = os.path.join("src", "sample_resume.txt")
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
    else:
        result = parse_resume(file_path)

        # Save JSON output
        with open("resume_parsed.json", "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2)

        print("✅ Resume parsed! JSON saved to resume_parsed.json")