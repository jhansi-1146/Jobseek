# Skill Analyzer (Dev5 Role)

## Overview
This tool compares a candidate’s resume (JSON from Dev4) with job requirements (JSON) and generates a skill gap report.

## Workflow
1. Dev4 extracts resume into JSON (skills, education, experience).
2. Dev5 (this code) takes resume JSON + job JSON.
3. Outputs: Missing skills, matched skills, extra skills.

## How to Run
```bash
python app.py
```

## Example Output
```json
{
    "job_skills": ["python", "django", "sql", "apis", "docker"],
    "resume_skills": ["python", "react", "machine learning"],
    "missing_skills": ["django", "sql", "apis", "docker"],
    "matched_skills": ["python"],
    "extra_skills": ["react", "machine learning"]
}
```


## Day 2 (Dev5) Updates
- Added `skill_taxonomy.json` containing categorized skills.
- Updated `analyzer.py` with function `testTaxonomy()` to read taxonomy.

## Day 3 Updates
-Created 'skillExtractor.js' pipeline skeleton.
-Added 'testSkillExtractor.js' for demo skill extraction

## Day 4 Updates
- Enhanced `skillExtractor.js` with regex-based matching and text cleaning.
- Added `resumeParser.js` and `testResumeParser.js` using sample `.txt` resumes.
- Integrated with Dev4’s parsed resume JSON (`testResumeJson.js`) to extract skills from real structured data.

## Day 5 Updates
- Added `matcher.js` to compare resume skills against job requirements.
- Created `sampleJob.json` and `testMatcher.js` to demo skill matching output.

## Day 6 Updates
- Implemented `gapAnalyzer.js` to generate skill gap reports.
- Added `testGapAnalyzer.js` using Dev4’s resume JSON + mock job JSON.
- Output now shows matched, missing, and extra skills in a clear report format.

## Day 7 Updates
- Added `reportGenerator.js` to save skill gap results into JSON reports.
- Created `testReportGenerator.js` to generate reports using resume + job data.
- Reports are stored in the new `output/` folder for easy download and sharing.

## Day 8 Updates
- Added `skill_weights.json` with priority values for each skill.
- Created `weightedGapAnalyzer.js` to rank missing skills by importance.
- Added `testWeightedAnalyzer.js` using Dev4’s resume JSON + sample job JSON.
- Output now highlights high-priority missing skills first.

## Day 9 Updates
- Added `visuals/generateCharts.js` to create bar charts from gap analysis reports.
- Created `testCharts.js` to generate PNG charts.
- Installed `cshartjs-node-canva` for visualization.
- Output charts are saved in `/visuals/` (e.g., `skill_gap_chart.png`) for presentation.
