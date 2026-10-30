import { Routes, Route } from 'react-router'
import PremierLeague from'./PremierLeague.jsx';
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PremierLeague lang="en" />} />
      <Route path="/zh" element={<PremierLeague lang="zh" />} />
      <Route path="*" element={<p className="dashboard">404 Page not found</p>} />
    </Routes>
  )
}

export default App
