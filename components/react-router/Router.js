import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }

    constructor(props) {
        this._isMounted = false;
        this.state = {
            location: props.history.location
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    render() {
        return (
            <RouterContext.Provider 
                children={this.props.children || null}
                value={{
                    history: this.props.history,
                    location: this.props.location,
                    match: Router.computeRootMatch(this.state.location.pathname)
                }}
            />
        );
    }
}

export default Router;