import { createContext, useContext } from 'react'

export const TEXT = {
  en: {
    pageTitle: 'Premier League Dashboard',
    loading: 'Loading…',
    loadError: 'Failed to load:',
    finished: 'Finished',
    upcoming: 'Upcoming',
    matchCount: (n) => `Currently ${n} matches`,
    win: 'Win',
    draw: 'Draw',
    loss: 'Loss',
    goals: 'Goals',
    conceded: 'Conceded',
    matchweek: (n) => `Matchweek ${n}`,
    home: 'Home',
    away: 'Away',
  },
  zh: {
    pageTitle: '英超儀表板',
    loading: '載入中…',
    loadError: '讀取資料失敗：',
    finished: '已完賽',
    upcoming: '即將進行',
    matchCount: (n) => `最近 ${n} 場`,
    win: '勝',
    draw: '和',
    loss: '負',
    goals: '進球',
    conceded: '失球',
    matchweek: (n) => `第 ${n} 輪`,
    home: '主場',
    away: '客場',
  },
}

const TEAM_ZH = {
    'Arsenal': '兵工廠',
    'Aston Villa': '阿斯頓維拉',
    'Bournemouth': '伯恩茅斯',
    'Brentford': '布倫特福德',
    'Brighton': '布萊頓',
    'Chelsea': '切爾西',
    'Coventry': '考文垂',
    'Crystal Palace': '水晶宮',
    'Everton': '艾佛頓',
    'Fulham': '富勒姆',
    'Hull': '赫爾城',
    'Ipswich': '葉士域治',
    'Leeds': '里茲聯',
    'Liverpool': '利物浦',
    'Man City': '曼城',
    'Man Utd': '曼聯',
    'Newcastle': '紐卡索',
    "Nott'm Forest": '諾丁漢森林',
    'Spurs': '熱刺',
    'Sunderland': '桑德蘭',
  }


export const LanguageContext = createContext('en')

export function translateTeam(name, lang) {
    if (lang !== 'zh') return name
    return TEAM_ZH[name] ?? name
}

export function useLang() {
  const lang = useContext(LanguageContext)
  return { 
    lang,
    t: TEXT[lang],
    teamName: (name) => translateTeam(name, lang)}
}