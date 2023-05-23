import { useState } from 'react';
import FileUploader from './components/FileUploader';

function App() {
  const [timestamps, setTimestamps] = useState([]);

  return (
    <div className="md:container">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <FileUploader setTimestamps={setTimestamps} />
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
