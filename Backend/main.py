from fastapi import FastAPI
from pydantic import BaseModel
from model import recommend_jobs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    skills: str
    experience: float

@app.post("/recommend")
def get_recommendations(user: UserInput):
    jobs = recommend_jobs(user.skills, user.experience)
    return {"jobs": jobs}