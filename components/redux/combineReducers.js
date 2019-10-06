function combineReducers(reducers) {
    return (state = {}, action) => {
        let nextState = {};
        let hasChanged = false;

        for (let key in reducers) {
            const previousStateForKey = state[key];
            const nextStateForKey = reducers[key](previousStateForKey, action);

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        return hasChanged ? nextState : state;
    }
}

export default combineReducers;