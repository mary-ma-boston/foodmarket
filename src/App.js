import React, {useState} from 'react';

import FoodList from './components/FoodList';
import './App.css';
import classes from './App.module.css';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [foodLists, setFoodLists] = useState([]);
  const [food, setFood] = useState({
    id: '',
    name:'',
    price:'',
    origin:'',
  });
  const [isEdit, setIsEdit] = useState(false);

  const inputHandler = (e) => {
    
    setFood({...food, [e.target.name]:e.target.value});
  };

  const submitHandler = (e) => {
    
    e.preventDefault();
    
    if(!isEdit) {
      let newId = uuidv4();
      let newFood = {...food, id: newId};
      setFood(newFood);
      let newFoodLists = [ ...foodLists, newFood];
   
      setFoodLists(newFoodLists);
    } else {
      // let filteredFoodLists = foodLists.filter(item=>item.id !== food.id);
      // let newFoodLists = [food, ...filteredFoodLists];
      const currentIndex = foodLists.findIndex(item => item.id === food.id);
      const frontArray = foodLists.slice(0,currentIndex);
      const endArray = foodLists.slice(currentIndex+1);
      const newFrontFoodLists = [...frontArray, food];
      let newFoodLists = [...newFrontFoodLists, ...endArray];

      setFoodLists(newFoodLists);
      setIsEdit(false);
    }
    
    setFood({
      id: '',
      name:'',
      price:'',
      origin:'',
    });  
  };

  const editFoodHandler = (editId) => {
    
      setIsEdit(true);
      const findEditItem = (foodLists.filter(item => item.id === editId))[0];
     
      setFood(findEditItem);
  };

  const deleteFoodHandler = (deleteId) => {
    
    const filteredLists = foodLists.filter(item=>item.id !== deleteId);
    setFoodLists(filteredLists);

    setFood({
      id: '',
      name:'',
      price:'',
      origin:'',
    }); 
    
  }

  return (
    <div className={classes.container}>
      <h1>Food Market</h1>
      <div className={classes.listContainer}>
        {foodLists.map(item=>{
          return <FoodList 
                    key={item.id} 
                    foodItem={item} 
                    editFoodHandler={editFoodHandler}  
                    deleteFoodHandler={ deleteFoodHandler}
                  />
        })}
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={submitHandler} >
          <div className={classes.inputStyle}>
            <label>Name:</label>
            <input type='text' value={food.name} name='name' onChange={inputHandler}/>
          </div>
          <div className={classes.inputStyle}>
            <label>Price:</label>
            <input type='text' value={food.price} name='price' onChange={inputHandler}/>
          </div>
          <div className={classes.inputStyle}>
            <label>Origin:</label>
            <input type='text' value={food.origin} name='origin' onChange={inputHandler}/>
          </div>
          <button type='submit'>{!isEdit? 'ADD':'Update'}</button>
        </form>
      </div>  
    </div>
  );
}

export default App;
