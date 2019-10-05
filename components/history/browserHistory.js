import { createLocation, getDOMLocation } from './locationUtils';
import { createPath } from './pathUtils';

const listeners = [];
const globalHistory = window.history;

class BrowserHistory {
    constructor() {
        bindEvent.call(this);
    }

    location = getDOMLocation();

    push(path, state) {
        const location = createLocation(path, state);
        const { state: solvedState } = location;
        globalHistory.pushState(solvedState, null, path);
        setState({ location });
    }

    replace(path, state) {
        const location = createLocation(path, state);
        const { state: solvedState } = location;
        globalHistory.replaceState(solvedState, null, path);
        setState({ location });
    }

    go(n) {
        globalHistory.go(n);
    }

    goBack() {
        this.go(-1);
    }

    goForward() {
        this.go(1);
    }

    listen(listener) {
        return appendListener(listener);
    }

    createHref(location) {
        return createPath(location);
    }
}

function bindEvent() {
    window.addEventListener('popstate', handlePopState.bind(this));
}

function appendListener(fn) {
    let isActive = true;

    function listener(...args) {
        if (isActive) fn(...args);
    }

    listeners.push(listener);

    return () => {
        isActive = false;
        listeners = listeners.filter(item => item !== listener);
    };
}

function handlePopState(event) {
    const location = getDOMLocation(event.state);
    Object.assign(this.location, location);
    setState({ location: this.location });
}

function setState(newState) {
    Object.assign(globalHistory, newState);
    listeners.forEach(listenr => listenr(globalHistory.location));
}

export default BrowserHistory;