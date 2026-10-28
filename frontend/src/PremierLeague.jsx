import { useState, useEffect } from 'react'
import MatchCard from './MatchCard.jsx'
import Summary from './Summary.jsx'

const API = 'http://localhost:8000'

function PremierLeague() {
  const [teams,setTeams] = useState([])
  const [team,setTeam] = useState("Man Utd")
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetch(`${API}/api/teams`)
    .then((res) => res.json())
    .then((data)=> setTeams(data))
  },[])

  useEffect(()=>{
    let ignore = false
    fetch(`${API}/api/matches?team=${encodeURIComponent(team)}`)
    .then((res)=>{
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((data) => {if(!ignore) setMatches(data)})
    .catch((err) => {if(!ignore) setError(err.message)})
    .finally(() => {if (!ignore) setLoading(false)})

    return () => {
        ignore = true
      }
    }, [team])

  function handleTeamChange(e) {
    setTeam(e.target.value)
    setLoading(true)
    setError(null)
  }
  const finished = matches.filter((m) => m.status === 'C')
  const upcoming = matches.filter((m) => m.status === 'U')
  
  return (
    <div className="dashboard"> 
      <h1>{team} Dashboard</h1>
      <select value={team} onChange={handleTeamChange}>
        {teams.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {loading && <p>載入中…</p>}
      {error && <p className="error">讀取資料失敗：{error}</p>}

      {!loading && !error && (
      <div>
        <Summary matches={finished} team = {team}/>
        <h2>Finished</h2>
        {finished.map(
          (m) =>(<MatchCard key={m.gameweek} match={m} team={team}/>)
        )}  
        <h2>Upcoming</h2>
        {upcoming.map((m) => <MatchCard key={m.gameweek} match={m} team={team}/>)}  
      </div>
    )}
    </div>
  )
}

export default PremierLeague