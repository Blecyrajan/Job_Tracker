from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_utils import analyze_resume
from models import create_table, get_db_connection  

app = Flask(__name__)
CORS(app)

create_table()

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    resume_text = data.get("resume")
    job_description = data.get("jobDescription")

    if not resume_text or not job_description:
        return jsonify({"error": "Invalid input"}), 400

    result = analyze_resume(resume_text, job_description)
    return jsonify(result)

@app.route("/jobs", methods=["GET"])
def get_jobs():
    conn = get_db_connection()
    jobs = conn.execute("SELECT * FROM jobs").fetchall()
    conn.close()
    return jsonify([dict(job) for job in jobs])


@app.route("/jobs", methods=["POST"])
def add_job():
    data = request.json
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO jobs (company, role, status) VALUES (?, ?, ?)",
        (data["company"], data["role"], data["status"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Job added"}), 201


@app.route("/jobs/<int:id>", methods=["PUT"])
def update_job(id):
    data = request.json
    conn = get_db_connection()
    conn.execute(
        "UPDATE jobs SET status = ? WHERE id = ?",
        (data["status"], id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Job updated"})


if __name__ == "__main__":
    app.run()
