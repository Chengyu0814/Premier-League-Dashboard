import json
import urllib.request
from datetime import datetime, timezone


PULSE = "https://footballapi.pulselive.com/football"
SEASON_ID = 841  # 2026/27 英超賽季在 Pulse 的 id

def build_summary(team_name):
    teams = get(f"{PULSE}/compseasons/{SEASON_ID}/teams")
    team_id = find_team_id(teams,team_name) # 輸入英超聯賽列表與要查的俱樂部，輸出俱樂部的id
    if team_id is None:
        return None
    fixtures = get(f"{PULSE}/fixtures?comps=1&compSeasons={SEASON_ID}&teams={team_id}&pageSize=50")["content"] #用 team_id 找出前 50 場紀錄
    matchs = find_recently_matchs(fixtures)
    
    for match in matchs:
        if match["status"] == "C":
            match["goal_events"], match["card_events"] = find_match_details(int(match["id"])) #找進球時間跟紅黃牌

    summary = []
    for match in matchs:
        home, away = match["teams"]
        names = {"home": home["team"]["shortName"], "away": away["team"]["shortName"]}
        finished = match["status"] == "C"
        summary.append({
            "gameweek": int(match["gameweek"]["gameweek"]),
            "kickoff": match["kickoff"]["label"],
            "kickoff_ms": int(match["kickoff"]["millis"]),
            "status" : match["status"],
            "home": {"team": names["home"], "score": int(home["score"]) if finished else None},
            "away": {"team": names["away"], "score": int(away["score"]) if finished else None},
            "goals": [{"time": g["time"], "team": names[g["side"]], "player": g["player"], "type": g["type"]}
                    for g in match.get("goal_events", [])],
            "cards": [{"time": c["time"], "team": names[c["side"]], "player": c["player"], "card": c["card"]}
                    for c in match.get("card_events", [])],
        })

    return summary

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return json.load(urllib.request.urlopen(req))

def find_team_id(teams,team_name):
    for team in teams:
        if team["shortName"] == team_name:
            return int(team["id"])

def find_recently_matchs(fixtures):
    now = datetime.now(timezone.utc)
    past = []
    future = []
    for match in fixtures: # Pulse 已經只回傳這隊的比賽，不用再比對 team_id

        if match["kickoff"] is None:  # 還沒排定時間的比賽
            continue
        kickoff = datetime.fromtimestamp(match["kickoff"]["millis"] / 1000, timezone.utc)
        if kickoff <= now:
            past.append(match)
        else:
            future.append(match)

    past.sort(key=lambda m: m["kickoff"]["millis"])
    future.sort(key=lambda m: m["kickoff"]["millis"])

    last = past[-5:]   # 最近踢完的 5 場
    upcoming = future[:3]    # 接下來的 3 場

    return last + upcoming

def find_match_details(match_id):
    match = get(f"{PULSE}/fixtures/{match_id}")

    names = {} # 球員 id -> 名字
    for team in match["teamLists"]:
        for player in team["lineup"] + team["substitutes"]:
            names[int(player["id"])] = player["name"]["display"]

    home_id = int(match["teams"][0]["team"]["id"]) # teams[0] 是主隊、teams[1] 是客隊

    goals = []
    cards = []
    for event in match["events"]:
        if event["type"] in ("G", "O", "P"):  # G 進球、O 烏龍球、P 點球
            goals.append({
                "time": event["clock"]["label"],
                "type": event["type"],
                "player": names.get(int(event["personId"])),
                "side": "home" if int(event["teamId"]) == home_id else "away", # 得分的一方，烏龍球算對手的
            })
        if event["type"]=="B" and "personId" in event:
            cards.append({
                "time": event["clock"]["label"],
                "card": event.get("description"),
                "side": "home" if int(event["teamId"]) == home_id else "away",
                "player": names.get(int(event["personId"]))
            })

    return goals, cards

def get_teams():
    teams = get(f"{PULSE}/compseasons/{SEASON_ID}/teams")
    return sorted(team["shortName"] for team in teams)

if __name__ == "__main__":
    summary = build_summary("Man Utd")
    with open("frontend/public/man_utd_summary.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
