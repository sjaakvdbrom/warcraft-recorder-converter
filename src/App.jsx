import { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import axios from 'axios';

function App() {
  const [timestamps, setTimestamps] = useState([]);
  const [runData, setRunData] = useState({});

  const getRun = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://raider.io/api/v1/mythic-plus/run-details?season=season-df-2&id=4649120`)
    .then(response => {
      setRunData({
        "dungeon": response.data.dungeon.name,
        "level": response.data.mythic_level,
        "affixes": response.data.weekly_modifiers.map(item => item.name)
      })
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // useEffect(() => {
  //   console.log(runData)
  // }, [runData]);

  return (
    <div className="md:container">
      <div className="grid lg:grid-cols-2 gap-7 lg:gap-10">
        <div>
          <FileUploader setTimestamps={setTimestamps} />
          <section className='mb-0'>
            <h2>Raider.io url</h2>
            <input type='url' className='w-full' />
            <button onClick={getRun} className='btn mt-3'>Submit</button>
          </section>
        </div>
        <div>
          <section>
            <div className="thumbnail">
              <h2>Thumbnail</h2>
            </div>
          </section>
          <section>
            <h2>Title</h2>
            <div className="title">
              {Object.keys(runData).length > 0 && `${runData.dungeon} +${runData.level}`}
            </div>
          </section>
          <section>
            <h2>Description</h2>
            <ul className='description'>
              {Object.keys(runData).length > 0 && runData.affixes.map((affix) => (
                <span>{`${affix} `}</span>
              ))}
              {timestamps.length > 0 && timestamps.map(item => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
