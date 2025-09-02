import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from ai_service.models.skill_extractor import SkillExtractor

text = '''ABHIN KUMAR
Hyderabad, Telangana | +91 9876543210 | abhin.kumar@example.com |
linkedin.com/in/abhinkumar
SUMMARY
Results-driven Software Engineer with hands-on experience in backend development, API
integration, and database optimization. Passionate about building scalable applications and learning
emerging technologies.
TECHNICAL SKILLS
Programming Languages: Python, Java, SQL, JavaScript
Frameworks & Tools: FastAPI, React.js, Git, Docker
Databases: MySQL, MongoDB
Other: REST API Development, Machine Learning Basics
EDUCATION
B.Sc (Honours) in Computer Science, CGPA: 8.9
XYZ University, Hyderabad, Telangana — 2023
PROFESSIONAL EXPERIENCE
Software Developer Intern — Tech Solutions Pvt Ltd, Hyderabad
June 2021 – May 2023
- Designed and implemented REST APIs for internal applications.
- Worked on database indexing to improve query performance by 30%.
- Collaborated with a cross-functional team to deliver features on schedule.
PROJECTS
Job Portal with Skills Gap Analyzer | FastAPI, React, MongoDB
- Built an AI-driven platform that recommends jobs and highlights missing skills.
CERTIFICATIONS
- Python for Data Science – Coursera
- Database Management Essentials – Udemy
'''

print('\n----- Top 20 lines of resume text -----\n')
for i, line in enumerate(text.splitlines()[:20], start=1):
    print(f"{i:02d}: {line}")

name, email, phone = SkillExtractor.extract_entities(text)
skills = SkillExtractor.extract_skills(text)
print('\n----- Extracted -----')
print('Name:', name)
print('Email:', email)
print('Phone:', phone)
print('Skills:', skills)
