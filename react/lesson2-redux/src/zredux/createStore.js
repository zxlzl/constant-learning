export default function createStore(reducer) {
  let currentState = null
  let currentListeners = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    console.log(11111);
    currentState = reducer(currentState,action)
    currentListeners.forEach(listener=>listener())
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  dispatch({type: 'asdasdsasad'})

  return {
    getState,
    dispatch,
    subscribe,
  };
}
