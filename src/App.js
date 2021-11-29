import './App.css';
import Details from './Details';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maps from './Maps';
import Home from './Home';

// import Maps2 from './Maps2'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/maps">
          <Maps />
          {/* <Details /> */}
        </Route>
    </Router>
  );
}

export default App;
