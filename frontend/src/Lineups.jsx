import { useLang } from './i18n.js'

    const POSITION_ORDER = { G: 0, D: 1, M: 2, F: 3 }

    function PlayerList({ players }) {
    const { t } = useLang()
    const sorted = [...players].sort((a, b) => POSITION_ORDER[a.position] - POSITION_ORDER[b.position])

    return (
        <ul className="player-list">
        {sorted.map((p) => (
            <li key={p.name} className="player">
            <span className="player-number">{p.number}</span>
            <span className="player-name">{p.name}</span>
            {p.captain && <span className="tag">{t.captain}</span>}
            <span className="player-position">{t.positions[p.position]}</span>
            </li>
        ))}
        </ul>
    )
}

function TeamLineup({ lineup }) {
    const { t, teamName } = useLang()
    return (
        <div className="match-card">
        <div className="lineup-title">
            <span className="team">{teamName(lineup.team)}</span>
            {lineup.formation && <span className="venue">{lineup.formation}</span>}
        </div>
        <h3 className="lineup-heading">{t.starters}</h3>
        <PlayerList players={lineup.starters} />
        <h3 className="lineup-heading">{t.substitutes}</h3>
        <PlayerList players={lineup.substitutes} />
        </div>
    )
}

function Lineups({ lineups }) {
    return (
        <div className="match-list lineups">
        {lineups.map((lineup) => <TeamLineup key={lineup.team} lineup={lineup} />)}
        </div>
    )
}

export default Lineups