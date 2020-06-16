import { todoListType, FilterValuesType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  filter: FilterValuesType;
  id: string;
};

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;


export const todolistsReducer = ( state: Array<todoListType>, action: ActionType ) => {
  switch ( action.type ) {
    case 'REMOVE-TODOLIST':
      return state.filter( todoList => todoList.id !== action.id );

    case 'ADD-TODOLIST':
      let newTodoList: todoListType = { id: v1(), title: action.title, filter: 'all' };
      return [ ...state, newTodoList ];


    case 'CHANGE-TODOLIST-FILTER':
      const todolist = state.find( tl => tl.id === action.id );
      if ( todolist ) {
        todolist.filter = action.filter;
        return [ ...state ];
      }
      return state;

    case 'CHANGE-TODOLIST-TITLE':
      const todoList = state.find( tl => tl.id === action.id );
      if ( todoList ) {
        todoList.title = action.title;
        return [ ...state ];
      }
      return state;

    default:
      throw new Error( "I don't understand this type" );
  }
};

export const RemoveTodolistAC = ( todolistId: string ): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const AddTodolistAC = ( title: string ): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title };
};

export const ChangeTodolistFilterAC = ( filter: FilterValuesType, id: string ): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id };
};

export const ChangeTodolistTitleAC = ( id: string, title: string ): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};
