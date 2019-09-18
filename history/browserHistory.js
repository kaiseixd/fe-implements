import { createLocation, getDOMLocation } from "./locationUtils";
import { createPath } from "./pathUtils";

const listenrs = [];
const globalHistory = window.history;

class BrowserHistory {
	constructor() {
		bindEvent.call(this);
	}

	location = getDOMLocation();

	push(path, state) {
		const solvedPath = createPath(location);
		const { state: solvedState } = createLocation(path, state);
		globalHistory.pushState(solvedState, null, solvedPath);
	}

	replace(path, state) {
		const solvedPath = createPath(location);
		const { state: solvedState } = createLocation(path, state);
		globalHistory.replaceState(solvedState, null, solvedPath);
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
	Object.assign(this.location, location)
	listenrs.forEach(listenr => listenr(this.location));
}

export default BrowserHistory;