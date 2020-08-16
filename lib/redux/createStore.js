function createStore(reducer, preloadedState, enhancer) {
    if (typeof enhancer !== 'undefined') {
        return enhancer(createStore)(reducer, preloadedState);
    }

    let currentReducer = reducer;
    let currentState = preloadedState;
    let listeners = [];

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            listeners = listeners.filter(item => item !== listener);
        }
    }

    function dispatch(action) {
        currentState = currentReducer(currentState, action);
        listeners.forEach(listener => listener());

        return action;
    }

    function replaceReducer(nextReducer) {
        currentReducer = nextReducer;
    }

    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer
    }
}

export default createStore;