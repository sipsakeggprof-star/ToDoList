import React,{ useState, useEffect } from 'react'
import './App.css'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedList, setCompletedList] = useState([]);
  const [completedOn, setCompletedOn] = useState('');
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

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

    const handleDelete = (index) => {
    let reducedToDoList = [...toDoList];
    reducedToDoList.splice(index, 1);
    setToDoList(reducedToDoList);
    localStorage.setItem('toDoList', JSON.stringify(reducedToDoList));
  };
  
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; //January is 0!
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    let completedOn = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m + ':' + s;
    let filteredToDoList = [...toDoList];
    let completedItem = filteredToDoList.splice(index, 1)[0];
    completedItem.completedOn = completedOn;
    setToDoList(filteredToDoList);
    setCompletedList([...completedList, completedItem]);
    handleDelete(index);
    localStorage.setItem('completedList', JSON.stringify([...completedList, completedItem]));
  };

  const handleDeleteCompleted = (index) => {
    let reducedCompletedList = [...completedList];
    reducedCompletedList.splice(index, 1);
    setCompletedList(reducedCompletedList);
    localStorage.setItem('completedList', JSON.stringify(reducedCompletedList));
  };

  useEffect(() => {
    const savedToDoList = localStorage.getItem('toDoList');
    const savedCompletedList = localStorage.getItem('completedList');
    if (savedToDoList) {
      setToDoList(JSON.parse(savedToDoList));
    }
    if (savedCompletedList) {
      setCompletedList(JSON.parse(savedCompletedList));
    } 
  }, []);

  const handleEdit = (index) => {
    setCurrentEditingIndex(index);
    setNewTitle(toDoList[index].title);
    setNewDescription(toDoList[index].description);
  };

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

          {isCompleteScreen === false &&
            toDoList.map((item, index) => {
              if(currentEditingIndex === index) {
                
                  <div className="edit_wrapper" >
                    <input placeholder="Update Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <input placeholder="Update Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <button className="Primary-Button" onClick={() => handleUpdate(index)}>Update</button>
                  </div>
              }
              return(
              <div className="ToDo-List-Item" key={index}>
                  
                  <div className="ToDo-List-Item-Content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
            
              <div className="ToDo-List-Item-Action">
                <AiOutlineDelete className='Delete-Icon' onClick= {() =>handleDelete(index)}title="Delete?" />
                <BsCheckLg className='Check-Icon' onClick={() => handleComplete(index)} title="Complete?" />
                <AiOutlineEdit className='Edit-Icon' onClick={() => handleEdit(index)} title="Edit?" />
              </div>
          </div>
          )
          })}
          {isCompleteScreen === true &&
            completedList.map((item, index) => {
              return(
              <div className="ToDo-List-Item" key={index}>
                  
                  <div className="ToDo-List-Item-Content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
              </div>
            
              <div className="ToDo-List-Item-Action">
                <AiOutlineDelete className='Delete-Icon' onClick= {() =>handleDeleteCompleted(index)}title="Delete?" />
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
