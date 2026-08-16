# 🚀 PathFinder – AI Job Recommendation System

> An AI-powered career recommendation platform that analyzes a user's skills and experience to recommend relevant job roles and career paths.

## 🌐 Live Demo

### 🌟 Live Application
**[Launch PathFinder](https://pathfinder-flame-psi.vercel.app)**

### ⚡ Backend API
**[FastAPI Backend](https://pathfinder-1397.onrender.com)**

### 📚 API Documentation
**[Swagger API Docs](https://pathfinder-1397.onrender.com/docs)**

---

## 📌 About the Project

PathFinder is a full-stack AI-based Job Recommendation System designed to help users discover suitable career opportunities based on their skills and professional experience.

The system accepts a user's skills and experience, processes the information using Natural Language Processing and machine learning techniques, and recommends relevant job roles based on similarity matching.

The project combines:

- ⚛️ React for the frontend
- ⚡ FastAPI for the backend
- 🤖 TF-IDF for text vectorization
- 🔍 KNN for similarity-based recommendations
- 🐍 Python and Scikit-learn for machine learning
- 🌐 Vercel for frontend deployment
- ☁️ Render for backend deployment

---

## ✨ Features

- 🎯 Skill-based job recommendations
- 🤖 Machine learning-powered matching
- 🔍 TF-IDF text vectorization
- 📊 KNN-based similarity matching
- 💼 Career and job-role recommendations
- 👨‍💻 Experience-based recommendations
- ⚡ FastAPI REST API
- ⚛️ Interactive React frontend
- 📱 Modern and responsive user interface
- 📚 Interactive Swagger API documentation
- 🌐 Fully deployed frontend and backend

---

## 🧠 How It Works

The recommendation pipeline works as follows:

```text
User
  │
  ▼
Enter Skills & Experience
  │
  ▼
React Frontend
  │
  ▼
FastAPI REST API
  │
  ▼
Input Processing
  │
  ▼
TF-IDF Vectorization
  │
  ▼
KNN Similarity Matching
  │
  ▼
Job Dataset
  │
  ▼
Rank & Select Relevant Roles
  │
  ▼
Recommended Career Paths
```

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │        User          │
                    │ Skills + Experience │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         HTTP POST Request
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Input Processing   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   TF-IDF Vectorizer  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    KNN Similarity    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Job Dataset     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Job Recommendations  │
                    └──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Fetch API

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### Machine Learning
- Scikit-learn
- TF-IDF Vectorization
- K-Nearest Neighbors
- Natural Language Processing

### Data
- CSV dataset
- Job roles
- Skills
- Experience-related information

### Deployment
- Vercel – Frontend
- Render – Backend

---

## 📁 Project Structure

```text
PathFinder/
│
├── Backend/
│   ├── main.py
│   ├── model.py
│   ├── utils.py
│   └── requirements.txt
│
├── Dataset/
│   └── job_dataset_modified.csv
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobForm.js
│   │   │   └── ResultCard.js
│   │   │
│   │   ├── pages/
│   │   │   └── Home.js
│   │   │
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PiusshCodeCraft/Pathfinder.git
cd Pathfinder
```

---

## 🐍 Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### Swagger API Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

---

## ⚛️ Frontend Setup

Open a new terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will run at:

```text
http://localhost:3000
```

---

## 🔌 API

### POST `/recommend`

The recommendation API accepts the user's skills and experience.

### Request

```json
{
  "skills": "Python, Machine Learning, SQL, Pandas, Data Analysis",
  "experience": 2
}
```

### Production Endpoint

```text
https://pathfinder-1397.onrender.com/recommend
```

The API processes the input and returns relevant job recommendations based on similarity between the user's profile and the job dataset.

---

## 🤖 Machine Learning Approach

### TF-IDF

TF-IDF (Term Frequency–Inverse Document Frequency) converts textual skill information into numerical vectors.

This allows the system to represent and compare the user's skills with the skills associated with available job roles.

### KNN

K-Nearest Neighbors is used to identify job profiles that are most similar to the user's skill representation.

The nearest matching job profiles are used to generate relevant recommendations.

---

## 📊 Recommendation Process

```text
1. User enters skills
        ↓
2. User provides experience
        ↓
3. React sends request to FastAPI
        ↓
4. Backend validates the request
        ↓
5. Skills are transformed using TF-IDF
        ↓
6. KNN calculates similarity
        ↓
7. Similar job profiles are identified
        ↓
8. Relevant roles are selected
        ↓
9. React displays recommendations
```

---

## 🔐 Environment Variables

The frontend uses an environment variable to connect to the backend.

Create a `.env` file inside the `frontend` directory:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

For production, Vercel uses:

```text
REACT_APP_API_URL=https://pathfinder-1397.onrender.com
```

> Do not commit private credentials or secrets to GitHub.

---

## 🚀 Deployment

### Frontend

The React frontend is deployed on Vercel.

**Live Application:**

https://pathfinder-flame-psi.vercel.app

### Backend

The FastAPI backend is deployed on Render.

**Backend:**

https://pathfinder-1397.onrender.com

### API Documentation

https://pathfinder-1397.onrender.com/docs

---

## 📸 Screenshots

Add screenshots of the application here as the project evolves.

Recommended screenshots:

- Home / Profile page
- Skills selection page
- Job recommendation results
- Swagger API documentation

Example:

```markdown
![PathFinder Home](screenshots/home.png)
![Skill Selection](screenshots/skills.png)
![Recommendations](screenshots/recommendations.png)
```

---

## 🎯 Future Improvements

- 📄 Resume upload and automatic skill extraction
- 📊 Larger and more diverse job dataset
- 🧭 Personalized career roadmaps
- 💰 Salary-based recommendations
- 📍 Location-based job recommendations
- 🔗 Integration with live job APIs
- 🧠 Advanced NLP and transformer-based models
- 👤 User accounts and recommendation history
- 📈 Skill-gap analysis
- 💡 Explainable recommendations

---

## 🏆 Project Highlights

PathFinder demonstrates the integration of:

```text
Machine Learning
       +
Natural Language Processing
       +
TF-IDF
       +
KNN
       +
FastAPI
       +
React
       +
REST API
       +
Cloud Deployment
```

The project was developed as a hackathon project to demonstrate how machine learning can be integrated into a practical career recommendation platform.

---

## 👨‍💻 Author

**PiusshCodeCraft**

Built with ❤️ using React, FastAPI, Python, and Machine Learning.

---

## 📄 License

This project is available for educational, portfolio, and demonstration purposes.
