function createUseState(savedParentThisRef) {
    let states = [];
    let setters = [];
    let runed = [];
    let pointer = -1;

    function createSetter(currentPointer) {
        return (newVal) => {
            if (typeof newVal === 'function') {
                states[currentPointer] = newVal(states[currentPointer]);
            } else {
                states[currentPointer] = newVal;
            }
            pointer = -1;
            savedParentThisRef.current.forceUpdate();
        }
    }

    function useState(initial) {
        pointer++;
        if (!runed[pointer]) {
            states.push(initial)
            setters.push(createSetter(pointer))
            runed[pointer] = true;
        }
        return [states[pointer], setters[pointer]];
    }

    return useState;
}

export default createUseState
