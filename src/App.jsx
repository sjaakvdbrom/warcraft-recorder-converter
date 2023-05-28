import { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import axios from 'axios';
import { millisecondsToSeconds } from 'date-fns'
import { convertSeconds } from './helpers/times';
import Canvas from './components/Canvas';

function App() {
  const [timestamps, setTimestamps] = useState([]);
  const [runData, setRunData] = useState({});

  const getRun = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://raider.io/api/v1/mythic-plus/run-details?season=season-df-2&id=5914116`)
    .then(response => {
      setRunData({
        "dungeon": response.data.dungeon.name,
        "level": response.data.mythic_level,
        "affixes": response.data.weekly_modifiers.map(item => ({
          "name": item.name,
          "icon": item.icon
        })),
        "time": millisecondsToSeconds(response.data.clear_time_ms),
        "image": {
          "expansionId": response.data.dungeon.expansion_id,
          "slug": response.data.dungeon.slug,
        }
      })
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const printAffixes = () => {
    if (Object.keys(runData).length === 0) return
  
    return (
      runData.affixes.map((affix, index) => {
        if (index + 1 === runData.affixes.length - 1) {
          return `${affix.name} and `
        }

        if (index + 1 < runData.affixes.length - 1) {
          return `${affix.name}, `
        }

        return `${affix.name}. `
      })
    )
  }

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
              {Object.keys(runData).length > 0 && (
                <Canvas
                title={`${runData.dungeon} +${runData.level}`}
                affixes={runData.affixes}
                image={`https://cdnassets.raider.io/images/dungeons/expansion${runData.image.expansionId}/base/${runData.image.slug}.jpg`} 
                />
              )}
            </div>
          </section>
          <section>
            <h2>Title</h2>
            <div className="title">
              {Object.keys(runData).length > 0 && `${runData.dungeon} +${runData.level}`} | Prot Paladin POV | Dragonflight 10.1 Season 2 M+
            </div>
          </section>
          <section>
            <h2>Description</h2>
            <ul className='description'>
              {Object.keys(runData).length > 0 && `Dragonflight season 2 Mythic plus keystone +${runData.level} ${runData.dungeon} completed in ${convertSeconds(runData.time)} with the affixes `} {printAffixes()}
              {Object.keys(runData).length > 0 && (
                <>
                  More details about this run can be found at <a href={`https://raider.io/mythic-plus-runs/season-df-2/2943404-${runData.level}-${runData.image.slug}`} className='underline' target='_blank'>{`https://raider.io/mythic-plus-runs/season-df-2/2943404-${runData.level}-${runData.image.slug}`}</a>
                </>
              )}
              <br /><br />
              {timestamps.length > 0 && timestamps.map(item => (
                <div key={item.description}>{item.description}</div>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
