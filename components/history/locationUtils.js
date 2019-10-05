import { parsePath } from './pathUtils';

export function createLocation(path, state) {
    let location;
    if (typeof path === 'string') {
        // Two-arg form: push(path, state)
        location = parsePath(path);
        location.state = state;
    } else {
        // One-arg form: push(location)
        location = { ...path };

        if (location.pathname === undefined) location.pathname = '';

        if (location.search) {
            if (location.search.charAt(0) !== '?')
                location.search = '?' + location.search;
        } else {
            location.search = '';
        }

        if (location.hash) {
            if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
        } else {
            location.hash = '';
        }

        if (state !== undefined && location.state === undefined)
            location.state = state;
    }

    return location;
}

export function getDOMLocation(historyState) {
    const state = historyState || window.history.state || {};
    const { pathname, search, hash } = window.location;

    let path = pathname + search + hash;

    return createLocation(path, state, key);
}