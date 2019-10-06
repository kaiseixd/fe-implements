import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from '@/react-router-dom';

import ReduxExp from './components/redux';
import RouterExp from './components/router';

function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/router/">Router Example</Link>
                    </li>
                    <li>
                        <Link to="/redux">Redux Example</Link>
                    </li>
                </ul>

                <div>
                    <Route path="/router" component={RouterExp} />
                    <Route path="/redux" component={ReduxExp} />
                </div>
            </div>
        </Router>
    );
}

render(<App />, document.getElementById('root'));