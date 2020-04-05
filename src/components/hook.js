import React from 'react';
import createHooks from '@/hooks';

const { useState, ForceRenderWrapper } = createHooks();

function useStateExp() {
    const [count, setCount] = useState(0);
    const [anotherCount, setAnotherCount] = useState(0);

    function onCountClick() {
        setCount(count + 1);
    }

    function onAnotherCountClick() {
        setAnotherCount(value => value + 2);
    }

    return (
        <div>
            <div onClick={onCountClick}>count: {count}</div>
            <div onClick={onAnotherCountClick}>another count: {anotherCount}</div>
        </div>
    );
}

export default ForceRenderWrapper(useStateExp);
