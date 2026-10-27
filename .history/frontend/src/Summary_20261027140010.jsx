import { getResult } from './matchUtils.js'

function Summary({ matches }) {
    let win = 0, draw = 0, loss = 0, goalsFor = 0, goalsAgainst = 0

    for (const m of matches) {
        
        const {us, them, result} = getResult(m)

        goalsFor += us.score
        goalsAgainst += them.score
        if (result==="W") win++
        else if (result==="D") draw++
        else loss++
    }

    const stats = [
        { label: 'Win', value: win },
        { label: '和', value: draw },
        { label: '負', value: loss },
        { label: '進球', value: goalsFor },
        { label: '失球', value: goalsAgainst }
    ]

    return (
    <div className="summary">
        {stats.map((s) => (
        <div key={s.label} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
        </div>
        ))}
    </div>
    )
}

export default Summary