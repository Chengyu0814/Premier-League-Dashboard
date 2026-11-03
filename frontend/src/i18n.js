import { createContext, useContext, useEffect } from 'react'

export const TEXT = {
  en: {
    pageTitle: 'Premier League Dashboard',
    loading: 'Loading…',
    loadError: 'Failed to load:',
    finished: 'Finished',
    upcoming: 'Upcoming',
    matchCount: (n) => `Last ${n} matches`,
    win: 'Win',
    draw: 'Draw',
    loss: 'Loss',
    goals: 'Goals',
    conceded: 'Conceded',
    matchweek: (n) => `Matchweek ${n}`,
    home: 'Home',
    away: 'Away',
    backToList: 'Back to matches',
    attendance: 'Attendance',
    starters: 'Starting XI',
    substitutes: 'Substitutes',
    captain: 'C',
    positions: { G: 'GK', D: 'DF', M: 'MF', F: 'FW' },
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
    backToList: '返回比賽列表',
    attendance: '觀眾',
    starters: '先發',
    substitutes: '替補',
    captain: '隊長',
    positions: { G: '門將', D: '後衛', M: '中場', F: '前鋒' }
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

const GROUND_ZH = {
  "Emirates Stadium" : "酋長球場",
  "Villa Park":"維拉公園球場",
  "Vitality Stadium":"活力球場",
  "Gtech Community Stadium":"布倫福社區球場",
  "Anfield":"安菲爾德球場",
  "The City Ground":"城市足球場",
  "Etihad Stadium":"伊蒂哈德球場",
  "American Express Stadium":"美國運通球場",
  "Stamford Bridge":"史丹福橋球場",
  "Hill Dickinson Stadium":"希爾迪金森球場",
  "Tottenham Hotspur Stadium":"托特納姆熱刺球場",
  "The MKM Stadium":"MKM 球場",
  "Elland Road":"艾倫路球場",
  "St. James' Park":"聖詹姆斯公園球場",
  "Portman Road":"波特曼路球場",
  "Craven Cottage":"克雷文農舍球場",
  "Coventry Building Society Arena":"考文垂建築協會球場",
  "Old Trafford":"老特拉福德球場",
  "Selhurst Park":"塞爾赫斯特公園球場",
  "Stadium of Light":"光明球場",
}

export const LanguageContext = createContext('en')

export function translateTeam(name, lang) {
  if (lang !== 'zh') return name
  return TEAM_ZH[name] ?? name
}

export function translateGround(ground,lang){
  if (lang !=="zh") return ground
  return GROUND_ZH[ground] ?? ground
}

export function useLang() {
  const lang = useContext(LanguageContext)
  return { 
    lang,
    t: TEXT[lang],
    teamName: (name) => translateTeam(name, lang),
    groundName:(gorund) => translateGround(gorund,lang)}
}

export function usePageLanguage(lang) {
    useEffect(() => {
      document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en'
      document.title = TEXT[lang].pageTitle
    }, [lang])
  }