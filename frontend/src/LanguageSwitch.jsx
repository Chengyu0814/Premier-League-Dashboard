import { NavLink } from 'react-router'

function LanguageSwitch() {
    return (
    <nav className="lang-switch">
        <NavLink to="/" end>EN</NavLink>
        <NavLink to="/zh">中文</NavLink>
    </nav>
    )
}

export default LanguageSwitch