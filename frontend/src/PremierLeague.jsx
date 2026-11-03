import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import MatchCard from './MatchCard.jsx'
import Summary from './Summary.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'
import { TEXT, LanguageContext, translateTeam, usePageLanguage } from './i18n.js'

const API = 'http://localhost:8000'

function PremierLeague({ lang }) {
  const t = TEXT[lang]
  const [teams,setTeams] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()
  const team = searchParams.get('team') ?? 'Man Utd' //網址取出 team，沒有的話預設 'Man Utd'。
  const [result, setResult] = useState({ team: null, matches: [], error: null })

  const loading = result.team !== team
  const matches = result.matches
  const error = loading ? null : result.error

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
    .then((data) => {if (!ignore) setResult({ team, matches: data, error: null })})
    .catch((err) => {if (!ignore) setResult({ team, matches: [], error: err.message })})

    return () => {
        ignore = true
      }
    }, [team])
  
  usePageLanguage(lang)

  function handleTeamChange(e) {
    setSearchParams({ team: e.target.value })
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
          (m) =>(<MatchCard key={m.id} match={m} team={team}/>)
        )}
      </div>
      <h2 className="section-title">{t.upcoming}</h2>
      <div className="match-list">
        {upcoming.map((m) => <MatchCard key={m.id} match={m} team={team}/>)}
      </div>
    </div>
    )}
  </div> 
  </LanguageContext>
  )
}

export default PremierLeague