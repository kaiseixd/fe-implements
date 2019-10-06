import React from 'react';
import { combineReducers, bindActionCreators, createStore } from '@/redux';
import * as TestActionCreators from './actionCreators';

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const reducers = combineReducers({
    todos,
    counter
});

const store = createStore(reducers, { todos: 'work', counter: 0 });
const boundActionCreators = bindActionCreators(TestActionCreators, store.dispatch);

class ReduxExp extends React.Component {
    state = store.getState()

    componentDidMount() {
        store.subscribe(this.onChange);
    }

    onChange = () => {
        this.setState(store.getState());
    }

    addTodo = () => {
        const { addTodo } = boundActionCreators;
        addTodo('reading');
    }

    addCounter = () => {
        const { addCounter } = boundActionCreators;
        addCounter();
    }

    render() {
        const { todos, counter } = this.state;
        return (
            <div>
                <div>todos: { todos }</div>
                <div>counter: { counter }</div>
                <button onClick={this.addTodo}>add todo</button>
                <button onClick={this.addCounter}>add counter</button>
            </div>
        )
    }
}

export default ReduxExp;