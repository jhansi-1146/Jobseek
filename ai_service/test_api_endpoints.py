import os
import json
import requests
from requests.exceptions import RequestException
import subprocess
import sys
import time


BASE = "http://127.0.0.1:8000"


def pretty_print(title: str, status: int, body):
    print(f"\n=== {title} ===")
    print(f"Status: {status}")
    try:
        print(json.dumps(body, indent=2))
    except Exception:
        print(body)


def test_parse_resume():
    endpoint = f"{BASE}/parse_resume/"
    print("Testing /parse_resume/")
    resume_path = os.path.join(os.path.dirname(__file__), "test_resume.docx")
    if not os.path.exists(resume_path):
        print("ERROR: test_resume.docx not found at", resume_path)
        return

    try:
        with open(resume_path, "rb") as fh:
            files = {
                "file": (
                    "test_resume.docx",
                    fh,
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                )
            }
            resp = requests.post(endpoint, files=files, timeout=10)

        # print results
        try:
            body = resp.json()
        except Exception:
            body = resp.text

        pretty_print("/parse_resume/", resp.status_code, body)

        if not resp.ok:
            print("Request failed.")
            return

        # basic checks
        if isinstance(body, dict):
            assert "name" in body, "name missing in response"
            assert "email" in body, "email missing in response"
            assert "skills" in body, "skills missing in response"
            print("/parse_resume/ basic checks passed.")

    except RequestException as e:
        print("Connection error while testing /parse_resume/:", e)
    except AssertionError as e:
        print("Assertion failed for /parse_resume/:", e)
    except Exception as e:
        print("Unexpected error in /parse_resume/ test:", e)


def _start_local_server_if_needed(base_url: str):
    # try a quick GET to see if server is up
    try:
        r = requests.get(base_url, timeout=1)
        return None
    except Exception:
        pass

    print("Server not running — starting local uvicorn...")
    cmd = [sys.executable, "-m", "uvicorn", "ai_service.main:app", "--host", "127.0.0.1", "--port", "8000"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # wait for readiness
    for _ in range(20):
        try:
            r = requests.get(base_url + "/docs", timeout=1)
            if r.status_code == 200:
                return proc
        except Exception:
            time.sleep(0.5)
    # if server didn't start, terminate process and return None
    try:
        proc.terminate()
    except Exception:
        pass
    return None


def test_recommend_jobs():
    endpoint = f"{BASE}/recommend_jobs/"
    print("Testing /recommend_jobs/")
    payload = {"skills": ["python", "sql", "html"]}
    headers = {"Content-Type": "application/json"}
    try:
        resp = requests.post(endpoint, json=payload, headers=headers, timeout=10)
        try:
            body = resp.json()
        except Exception:
            body = resp.text

        pretty_print("/recommend_jobs/", resp.status_code, body)

        if not resp.ok:
            print("Request failed.")
            return

        # basic checks
        if isinstance(body, list):
            assert len(body) > 0, "No recommendations returned"
            first = body[0]
            assert "title" in first and "company" in first and "match_score" in first, "Missing expected keys"
            print("/recommend_jobs/ basic checks passed.")

    except RequestException as e:
        print("Connection error while testing /recommend_jobs/:", e)
    except AssertionError as e:
        print("Assertion failed for /recommend_jobs/:", e)
    except Exception as e:
        print("Unexpected error in /recommend_jobs/ test:", e)


if __name__ == "__main__":
    print("Running API endpoint tests against:", BASE)
    proc = _start_local_server_if_needed(BASE)
    try:
        test_parse_resume()
        test_recommend_jobs()
    finally:
        if proc:
            print("Stopping local server...")
            try:
                proc.terminate()
                proc.wait(timeout=5)
            except Exception:
                pass
