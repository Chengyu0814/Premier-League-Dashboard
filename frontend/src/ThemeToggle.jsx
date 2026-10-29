import { useState, useEffect } from 'react'

function getInitialTheme() {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
    }, [theme])

    function toggleTheme() {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    )
}

export default ThemeToggle