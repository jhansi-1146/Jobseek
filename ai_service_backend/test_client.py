import requests


def main():
	f = {'file': open('c:/devs4/ai_service/test_resume.docx','rb')}
	resp = requests.post('http://127.0.0.1:8000/parse_resume/', files=f)
	print(resp.status_code)
	print(resp.text)


if __name__ == '__main__':
	main()
