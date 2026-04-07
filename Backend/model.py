import pandas as pd
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler


# ===============================
# LOAD DATA
# ===============================
df = pd.read_csv("../Dataset/job_dataset_modified.csv")

df['Combined_Skills'] = df['Combined_Skills'].fillna('')
df['YearsOfExperience'] = df['YearsOfExperience'].fillna(0)


# ===============================
# PARSE EXPERIENCE
# ===============================
def parse_experience(exp_str):
    exp_str = str(exp_str).lower().replace('–', '-').replace('years', '').replace('year', '').strip()

    if '0-1' in exp_str or 'fresher' in exp_str:
        return 0.5
    elif '1-2' in exp_str:
        return 1.5
    elif '2-5' in exp_str:
        return 3.5
    elif '5+' in exp_str:
        return 5.0
    elif '-' in exp_str:
        parts = exp_str.split('-')
        if len(parts) == 2:
            return (float(parts[0]) + float(parts[1])) / 2

    try:
        return float(exp_str)
    except:
        return 0.0


df['YearsOfExperience'] = df['YearsOfExperience'].apply(parse_experience)


# ===============================
# TRAIN MODEL
# ===============================
tfidf = TfidfVectorizer(stop_words='english')
X_text = tfidf.fit_transform(df['Combined_Skills'])

scaler = StandardScaler()
X_exp = scaler.fit_transform(df[['YearsOfExperience']])

X = np.hstack((X_text.toarray(), X_exp))

knn = NearestNeighbors(n_neighbors=5, metric='cosine')
knn.fit(X)

print("✅ Model Loaded Successfully!")


# ===============================
# RECOMMEND FUNCTION
# ===============================
def recommend_jobs(user_skills, user_experience):
    try:
        # ✅ Convert skills string → list
        skill_list = [s.strip() for s in user_skills.split(",") if s.strip()]

        # ✅ CHECK: minimum 5 skills required
        if len(skill_list) < 5:
            return {
                "error": "Please enter at least 5 skills to get better recommendations."
            }

        # Transform input
        skills_vec = tfidf.transform([user_skills])
        exp_scaled = scaler.transform([[user_experience]])

        user_vector = np.hstack((skills_vec.toarray(), exp_scaled))

        distances, indices = knn.kneighbors(user_vector)

        results = []

        for i, idx in enumerate(indices[0]):
            job = df.iloc[idx]

            score = round((1 - distances[0][i]) * 100, 2)

            results.append({
                "title": job.get("Title", "Unknown Role"),
                "category": job.get("Category", "General"),
                "match_score": score,
                "required_skills": [
                    skill.strip()
                    for skill in str(job.get("Combined_Skills", "")).split(",")
                    if skill.strip()
                ]
            })

        return results

    except Exception as e:
        return {"error": str(e)}