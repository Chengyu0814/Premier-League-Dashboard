import { Routes, Route } from 'react-router'
import PremierLeague from'./PremierLeague.jsx';
import MatchDetail from './MatchDetail.jsx'
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PremierLeague lang="en" />} />
      <Route path="/zh" element={<PremierLeague lang="zh" />} />
      <Route path="/match/:id" element={<MatchDetail lang="en"/>}/>
      <Route path="/zh/match/:id" element={<MatchDetail lang="zh"/>}/>
      <Route path="*" element={<p className="dashboard">404 Page not found</p>} />
    </Routes>
  )
}

export default App
