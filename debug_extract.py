from ai_service.models.skill_extractor import SkillExtractor

text = "Skills: Python, React.js, ML"
out = SkillExtractor.extract_skills_enhanced(text)
print(out)
