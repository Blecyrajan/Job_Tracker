import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1️⃣ Controlled vocabulary of technical skills
KNOWN_SKILLS = {
    "python", "java", "c", "c++", "sql", "mysql", "mongodb",
    "flask", "django", "react", "node", "express",
    "aws", "docker", "kubernetes",
    "machine learning", "deep learning", "data analysis",
    "pandas", "numpy", "scikit-learn",
    "html", "css", "javascript"
}

# 2️⃣ Clean input text
def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z ]", " ", text)
    return text

# 3️⃣ Extract ONLY meaningful skills
def extract_skills(text):
    text = clean_text(text)
    found_skills = set()

    for skill in KNOWN_SKILLS:
        if skill in text:
            found_skills.add(skill)

    return found_skills

# 4️⃣ Main analysis function
def analyze_resume(resume_text, jd_text):
    resume_text = clean_text(resume_text)
    jd_text = clean_text(jd_text)

    # Similarity scoring (unchanged)
    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

    match_percentage = round(similarity * 100, 2)

    # Skill-based comparison (IMPROVED)
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    missing_skills = list(jd_skills - resume_skills)

    # Actionable suggestions
    suggestions = [
        f"Add a project or hands-on experience demonstrating {skill}"
        for skill in missing_skills
    ]

    return {
        "match": match_percentage,
        "missingSkills": missing_skills,
        "suggestions": suggestions
    }
