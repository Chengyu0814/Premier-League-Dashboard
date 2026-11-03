from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from premier_league import build_summary,build_match_detail,get_teams
from schemas import Match,MatchDetail

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
)
@app.get("/api/teams",response_model =list[str])
def teams():
    return get_teams()

@app.get("/api/matches",response_model = list[Match])
def matches(team: str = "Man Utd"):
    summary =  build_summary(team)
    if summary is None:
        raise HTTPException(status_code=404, detail=f"Team not found: {team}")
    return summary

@app.get("/api/matches/{match_id}", response_model=MatchDetail)
def match_detail(match_id: int):
    detail = build_match_detail(match_id)
    if detail is None:
        raise HTTPException(status_code=404, detail=f"Match not found: {match_id}")
    return detail