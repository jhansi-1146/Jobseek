import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ai_service_backend.models.skill_extractor import SkillExtractor


def test_extract_basic_skills():
    text = "Programming Languages: Python, JavaScript\nFrameworks: React.js, FastAPI\nOther: ML"
    skills = SkillExtractor.extract_skills(text)
    assert 'python' in skills
    assert 'javascript' in skills
    assert 'react' in skills
    assert 'fastapi' in skills
    assert 'machine learning' in skills


def test_extract_synonyms_and_uniqueness():
    text = "Skills: JS, JavaScript, python, PY"
    skills = SkillExtractor.extract_skills(text)
    # JS and JavaScript both map to 'javascript' and duplicates removed
    assert skills.count('javascript') == 1
    assert 'javascript' in skills
    assert 'python' in skills


def test_empty_or_none():
    assert SkillExtractor.extract_skills('') == []
    assert SkillExtractor.extract_skills(None) == []


def test_extract_skills_enhanced_structure():
    text = "Skills: Python, React.js, ML"
    out = SkillExtractor.extract_skills_enhanced(text)
    assert isinstance(out, dict)
    assert 'recognized_skills' in out and 'normalized_skills' in out
    # normalized skills should include canonical names in lowercase
    assert 'python' in out['normalized_skills']
    assert 'react' in out['normalized_skills'] or 'react.js' in out['normalized_skills']
    assert 'machine learning' in out['normalized_skills']
    # each recognized skill entry should have confidence
    for r in out['recognized_skills']:
        assert 'confidence' in r
        assert isinstance(r['confidence'], float) or isinstance(r['confidence'], int)
