import { useState } from 'react';
import FileUploader from './components/FileUploader';

function App() {
  const [times, setTimes] = useState([]);

  return (
    <div className="container">
      <div className='mb-10'>
        <h1>Warcraft recorder converter</h1>
        <p>This app lets you input a warcraft recorder json and raider.io url and it will convert it to a youtube thumbnail, title and description including timestamps.</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <FileUploader setTimes={setTimes} />
          <section>
            <h2>Raider.io url</h2>
            <input type='url' className='w-full' />
          </section>
        </div>
        <div>
          <section>
            <div className="thumbnail">
              <h2>Thumbnail</h2>
            </div>
          </section>
          <section>
            <div className="title">
              <h2>Title</h2>
            </div>
          </section>
          <section>
            <h2>Description</h2>
            <ul className='description'>
              {times.length > 0 && times.map(item => (
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
