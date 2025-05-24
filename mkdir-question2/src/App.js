import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [type, setType] = useState('e');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNumbers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`);
      setResult(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Average Calculator</h1>

      <div style={styles.controls}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
          <option value="e">Even</option>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="r">Random</option>
        </select>

        <button onClick={fetchNumbers} style={styles.button}>
          Fetch Numbers
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {result && (
        <div style={styles.resultBox}>
          <h3>Window Previous State: {JSON.stringify(result?.windowPrevState)}</h3>
          <h3>Window Current State: {JSON.stringify(result?.windowCurrState)}</h3>
          <h3>Numbers Fetched: {JSON.stringify(result?.numbers)}</h3>
          <h3>Average: {result?.avg}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20, fontFamily: 'Arial' },
  header: { fontSize: 30, marginBottom: 20 },
  controls: { marginBottom: 20 },
  select: { padding: 10, marginRight: 10 },
  button: { padding: 10, background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
  resultBox: { backgroundColor: '#f4f4f4', padding: 15, borderRadius: 5 }
};

export default App;
