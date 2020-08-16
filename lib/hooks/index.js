import createWrapper from './wrapper';
import createUseState from './useState';

export default function createHooks() {
    const { savedThisRef, ForceRenderWrapper } = createWrapper();
    const useState = createUseState(savedThisRef);
    return {
        ForceRenderWrapper,
        useState,
    }
}
