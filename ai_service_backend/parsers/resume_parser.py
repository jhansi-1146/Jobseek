import pdfplumber
import docx

class ResumeParser:
    @staticmethod
    def extract_text(file, filename: str) -> str:
        if filename.lower().endswith('.pdf'):
            with pdfplumber.open(file) as pdf:
                return "\n".join(page.extract_text() or '' for page in pdf.pages)
        elif filename.lower().endswith('.docx'):
            doc = docx.Document(file)
            return "\n".join([para.text for para in doc.paragraphs])
        else:
            raise ValueError("Unsupported file type. Only PDF and DOCX are allowed.")
