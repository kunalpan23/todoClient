import * as types from './action-types';

export const fetchAllTodo = () => ({type : types.FETCH_ALL_TODO});
export const addTodo = (payload:Object) => ({type : types.ADD_TODO, payload : payload});
export const updateTodo = (payload:Object) => ({type : types.UPDATE_TODO, payload : payload});
export const deleteTodo = (payload:Object) => ({type : types.DELETE_TODO, payload : payload});