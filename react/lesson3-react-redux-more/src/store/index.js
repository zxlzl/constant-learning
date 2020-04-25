import {createStore, combineReducers} from 'redux';

const initUser = {
  isLogin: false,
  username: ''
}

export const loginReducer = (state={initUser},{type})=>{
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {...state, isLogin:true,username:'xiaoming'}
    default:
      return state;
  }
}

const state = createStore(combineReducers({user: loginReducer}))

export default state;
