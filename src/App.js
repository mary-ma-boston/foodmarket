import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import FoodList from './components/FoodList';
// import './App.css';
import classes from './App.module.css';


function App() {
  const [foodLists, setFoodLists] = useState([]);
  const [food, setFood] = useState({
    id: '',
    name:'',
    price:'',
    origin:'',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);
 
 


  const inputHandler = (e) => {
    if(e.target.value !==''){
      setIsInputValid(true);
    }

    
      setFood({...food, [e.target.name]:e.target.value}); 
  };

  const submitHandler = (e) => {
    
    e.preventDefault();
    if(food.name === '' || food.origin === '' || food.price === '') {
      setIsInputValid(false);
      return
    }
    
    if(!isEdit && isInputValid) {
      let newId = uuidv4();
      let newFood = {...food, id: newId};
      setFood(newFood);
      let newFoodLists = [ ...foodLists, newFood];
   
      setFoodLists(newFoodLists);
    } else if(isEdit && isInputValid) {
    
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
    setIsInputValid(true);
    
      setIsEdit(true);
      const findEditItem = (foodLists.filter(item => item.id === editId))[0];
     
      setFood(findEditItem);
  };

  const deleteFoodHandler = (deleteId) => {
    setIsInputValid(true);
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
            <input type='number' value={food.price} name='price' onChange={inputHandler}/>
          </div>
          <div className={classes.inputStyle}>
            <label>Origin:</label>
            <input type='text' value={food.origin} name='origin' onChange={inputHandler}/>
          </div>
          {isInputValid?'':<p style={{textAlign:'center',fontSize:'15px'}}>please input valid value!</p>}
          <button type='submit'>{!isEdit? 'ADD':'Update'}</button>
        </form>
      </div>  
    </div>
  );
}

export default App;
