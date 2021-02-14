import React from "react";
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin'
// import Orders from './components/Orders';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
  return (
    <Router>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Admin">Orders</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
}

// function Home() {
//   return <h2>Home</h2>;
// }



// function Users() {
//   return <h2>Users</h2>;
// }

