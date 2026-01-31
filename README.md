# AI Resume Analyzer & Job Tracker

A full-stack web application that analyzes resume–job description compatibility using explainable NLP techniques and allows users to track job applications with status filtering.

---

## Features
- Resume ↔ Job Description match percentage
- Skill gap identification with actionable suggestions
- Job application tracking (Applied / Interview / Rejected)
- Status-based job filtering
- Clean, professional dashboard UI

---

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Axios  
- **Backend:** Flask, Flask-CORS, SQLite, Gunicorn  
- **NLP:** TF-IDF, Cosine Similarity (scikit-learn)  
- **Deployment:** Vercel (frontend), Render (backend)

---

## Resume Analysis Logic
1. Resume and job description text are cleaned and normalized  
2. TF-IDF converts text into numerical vectors  
3. Cosine similarity computes the match percentage  
4. A controlled technical skill vocabulary filters out non-skill words  

This approach keeps the system lightweight, interpretable, and interview-friendly.

---

## Project Structure
```text
Job_Tracker/
├── backend/
│ ├── app.py
│ ├── models.py
│ └── nlp_utils.py
├── frontend/
│ └── src/
│ ├── components/
│ └── pages/
└── README.md
```
---

## Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Runs at: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/analyze`   | Resume analysis   |
| GET    | `/jobs`      | Fetch all jobs    |
| POST   | `/jobs`      | Add a new job     |
| PUT    | `/jobs/{id}` | Update job status |













