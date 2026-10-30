import { getResult } from './matchUtils.js'
import { useLang } from './i18n.js'

function Summary({ matches,team }) {
    const { t } = useLang()
    let win = 0, draw = 0, loss = 0, goalsFor = 0, goalsAgainst = 0

    for (const m of matches) {
        
        const {us, them, result} = getResult(m,team)

        goalsFor += us.score
        goalsAgainst += them.score
        if (result==="W") win++
        else if (result==="D") draw++
        else loss++
    }

    const stats = [
        { label: t.win, value: win },
        { label: t.draw, value: draw },
        { label: t.loss, value: loss },
        { label: t.goals, value: goalsFor },
        { label: t.conceded, value: goalsAgainst }
    ]

    return (
    <div>
    <div className="match-count">{t.matchCount(matches.length)}</div>
    <div className="summary">
        {stats.map((s) => (
        <div key={s.label} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
        </div>
        ))}
    </div>
    </div>
    )
}

export default Summary