from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from premier_league import build_summary,get_teams

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
)
@app.get("/api/teams")
def teams():
    return get_teams()

@app.get("/api/matches")
def matches(team: str = "Man Utd"):
    summary =  build_summary(team)
    if summary is None:
        raise HTTPException(status_code=404, detail=f"Team not found: {team}")
    return summary