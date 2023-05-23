import './App.css'
import { useState } from 'react';
import FileUploader from './components/FileUploader';

function App() {
  const [times, setTimes] = useState([]);

  return (
    <>
      <div className='intro'>
        <h1 className='display-1'>Warcraft recorder converter</h1>
        <p>This app lets you input a warcraft recorder json and raider.io url and it will convert it to a youtube thumbnail, title and description including timestamps.</p>
      </div>
      <div className="row">
        <div className="col-6">
          <FileUploader setTimes={setTimes} />
          <section>
            <h2 className='display-2'>Raider.io url</h2>
            <input type='url' />
          </section>
        </div>
        <div className="col-6">
          <section>
            <div className="thumbnail">
              <h2 className='display-2'>Thumbnail</h2>
            </div>
          </section>
          <section>
            <div className="title">
              <h2 className='display-2'>Title</h2>
            </div>
          </section>
          <section>
            <h2 className='display-2'>Description</h2>
            <ul className='description'>
              {times.length > 0 && times.map(item => (
                <li key={item.description} className='text'>{item.description}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
