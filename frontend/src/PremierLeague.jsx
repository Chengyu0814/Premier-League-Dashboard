import { useState, useEffect } from 'react'
import MatchCard from './MatchCard.jsx'
import Summary from './Summary.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'
import { TEXT, LanguageContext, translateTeam } from './i18n.js'

const API = 'http://localhost:8000'

function PremierLeague({ lang }) {
  const t = TEXT[lang]
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
  
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en'
    document.title = t.pageTitle
  }, [lang, t])

  function handleTeamChange(e) {
    setTeam(e.target.value)
    setLoading(true)
    setError(null)
  }
  const finished = matches.filter((m) => m.status === 'C')
  const upcoming = matches.filter((m) => m.status === 'U')
  
  return (
  <LanguageContext value={lang}>
  <div className="dashboard">
    <div className="header"> 
      <h1>{translateTeam(team, lang)}</h1>
      <div className="header-controls">
        <LanguageSwitch />
        <div className="select-wrap">
          <select value={team} onChange={handleTeamChange}>
            {teams.map((name) => (
              <option key={name} value={name}>{translateTeam(name, lang)}</option>
            ))}
          </select>
        </div>
        <ThemeToggle />
      </div>
    </div>
    {loading && <p>{t.loading}</p>}
    {error && <p className="error">{t.loadError} {error}</p>}
    {!loading && !error && (
    <div>
      <Summary matches={finished} team = {team}/>
      <h2 className="section-title">{t.finished}</h2>
      <div className="match-list">
        {finished.map(
          (m) =>(<MatchCard key={m.gameweek} match={m} team={team}/>)
        )}
      </div>
      <h2 className="section-title">{t.upcoming}</h2>
      <div className="match-list">
        {upcoming.map((m) => <MatchCard key={m.gameweek} match={m} team={team}/>)}
      </div>
    </div>
    )}
  </div> 
  </LanguageContext>
  )
}

export default PremierLeague