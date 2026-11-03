import { NavLink,useLocation  } from 'react-router'

function LanguageSwitch() {
    const { pathname, search } = useLocation() //保留原本team的搜尋 -> path: /zh/match/1 search: ?team=Aresnal
    const enPath = pathname.replace(/^\/zh(\/|$)/, '/') //   把/zh變成/
    const zhPath = enPath === '/' ? '/zh' : `/zh${enPath}` //把/變成/ 
    
    return (
    <nav className="lang-switch">
        <NavLink to={{ pathname: enPath, search }} end>EN</NavLink>
        <NavLink to={{ pathname: zhPath, search }}>中文</NavLink>
    </nav>
    )
}

export default LanguageSwitch