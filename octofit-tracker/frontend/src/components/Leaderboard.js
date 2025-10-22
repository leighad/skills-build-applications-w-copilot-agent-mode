import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard data:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);
  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title mb-4 display-6 text-success">Leaderboard</h2>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length === 0 ? (
                  <tr><td colSpan="3" className="text-center">No leaders found.</td></tr>
                ) : (
                  leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      <th scope="row">{idx + 1}</th>
                      <td>{leader.name || '-'}</td>
                      <td>{leader.score || JSON.stringify(leader)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <button className="btn btn-success mt-3">Refresh Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
