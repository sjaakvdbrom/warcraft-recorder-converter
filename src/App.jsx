import './App.css'
import { useState } from 'react';
import FileUploader from './components/fileUploader';

function App() {
  const [times, setTimes] = useState([]);

  return (
    <>
      <FileUploader setTimes={setTimes} />
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
