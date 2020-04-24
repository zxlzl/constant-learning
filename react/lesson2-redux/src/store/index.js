import { createStore } from "redux";

function counter(state = 0, {type,payload=10}) {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state
  }
}

export default createStore(counter)
