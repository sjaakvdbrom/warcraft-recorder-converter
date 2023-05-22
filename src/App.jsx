import './App.css'
import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns'
import {encode} from 'base-64';

function App() {
  const [file, setFile] = useState();
  const [times, setTimes] = useState();

  const getChar = async id => {
    const login = import.meta.env.VITE_BNET_ID;
    const password = import.meta.env.VITE_BNET_SECRET;
    try {
      const tokenResponse = await fetch('https://eu.battle.net/oauth/token', {
        body: 'grant_type=client_credentials',
        headers: {
          Authorization:
          `Basic ${encode(`${login}:${password}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })
      const tokenData = await tokenResponse.json()
      const bearerToken = tokenData.access_token
      const lookupResponse = await fetch(
        `https://eu.api.blizzard.com/data/wow/journal-encounter/${id}?namespace=static-eu&access_token=EUyBk4DjrD47tBJBMvaCsqR2wM19e21Ovr`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET'
        }
      )
      const data = await lookupResponse.json()
      if (data.name) {
        return data.name.en_US
      }
      if (data.reason) {
        setError(data.reason)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
      if (item.hasOwnProperty('encounterId')) {
        timestamps.push({
          "description": `${convertSeconds(item.timestamp)} ${item.segmentType}`,
        })
      } else {
        timestamps.push({
          "description": `${convertSeconds(item.timestamp)} ${item.segmentType}`
        })
      }
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
