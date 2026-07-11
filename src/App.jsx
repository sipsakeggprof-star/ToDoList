import React,{ useState } from 'react'
import './App.css'

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false)

  return (
    <>
     <div className="ToDo-App">
      <h1>ToDo App</h1>

      <div className="ToDo-wrapper">
        <div className="ToDo-Input">
          <div className="ToDo-Input-Item">
            <label>Title</label>
            <input type="text" placeholder='Enter Title' />
          </div> 
          <div className="ToDo-Input-Item">
            <label>Description</label>
            <input type="text" placeholder='Enter Description' />
          </div> 
          <button className="Primary-Button">Add ToDo</button>
        </div>
        <div className="Bth-Area">
          <button className={`isCompleteScreen ${isCompleteScreen ===false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>ToDo</button>
          
          <button className={`isCompleteScreen ${isCompleteScreen ===true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="ToDo-List">
          <div>
            <h3>Task</h3> 
            <h3>Description</h3>
            <h3>Status</h3>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
