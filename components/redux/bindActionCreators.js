function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator.call(this, ...args));
}

function bindActionCreators(actionCreators, dispatch) {
    const actions = {}

    for (let key in actionCreators) {
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            actions[key] = bindActionCreator(actionCreator, dispatch);
        }
    }

    return actions;
}

export default bindActionCreators;