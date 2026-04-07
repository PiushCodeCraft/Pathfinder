const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export async function getJobRecommendations({ skills, experience }) {
    const response = await fetch(`${BASE_URL}/recommend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            skills: skills,
            experience: experience
        }),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

// Optional alias (safe to keep)
export const getRecommendations = getJobRecommendations;
export const getCareerPaths = getJobRecommendations;