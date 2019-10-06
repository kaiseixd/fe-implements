import React from 'react';
import { BrowserRouter as Router, Route, Link } from '@/react-router-dom';

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

function RouterExp() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/router">Home</Link>
                    </li>
                    <li>
                        <Link to="/router/about">About</Link>
                    </li>
                    <li>
                        <Link to="/router/users">Users</Link>
                    </li>
                </ul>

                <div>
                    <Route path="/router/about">
                        <About />
                    </Route>
                    <Route path="/router/users">
                        <Users />
                    </Route>
                    <Route path="/router">
                        <Home />
                    </Route>
                </div>
            </div>
        </Router>
    );
}

export default RouterExp;