from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import io

# Import your custom modules
from ai_service.parsers.resume_parser import ResumeParser
from ai_service.models.skill_extractor import SkillExtractor

app = FastAPI(title="Resume Parser API")


class SkillsRequest(BaseModel):
    skills: List[str]


@app.post("/recommend_jobs/")
async def recommend_jobs(req: SkillsRequest):
    """Return job recommendations based on provided skills (dummy data)."""
    user_skills = {s.strip().lower() for s in (req.skills or [])}

    jobs_data = [
        {
            "title": "Backend Developer",
            "company": "TechCorp",
            "skills": ["python", "sql", "docker"],
            "location": "Hyderabad"
        },
        {
            "title": "Frontend Developer",
            "company": "Webify",
            "skills": ["html", "css", "react"],
            "location": "Bangalore"
        },
        {
            "title": "Data Analyst",
            "company": "Insights Ltd",
            "skills": ["sql", "excel", "python"],
            "location": "Pune"
        }
    ]

    recommendations = []
    for job in jobs_data:
        job_skills = [s.strip().lower() for s in job.get("skills", [])]
        matched = sum(1 for s in job_skills if s in user_skills)
        total = max(1, len(job_skills))
        match_score = (matched / total) * 100.0
        # round to one decimal as example
        match_score = round(match_score, 1)
        missing_skills = [s for s in job_skills if s not in user_skills]

        recommendations.append({
            "title": job.get("title"),
            "company": job.get("company"),
            "location": job.get("location"),
            "match_score": match_score,
            "missing_skills": missing_skills
        })

    # sort by match_score desc and return top 5
    recommendations.sort(key=lambda j: j["match_score"], reverse=True)
    top = recommendations[:5]
    return JSONResponse(top)

@app.post("/parse_resume/")
async def parse_resume(
    file: UploadFile = File(...),
    mode: str = Query(default="structured", enum=["raw", "structured"])
):
    """
    Upload a resume (PDF/DOCX) and return either raw text or structured data.
    Use '?mode=raw' for raw text or '?mode=structured' for structured JSON.
    """
    # Validate file format
    if not (file.filename.lower().endswith('.pdf') or file.filename.lower().endswith('.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
    
    try:
        # Read file and extract text
        contents = await file.read()
        file_stream = io.BytesIO(contents)
        text = ResumeParser.extract_text(file_stream, file.filename)

        if not text or text.strip() == "":
            raise HTTPException(status_code=500, detail="Could not extract text from resume")

        # RAW MODE → return only extracted text
        if mode == "raw":
            return JSONResponse({
                "filename": file.filename,
                "text": text,
                "status": "success"
            })

        # STRUCTURED MODE → extract entities, skills, etc.
        name, email, phone = SkillExtractor.extract_entities(text)
        skills = SkillExtractor.extract_skills(text)
        # enhanced skill extraction (embeddings + synonyms + confidences)
        enhanced = SkillExtractor.extract_skills_enhanced(text)
        experience = SkillExtractor.extract_experience(text)
        education = SkillExtractor.extract_education(text)

        return JSONResponse({
            "filename": file.filename,
            "name": name or "",
            "email": email or "",
            "phone": phone or "",
            "skills": skills,
            "recognized_skills": enhanced.get("recognized_skills", []),
            "normalized_skills": enhanced.get("normalized_skills", []),
            "experience": experience,
            "education": education,
            "status": "success"
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ai_service.main:app", host="127.0.0.1", port=8000, reload=True)
