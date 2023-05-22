import { useState } from 'react';
import { dungeonEncounters } from '../constants';
import { convertSeconds } from '../helpers/times';

function FileUploader( props ) {
  const [file, setFile] = useState();

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
    // When submitting a file first clean up the array
    props.setTimes([]);

    // Add individual times
    file.challengeModeTimeline.map(item => {
      const name = dungeonEncounters[item.encounterId]

      // Check if the current item is a boss and if the encounterId is in the list
      if (item.hasOwnProperty('encounterId') && dungeonEncounters.hasOwnProperty(item.encounterId)) {
        props.setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${name}`}])
      } else {
        props.setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${item.segmentType}`}])
      }
    })
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept='application/JSON' />
      <button onClick={handleFileSubmit}>Submit</button>
    </div>
  )
}

export default FileUploader
