import { getSides, getResult, formatKickoff } from './matchUtils.js' 
import { Link, useLocation } from 'react-router'
import { useLang } from './i18n.js'
import MatchEvents from './MatchEvents.jsx'

function MatchCard({ match,team }) {
  const { lang, t ,teamName} = useLang()
  const { search } = useLocation()
  const detailPath = `${lang === 'zh' ? '/zh' : ''}/match/${match.id}`
  const { gameweek, kickoff_ms, status, goals, cards } = match
  const { isHome, us, them } = getSides(match,team)
  const finished = status === 'C'

  let className = 'match-card upcoming'
  if (finished) className = `match-card result-${getResult(match, team).result}` 
  return ( 
    <Link to={{ pathname: detailPath, search }} className={className}>
      <div className="card-top">
        <span>
          {t.matchweek(gameweek)}
          <span className="venue">{isHome ? t.home : t.away}</span>
        </span>
        <span>{formatKickoff(kickoff_ms, lang)}</span>
      </div>

      <div className="scoreline">
        <span className="team">{teamName(us.team)}</span>
        <span className="score">{finished ? `${us.score} - ${them.score}` : 'vs'}</span>
        <span className="team them">{teamName(them.team)}</span>
      </div>

      <MatchEvents goals={goals} cards={cards} leftTeam={us.team} />
    
    </Link>
    )
  }

export default MatchCard