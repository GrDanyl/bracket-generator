import { useState, useMemo } from 'react';
import './App.css';
import Net from './nets/Net.jsx';

function App() {
  const [count, setCount] = useState(4);
  const [teams, setTeams] = useState(Array(4).fill(""));
  const [page, setPage] = useState("app");

  const handleTeamChange = (index, value) => {
      setTeams(prevTeams => {
          const updatedTeams = [...prevTeams];
          updatedTeams[index] = value;
          return updatedTeams;
      });
  };

  const handleCountChange = (e) => {
    const newCount = Number(e.target.value);
    setCount(newCount);
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.slice(0, newCount);
      return newCount > prevTeams.length ? [...updatedTeams, ...Array(newCount - prevTeams.length).fill("")] : updatedTeams;
    });
  };

  const clearTeams = () => setTeams(Array(count).fill(""));
  
  const shuffleTeams = () => {
      setTeams(prevTeams => [...prevTeams].sort(() => Math.random() - 0.5));
  };

  const currentGrid = useMemo(() => (count < 12 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), [count]);

  return (
    <div>
      {page === "app" && (
        <div className='container'>
          <div className='input-teams-section'>
            <h1>Tournament Bracket Generator</h1>
            <div>
              <label>Choose play-off net size: </label>
              <select value={count} onChange={handleCountChange}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </div>
            <div className='input-teams-container' style={{ gridTemplateColumns: currentGrid }}>
              {Array.from({ length: count }, (_, i) => (
                <input
                  key={i}
                  type='text'
                  className='input-team'
                  placeholder='Enter team name'
                  value={teams[i] || ""}
                  onChange={(e) => handleTeamChange(i, e.target.value)}
                />
              ))}
            </div>
          </div>
          <div className='button-section'>
            <button className='start-button' onClick={() => setPage("net")}>Start</button>
            <button className='mix-button' onClick={shuffleTeams}>Mix</button>
            <button className='clear-button' onClick={clearTeams}>Clear</button>
          </div>
        </div>
      )}
      {page === "net" && <Net setPage={setPage} teams={teams} />}
    </div>
  );
}

export default App;
