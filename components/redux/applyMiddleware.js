import compose from './compose';

function applyMiddleware(...middlewares) {
    return createStore => (reducer, preloadedState) => {
        const store = createStore(reducer, preloadedState);
        const getState = store.getState;
        
        const chain = middlewares.map(middleware => middleware({ getState }));
        const dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        };
    }
}

export default applyMiddleware;