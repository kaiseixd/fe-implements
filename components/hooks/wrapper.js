import React from 'react'

function createWrapper() {
    let savedThisRef = { current: null };

    function ForceRenderWrapper(Component) {
        return class ForceRenderWrapper extends React.Component {
            componentDidMount() {
                savedThisRef.current = this;
            }
        
            render() {
                return <Component />;
            }
        }
    }

    return { savedThisRef, ForceRenderWrapper };
}

export default createWrapper
