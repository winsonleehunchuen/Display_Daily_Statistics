import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyStatistics.css';

function DailyStatistics({ user }) {
  const [sleepData, setSleepData] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch sleep data and user analysis data from API
    const fetchData = async () => {
      try {
        const [sleepResponse, analysisResponse] = await Promise.all([
          axios.get(`https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=${user.UserID}`),
          axios.get(`https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=${user.UserID}`)
        ]);
        setSleepData(sleepResponse.data);
        setAnalysisData(analysisResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, [user.UserID]);

  return (
    <div className="daily-statistics-container">
      <h2 className="section-title">{user.UserName}'s Daily Statistics</h2>
      {loading && <p className="loading-indicator">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          <div className="data-section scrollable">
            <h3 className="subsection-title">Sleep Data</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Awake</th>
                  <th>Light</th>
                  <th>Deep</th>
                </tr>
              </thead>
              <tbody>
                {sleepData.map(stat => (
                  <tr key={stat.HRVDate}>
                    <td>{stat.HRVDate}</td>
                    <td>{stat.Awake}</td>
                    <td>{stat.Light}</td>
                    <td>{stat.Deep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="data-section scrollable">
            <h3 className="subsection-title">User Analysis</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Vitalz Score</th>
                  <th>Score Type</th>
                  <th>Stressor Index</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map(analysis => (
                  <tr key={analysis.HRVDate}>
                    <td>{analysis.HRVDate}</td>
                    <td>{analysis.VitalzScore}</td>
                    <td>{analysis.ScoreType}</td>
                    <td>{analysis.StressorIndex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default DailyStatistics;
