export const TEAM = 'Man Utd'

    export function getResult(match) {
    const isHome = match.home.team === TEAM
    const us = isHome ? match.home.score : match.away.score
    const them = isHome ? match.away.score : match.home.score

    let result = 'D'
    if (us > them) result = 'W'
    else if (us < them) result = 'L'

    return { us, them, result }
    }