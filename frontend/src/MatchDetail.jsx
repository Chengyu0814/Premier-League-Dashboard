import { useParams, Link, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import { TEXT,LanguageContext,translateTeam,translateGround, usePageLanguage } from './i18n.js'
import { formatKickoff } from './matchUtils.js'
import ThemeToggle from './ThemeToggle.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'
import MatchEvents from './MatchEvents.jsx'
import Lineups from './Lineups.jsx'

const API = 'http://localhost:8000'

function MatchDetail({ lang }) {
    const t = TEXT[lang]
    const { id } = useParams()
    const { search } = useLocation()
    usePageLanguage(lang)
    const [result, setResult] = useState({ id: null, match: null, error: null })

    const loading = result.id !== id
    const match = result.match
    const error = loading ? null : result.error

    useEffect(() => {
        let ignore = false
        fetch(`${API}/api/matches/${id}`)
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return res.json()
        })
        .then((data) => {if (!ignore) setResult({ id, match: data, error: null })})
        .catch((err) => {if (!ignore) setResult({ id, match: null, error: err.message })})

        return () => {
        ignore = true
        }
    }, [id])

    return (
        <LanguageContext value={lang}>
        <div className="dashboard">
            <div className="header">
                <Link className="back-link" to={{ pathname: lang === 'zh' ? '/zh' : '/', search }}> {t.backToList} </Link>
                <div className="header-controls">
                    <LanguageSwitch />
                    <ThemeToggle />
                </div>
            </div>
            {loading && <p>{t.loading}</p>}
            {error && <p className="error">{t.loadError} {error}</p>}
            {!loading && !error && (
            <>
            <div className="match-card">
                <div className="card-top">
                    <span>{t.matchweek(match.gameweek)}</span>
                    <span>{formatKickoff(match.kickoff_ms, lang)}</span>
                </div>
                <div className="scoreline">
                    <span className="team">{translateTeam(match.home.team, lang)}</span>
                    <span className="score">
                    {match.status === 'C' ? `${match.home.score} - ${match.away.score}` : 'vs'}
                    </span>
                    <span className="team them">{translateTeam(match.away.team, lang)}</span>
                </div>
                <p className="match-info">
                    {translateGround(match.ground,lang)}
                    {match.attendance != null && ` · ${t.attendance} ${match.attendance.toLocaleString()}`}
                </p>
                <MatchEvents goals={match.goals} cards={match.cards} leftTeam={match.home.team} />
            </div>
            {match.lineups.length > 0 && <Lineups lineups={match.lineups} />}
            </>
            )}
        </div>
        </LanguageContext>
    )
    }

export default MatchDetail