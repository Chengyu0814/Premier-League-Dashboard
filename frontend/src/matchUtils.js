export function getSides(match,team) {
    const isHome = match.home.team === team
    const us = isHome ? match.home : match.away
    const them = isHome ? match.away : match.home
    return { isHome, us, them }
}

export function getResult(match,team) {
    const { us, them } = getSides(match,team)

    let result = 'D'
    if (us.score > them.score) result = 'W'
    else if (us.score < them.score) result = 'L'

    return { us, them, result }
}

export function formatKickoff(ms,lang) {
    return new Date(ms).toLocaleString(lang === 'zh' ? 'zh-TW' : 'en-US', {
          timeZone: 'Asia/Taipei',
          month: 'numeric',
          day: 'numeric',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
      })
}

export function formatMinute(time) {
      return time.replace("'00", "'")
}