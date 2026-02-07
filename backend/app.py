from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_utils import analyze_resume
from models import create_table, get_db_connection
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import create_user_table


app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "change-this-in-production"
jwt = JWTManager(app)

create_user_table()

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
@jwt_required()
def get_jobs():
    conn = get_db_connection()
    jobs = conn.execute("SELECT * FROM jobs").fetchall()
    conn.close()
    return jsonify([dict(job) for job in jobs])


@app.route("/jobs", methods=["POST"])
@jwt_required()
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
@jwt_required()
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

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    hashed_password = generate_password_hash(password)

    try:
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (email, hashed_password)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered"}), 201
    except:
        return jsonify({"error": "User already exists"}), 409

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE email = ?", (email,)
    ).fetchone()
    conn.close()

    if user and check_password_hash(user["password"], password):
        token = create_access_token(identity=email)
        return jsonify(access_token=token)

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run()
