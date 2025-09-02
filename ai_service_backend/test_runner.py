import multiprocessing
import time
import requests
import uvicorn
import os
import sys

# Ensure parent directory is on sys.path so `import ai_service` works
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from ai_service_backend import main

def run_server():
    uvicorn.run(main.app, host="127.0.0.1", port=8000)  # Changed to 8000

if __name__ == "__main__":
    p = multiprocessing.Process(target=run_server)
    p.start()
    
    # Wait for server to start
    for _ in range(20):
        try:
            r = requests.get('http://127.0.0.1:8000/docs', timeout=1)
            if r.status_code == 200:
                break
        except Exception:
            time.sleep(0.5)

    try:
        with open('c:/devs4/ai_service/test_resume.docx', 'rb') as fh:
            files = {
                'file': (
                    'test_resume.docx',
                    fh,
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                )
            }
            resp = requests.post('http://127.0.0.1:8000/parse_resume/', files=files)
            print('STATUS:', resp.status_code)
            print('RESPONSE:', resp.text)
    finally:
        p.terminate()
        p.join()
