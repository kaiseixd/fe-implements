import React from 'react';
import RouterContext from './RouterContext';
import hoistStatics from "hoist-non-react-statics";

function withRouter(Component) {
    const C = props => {
        const { wrappedComponentRef, ...others } = props;
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        return (
                            <Component
                                {...others}
                                {...context}
                                ref={wrappedComponentRef}
                            />
                        )
                    }
                }
            </RouterContext.Consumer>
        )
    }

    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
    // return C;
}

export default withRouter;