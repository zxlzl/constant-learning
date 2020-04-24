// import { createStore } from "redux";
import { createStore } from "../zredux";

function counter(state = 0, {type,payload=10}) {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      console.log(state);
      return state
  }
}

export default createStore(counter)
