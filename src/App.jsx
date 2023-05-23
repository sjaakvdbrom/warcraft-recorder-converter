import './App.css'
import { useState } from 'react';
import FileUploader from './components/fileUploader';

function App() {
  const [times, setTimes] = useState([]);

  return (
    <>
      <FileUploader setTimes={setTimes} />
      <div className="title">
        <h2>Title</h2>
      </div>
      <div className='description'>
        <h2>Description</h2>
        {times.length > 0 && times.map(item => (
          <div key={item.description}>{item.description}</div>
        ))}
      </div>
    </>
  )
}

export default App
