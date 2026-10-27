import { useState, useEffect } from 'react'
import MatchCard from './MatchCard.jsx'
 import Summary from './Summary.jsx'

function PremierLeague() {

  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetch('/man_utd_summary.json')
      .then((res) => res.json())
      .then((data) => {setMatches(data)})
    }, [])
  
  const finished = matches.filter((m) => m.status === 'C')
  const upcoming = matches.filter((m) => m.status === 'U')
  
  return (
    <div className='dsa'> 
    <h1>Man Utd Dashboard</h1>
    <Summary matches={finished}/>
     <h2>已完賽</h2>
    {finished.map(
      (m) =>(<MatchCard key={m.gameweek} match={m} />)
    )}  
    <h2>即將進行</h2>
    {upcoming.map((m) => <MatchCard key={m.gameweek} match={m} />)}  
    </>
)
}

export default PremierLeague
