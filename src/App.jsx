import { useState } from 'react';
import './App.scss';

function validateVin(vin) {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/; // Допустимі символи
  if (vin.trim() === '') {
    return 'VIN cannot be empty.';
  }
  if (vin.length !== 17) {
    return 'VIN must be exactly 17 characters long.';
  }
  if (!vinRegex.test(vin)) {
    return 'VIN contains invalid characters.';
  }
  return null; // Валідація успішна
}

async function decodeVin(vin) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Results) {
    return data.Results.filter(result => result.Value !== null && result.Value !== "");
  } else {
    throw new Error(data.Message || 'Error decoding VIN');
  }
}

function saveToHistory(vin) {
  let history = JSON.parse(localStorage.getItem('vinHistory')) || [];
  if (!history.includes(vin)) {
    history = [vin, ...history.slice(0, 2)]; // Зберігаємо тільки 3 останні запити
    localStorage.setItem('vinHistory', JSON.stringify(history));
  }
}

function getHistory() {
  return JSON.parse(localStorage.getItem('vinHistory')) || [];
}

function App() {
  const [vin, setVin] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(getHistory());

  
  const clearInput = () => {
    return setVin(''), setResults([]);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Додає повільний скролл
    });
  };


  const handleDecode = async () => {
    const validationError = validateVin(vin);
    if (validationError) {
      setError(validationError);
      return;
    }


    try {
      const data = await decodeVin(vin);
      setResults(data);
      saveToHistory(vin);
      setHistory(getHistory());
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='title'>VIN decoder</div>

        <div className='inputContainer'>
          <input
            className='input'
            placeholder='Write your VIN code'
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
        </div>

        <div className='buttonContainer'>
          <button className='submit' 
          
          onClick={handleDecode}>
            Submit
          </button>
        </div>

        <div className='buttonContainer'>
          <button className='clear' 
           onClick={clearInput}
          >
            Clear
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {results.length > 0 && (
          <div className='result_container'>
          <div className='results'>
      {results.map((result, index) => (
          <div key={index}>
        <strong>{result.Variable}:</strong> {result.Value}
      </div>
      ))}
      </div>
  </div>
)}
      <div className='history_container'>
        <div className='history'>
          <div className='historyTitle'>Last VIN codes:</div>

          {history.length > 0 ? (
            history.map((hVin, index) => (
              <div key={index} className={`vinN${index + 1}`}
              onClick={() => setVin(hVin)}>
                {hVin}
              </div>
            ))
          ) : (
            <p>No recent VIN codes</p>
          )}
        </div>
        </div>

        <div className='scroll_container'>
          <button 
            className='scrollToTop'
            onClick={scrollToTop}
          >
            Scroll to top
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
