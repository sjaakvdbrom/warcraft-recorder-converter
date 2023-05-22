import './App.css'
import { useState } from 'react';
import { dungeonEncounters } from './constants';
import { convertSeconds } from './helpers/times';

function App() {
  const [file, setFile] = useState();
  const [times, setTimes] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        setFile(JSON.parse(e.target.result));
      };
    }
  };

  const handleFileSubmit = () => {
    setTimes([]);
    file.challengeModeTimeline.map(async item => {
      const name = dungeonEncounters[item.encounterId]
      if (item.hasOwnProperty('encounterId') && dungeonEncounters.hasOwnProperty(item.encounterId)) {
        setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${name}`}])
      } else {
        setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${item.segmentType}`}])
      }
    })
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileSubmit}>Submit</button>
        
      </div>
      {times.length > 0 && (
        <div className='description'>
          {times.map(item => (
            <div>{item.description}</div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
