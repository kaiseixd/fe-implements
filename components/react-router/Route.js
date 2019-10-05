import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        const location = this.props.location || context.location;
                        const match = matchPath(location.pathname, this.props);

                        const props = { ...context, location, match };

                        let { children, component, render } = this.props;

                        return (
                            <RouterContext.Provider value={props}>
                                {
                                    props.match
                                        ? children
                                            ? typeof children === 'function'
                                                ? children(props)
                                                : children
                                            : component
                                                ? React.createElement(component, props)
                                                : render
                                                    ? render(props)
                                                    : null
                                        : typeof children === 'function'
                                            ? children(props)
                                            : null
                                }
                            </RouterContext.Provider>
                        )
                    }
                }
            </RouterContext.Consumer>
        )
    }
}

export default Route;