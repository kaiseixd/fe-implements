import compose from './compose';

function applyMiddleware(...middlewares) {
    return createStore => (reducer, preloadedState) => {
        const store = createStore(reducer, preloadedState);
        let dispatch;

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args),
        }
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        const dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        };
    }
}

export default applyMiddleware;