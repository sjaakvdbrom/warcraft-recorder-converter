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
    <section>
      <h2>Recorder json</h2>
      <label class="block">
        <span class="sr-only">Choose profile photo</span>
        <input type="file" onChange={handleFileChange} accept='application/JSON' class="
          block w-full text-sm text-slate-500
          dark:text-slate-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        "/>
      </label>
      <button onClick={handleFileSubmit}>Submit</button>
    </section>
  )
}

export default FileUploader
