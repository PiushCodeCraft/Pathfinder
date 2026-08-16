# 🚀 PathFinder - AI Job Recommendation System

This project is a full-stack AI-based Job Recommendation System that suggests the most relevant job roles based on user skills and experience.

It uses:
- 🔹 React (Frontend)
- 🔹 FastAPI (Backend)
- 🔹 TF-IDF + KNN (Machine Learning Model)

---

# 📁 Project Structure

Pathfinder/
│
├── Backend/
│ ├── main.py # FastAPI server
│ ├── model.py # ML model (TF-IDF + KNN)
│ ├── utils.py # Helper functions
│ ├── requirements.txt # Backend dependencies
│
├── Dataset/
│ └── job_dataset_modified.csv # Dataset
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── JobForm.js
│ │ │ ├── ResultCard.js
│ │ │
│ │ ├── pages/
│ │ │ └── Home.js
│ │ │
│ │ ├── api.js
│ │ ├── App.js
│ │ ├── index.js
│ │
│ ├── package.json
│
└── README.md


---

# ⚙️ Backend Setup (FastAPI)

### 📌 Step 1: Navigate to Backend
```bash
cd Backend
📌 Step 2: Install dependencies
pip install -r requirements.txt
📌 Step 3: Run the server
uvicorn main:app --reload
📌 Backend runs at:
http://127.0.0.1:8000
📌 API Endpoint:
POST /recommend
📌 Test API:

Open in browser:

http://127.0.0.1:8000/docs
💻 Frontend Setup (React)
📌 Step 1: Navigate to frontend
cd frontend
📌 Step 2: Install dependencies
npm install
📌 Step 3: Run React app
npm start
📌 Frontend runs at:
http://localhost:3000
