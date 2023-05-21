import './App.css'
import { useState } from 'react';
import { intervalToDuration } from 'date-fns'

function App() {
  const [file, setFile] = useState();
  const [times, setTimes] = useState();

  const convertSeconds = totalSeconds => {
    if (totalSeconds === 0) {
      return '00:00'
    }
  
    const seconds = totalSeconds
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
    const zeroPad = (num) => String(num).padStart(2, '0')
  
    const formatted = [
      duration.hours,
      duration.minutes,
      duration.seconds,
    ]
    .filter(Boolean)
    .map(zeroPad)
    .join(':')

    return formatted
  }

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
    const timestamps = [];
    console.log(file.challengeModeTimeline)

    file.challengeModeTimeline.map(item => {
      timestamps.push({
        "description": `${convertSeconds(item.timestamp)} ${item.segmentType}`
      })
    })

    setTimes(timestamps)
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileSubmit}>Submit</button>
        
      </div>
      {times && times.map(item => {
        return <div>{item.description}</div>
      })}
    </>
  )
}

export default App
