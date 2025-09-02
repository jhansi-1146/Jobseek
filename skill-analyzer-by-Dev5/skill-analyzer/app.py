import json
from analyzer import analyze_skills

def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

if __name__ == "__main__":
    # Load mock resume & job data
    resume_data = load_json("resume_parsed.json")
    job_data = load_json("job_data.json")

    # Run analysis
    result = analyze_skills(resume_data, job_data)

    # Pretty Report
    print("\n📊 Skill Gap Report\n")

    print(f"✅ Matched Skills: {', '.join(result['matched_skills']) if result['matched_skills'] else 'None'}")

    missing = result["missing_skills"]
    print(f"❌ Critical Missing: {', '.join(missing['critical']) if missing['critical'] else 'None'}")
    print(f"⚠️ Important Missing: {', '.join(missing['important']) if missing['important'] else 'None'}")
    print(f"✨ Optional Missing: {', '.join(missing['optional']) if missing['optional'] else 'None'}")

    print(f"💡 Extra Skills (not required by job): {', '.join(result['extra_skills']) if result['extra_skills'] else 'None'}")
    print(f"📈 Overall Match Percentage: {result['match_percentage']}%")
