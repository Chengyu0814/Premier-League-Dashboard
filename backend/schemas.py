from pydantic import BaseModel

class TeamScore(BaseModel):
    team: str
    score: int | None

class Goal(BaseModel):
    time: str
    team: str
    player: str | None
    type: str

class Card(BaseModel):
    time: str
    team: str
    player: str | None
    card: str | None

class Match(BaseModel):
    id:int
    gameweek: int
    kickoff: str
    kickoff_ms: int
    status: str
    home: TeamScore
    away: TeamScore
    goals: list[Goal]
    cards: list[Card]

class Player(BaseModel):
    name: str
    number: int | None
    position: str | None
    captain: bool

class TeamLineup(BaseModel):
    team: str
    formation: str | None
    starters: list[Player]
    substitutes: list[Player]

class MatchDetail(Match):
    ground: str | None
    attendance: int | None
    lineups: list[TeamLineup]
