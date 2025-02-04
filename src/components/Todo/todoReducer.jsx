export const todoReducer = ( state, action ) => {    
  switch (action.type) {
    case "ADD_TODO":
        return [ ...state, action.payload];
    case "REMOVE_TODO":
        return state.filter((todo)=>todo.id !== action.payload);
    case "SUCCESS_TODO":
        return state.map((todo)=>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
    case "EDIT_TODO":
        return state.map((todo)=>todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo);
    case "LOAD":
        return action.payload;
    default:
        return state;
  }
}
