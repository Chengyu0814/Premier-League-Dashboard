import { formatMinute } from './matchUtils.js'

const CARD_LABEL = { Y: '🟨', R: '🟥', YR: '🟨🟥' }
const GOAL_TAG = { O: 'OG', P: 'P' }

function MatchEvents({ goals, cards, leftTeam }) {
const side = (eventTeam) => (eventTeam === leftTeam ? 'us' : 'them')

return (
    <>
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
    </>
)
}

export default MatchEvents