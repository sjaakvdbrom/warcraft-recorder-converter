import { useState } from 'react';
import { dungeonEncounters } from '../constants';
import { convertSeconds } from '../helpers/times';

function FileUploader( props ) {
  const [file, setFile] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        setFile(JSON.parse(e.target.result));
        setSubmitDisabled(false);
      };
    } else {
      setSubmitDisabled(true);
    }
  };

  const handleFileSubmit = () => {
    // When submitting a file first clean up the array
    props.setTimestamps([]);

    // Add individual times
    file.challengeModeTimeline.map(item => {
      const name = dungeonEncounters[item.encounterId]

      // Check if the current item is a boss and if the encounterId is in the list
      if (item.hasOwnProperty('encounterId') && dungeonEncounters.hasOwnProperty(item.encounterId)) {
        props.setTimestamps(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${name}`}])
      } else {
        props.setTimestamps(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${item.segmentType}`}])
      }
    })
  }

  return (
    <section>
      <h2>Recorder json</h2>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input type="file" onChange={handleFileChange} accept='application/JSON' className="
          block w-full text-sm text-slate-500
          dark:text-slate-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
        "/>
      </label>
      <button onClick={handleFileSubmit} disabled={submitDisabled} className='btn mt-3'>Submit</button>
    </section>
  )
}

export default FileUploader
