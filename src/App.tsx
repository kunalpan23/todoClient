import React, {useState, useEffect, useCallback} from 'react'; 
import axios from 'axios'; 

import API from './constants/API'; 


const API_DETAILS = new API();

function App() {  

  const [ inputVal, setInputVal ] = useState(""); 
  
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function  customFetch(){
      const {data} = await axios.get(API_DETAILS.allTodo);
      setTodoList(data);
    }
    customFetch();
  },[]);

  

  const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Api call post method with the data */
    const temp = {
      label: inputVal,
      completed: 0 
    };

    axios.post(API_DETAILS.addTodo,null, { params: temp}).then((res) =>{
      
      const state:any = [...todoList, res.data]; 
      setTodoList(state);
      setInputVal("");

    }).catch((err) => console.log(err));

  };  

  const updateTodoHandler = ({type, payload}:{type:String, payload:any}) => {
    switch(type){
        case "EDIT":
          return;
        case "COMPLETED":
          axios.post(API_DETAILS.updateTodo, null, { params: {
            id : payload._id,
            completed: payload.completed ? 0 : 1
          }}).then((res:any) => { 
            const filtered:any = todoList.map((item:any) => {
              if(item._id === res.data._id){
                console.log(res.data.completed);
                const temp = {...item};
                temp.completed = res.data.completed ? 0: 1 ;
                return temp;
              }else{
                return item;
              }
            });
            setTodoList(filtered);
          });
          return;
      }
    };


  const removeTodoHandler = (item:any) => {
    const id = item._id;
    axios.post(API_DETAILS.deleteTodo, null, { params: {id: id}}).then((data:any) => {
        const list = todoList.filter((item:any) => item._id !== id );
        setTodoList(list);
    });
  }

  return (
    <div className="wrapper">
      <div className="header">
        <div className="form_wrap">
          <form className="formControl" onSubmit={onSubmitHandler}>
            <div className="custom-checkbox hbox">
              <div className="text-wrap flex hbox main-center">
                <input type="text" placeholder="Whats on your mind?" onChange={e => setInputVal(e.target.value)} value={inputVal}/>
              </div>
              <div className="text-wrap">
                <button type="submit">Add Todo</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="body">
        
        <div className="heading">
          <h1>Todo List</h1>
        </div>
        
        <div className="todo-wrap">
          <ul className="todo-list">
              {
                todoList.map((item:any, index:Number) => (
                  <li key={`${item.label}_${index}`} >
                    <div className={`flex hbox item-wrap ${item.completed ? "checked" : ""}`}>
                      <div className="checkbox-wrap">
                        <input type="checkbox" id={`${item.label}_${index}`} className="checkBox" checked={item.completed?true: false} onChange={() => updateTodoHandler({type:"COMPLETED", payload: item})} />
                        <label htmlFor={`${item.label}_${index}`}></label>
                      </div>
                      <div className="label-text">{item.label}</div>
                      <div className="label-options">
                        <span className="label-edit" onClick={() => updateTodoHandler({type: "EDIT", payload: item})}>✏️</span>{/* TODO edit */}
                        <span className="label-delete" onClick={() => removeTodoHandler(item)}>🗑️</span>
                      </div>
                    </div>
                  </li>
                ))
              }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
