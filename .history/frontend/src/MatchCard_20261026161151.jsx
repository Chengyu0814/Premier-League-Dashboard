import { TEAM, getResult } from './matchUtils.js'

const CARD_LABEL = { Y: '🟨', R: '🟥', YR: '🟨🟥' }

function MatchCard({ match }) {
  const { gameweek, kickoff, status, home, away, goals, cards } = match
  if (status !== 'C') {
  return ( 
    <div className="match-card upcoming">
      <p className="kickoff">第 {gameweek} 輪 · {kickoff}</p>
      <h2>{home.team} vs {away.team}</h2>
    </div>
  )
  }
  const { result } = getResult(match)
  const teamName = (name) => (name === TEAM ? <strong>{name}</strong> : name)
  return (
  <div className={`match-card result-${result}`}>
    <p className="kickoff">第 {gameweek} 輪 · {kickoff}</p>
    <h2>{teamName(home.team)} {home.score} - {away.score} {teamName(away.team)}</h2>

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