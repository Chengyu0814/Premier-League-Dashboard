import { getSides, getResult } from './matchUtils.js'

const CARD_LABEL = { Y: '🟨', R: '🟥', YR: '🟨🟥' }

function MatchCard({ match }) {
  const { gameweek, kickoff, status, goals, cards } = match
  const { isHome, us, them } = getSides(match)
  const venue = isHome ? '主場' : '客場'

  if (status !== 'C') {
  return ( 
    <div className="match-card upcoming">
      <p className="kickoff">Matchweek {gameweek} 輪·{venue}·{kickoff}</p>
      <h2>{us.team} vs {them.team}</h2>
    </div>
  )
  }
  const { result } = getResult(match)
  return (
  <div className={`match-card result-${result}`}>
    <p className="kickoff">第 {gameweek} 輪·{venue}·{kickoff}</p>
    <h2>{us.team} {us.score} - {them.score} {them.team}</h2>

    <h4>進球</h4>
    <ul>
    {goals.map((g, i) => (
      <li key={i}>
        {g.time} ⚽ {g.player}（{g.team}）
        {g.type === 'O' && ' 烏龍球'}
        {g.type === 'P' && ' 點球'}
      </li>
      ))}

    </ul>
    <h4>紅黃牌</h4>
    <ul>
      {cards.map((c, i) => (
        <li key={i}>
          {c.time} {CARD_LABEL[c.card]} {c.player}（{c.team}）
        </li>
    ))}
    </ul>
  </div>
  )
}

export default MatchCard