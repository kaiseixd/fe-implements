import React from 'react';
import { Router } from '@/react-router';
import { BrowserHistory } from '@/history';

class BrowserRouter extends React.Component {
    history = new BrowserHistory(this.props);

    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}

export default BrowserRouter;