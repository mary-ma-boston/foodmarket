import classes from './FoodList.module.css';

const FoodList = ({foodItem, editFoodHandler,  deleteFoodHandler}) => {
    const onEditFoodHandler = (foodItemEditId)=> {
       
        editFoodHandler(foodItemEditId);
    };

    const onDeleteHandler = (event,foodDeleteId)=>{
        event.stopPropagation();

        deleteFoodHandler(foodDeleteId);    
    }

    return (
        <div className={classes.listCon} onClick={()=>onEditFoodHandler(foodItem.id)}>
            <div className={classes.foodListCon}>
                <button onClick={(event)=>onDeleteHandler(event,foodItem.id)}>delete</button>
                <div className={classes.listStyle}>Name:{foodItem.name}</div>
                <div className={classes.listStyle}>Price:{foodItem.price}</div>
                <div className={classes.listStyle}>Origin:{foodItem.origin}</div>
            </div>
        </div>   
    )
}

export default FoodList;