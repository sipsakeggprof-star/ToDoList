import React,{ useState, useEffect } from 'react'
import './App.css'
import {AiOutlineDelete} from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddToDo = () => {

    let newToDoItem = {
      title: newTitle,
      description: newDescription,
       
    }
    if(newTitle.trim() === '' || newDescription.trim() === '') {
      alert('Please enter both title and description');
      return;
    }
    let updatedToDoList = [...toDoList];
    updatedToDoList.push(newToDoItem);  
    setToDoList(updatedToDoList);
    setNewTitle('');
    setNewDescription('');
    localStorage.setItem('toDoList', JSON.stringify(updatedToDoList));
  };

  useEffect(() => {
    const savedToDoList = localStorage.getItem('toDoList');
    if (savedToDoList) {
      setToDoList(JSON.parse(savedToDoList));
    }
  }, []);

  return (
    <>
     <div className="ToDo-App">
      <h1>ToDo App</h1>

      <div className="ToDo-wrapper">
        <div className="ToDo-Input">
          <div className="ToDo-Input-Item">
            <label>Title</label>
            <input type="text" placeholder='Enter Title' value={newTitle} onChange = {(e) => setNewTitle(e.target.value)} />
          </div> 
          <div className="ToDo-Input-Item">
            <label>Description</label>
            <input type="text" placeholder='Enter Description' value={newDescription} onChange = {(e) => setNewDescription(e.target.value)} />
          </div> 
          <button className="Primary-Button" onClick={handleAddToDo}>Add ToDo</button>
        </div>
        <div className="Btn-Area">
          <button className={`Secondary-Button ${isCompleteScreen === false && 'active'}`} 
          onClick={() => setIsCompleteScreen(false)}>
            ToDo
          </button>
          
          <button className={`Secondary-Button ${isCompleteScreen === true && 'active'}`} 
          onClick={() => setIsCompleteScreen(true)}>
            Completed
          </button>
        </div>
        <div className="ToDo-List">

          {toDoList.map((item, index) => {
          return(
          <div className="ToDo-List-Item" key={index}>
            
              <div className="ToDo-List-Item-Content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            
              <div className="ToDo-List-Item-Action">
                <AiOutlineDelete className='Delete-Icon' title="Delete?" />
                <BsCheckLg className='Check-Icon' title="Complete?" />
              </div>
          </div>
          )
          })}

        </div>
             
      </div>
     </div>
    </>
  )
}

export default App
