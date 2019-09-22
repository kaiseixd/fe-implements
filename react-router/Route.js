import React from 'react';
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        const location = this.props.location || context.location;
                    }
                }
            </RouterContext.Consumer>
        )
    }
}