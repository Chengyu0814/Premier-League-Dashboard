export const TEAM = 'Man Utd'

export function getSides(match) {
    const isHome = match.home.team === TEAM
    const us = isHome ? match.home : match.away
    const them = isHome ? match.away : match.home
    return { isHome, us, them }
}

export function getResult(match) {
    const { us, them } = getSides(match)

    let result = 'D'
    if (us.score > them.score) result = 'W'
    else if (us.score < them.s) result = 'L'

    return { us, them, result }
}