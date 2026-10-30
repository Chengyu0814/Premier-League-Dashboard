import { getSides, getResult, formatKickoff, formatMinute } from './matchUtils.js' 
import { useLang } from './i18n.js'

const CARD_LABEL = { Y: '🟨', R: '🟥', YR: '🟨🟥' }
const GOAL_TAG = { O: 'OG', P: 'P' }

function MatchCard({ match,team }) {
  const { lang, t ,teamName} = useLang()
  const { gameweek, kickoff_ms, status, goals, cards } = match
  const { isHome, us, them } = getSides(match,team)
  const finished = status === 'C'
  const side = (eventTeam) => (eventTeam === us.team ? 'us' : 'them')

  let className = 'match-card upcoming'
  if (finished) className = `match-card result-${getResult(match, team).result}` 
  return ( 
    <div className={className}>
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

      {goals.length > 0 && (
        <ul className="events">
          {goals.map((g, i) => (
            <li key={i} className={`event ${side(g.team)}`}>
              <span className="minute">{formatMinute(g.time)}</span>
              <span>⚽</span>
              <span>{g.player}</span>
              {GOAL_TAG[g.type] && <span className="tag">{GOAL_TAG[g.type]}</span>}
            </li>
          ))}
        </ul>
      )}

      {cards.length > 0 && (
        <ul className="events">
          {cards.map((c, i) => (
            <li key={i} className={`event ${side(c.team)}`}>
              <span className="minute">{formatMinute(c.time)}</span>
              <span>{CARD_LABEL[c.card]}</span>
              <span>{c.player}</span>
            </li>
          ))}
        </ul>
      )}
      </div>
    )
  }

export default MatchCard