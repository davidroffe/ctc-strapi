import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Splash from "./Splash";
import Latest from "./Latest";
import Guide from "./Guide";
import About from "./About";
import Logo from "../assets/images/ctc-logo.png"
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header id="main-header">
            <Link className="logo" to="/">
              <img src={Logo} alt="Classic Team Championship Logo" />
            </Link>
              <nav id="main-nav">
                <Link to="/latest">Latest</Link>
                <Link to="/latest">Schedule</Link>
                <Link to="/latest">Standings</Link>
                <a href="https://members.iracing.com/jforum/forums/show/625.page" target="_blank">Forum</a>
              <Link to="/guide">Guide</Link>
              <Link to="/about">About</Link>
              </nav>
          </header>
          <Route path="/" exact component={Splash} />
          <Route path="/latest" exact component={Latest} />
        <Route path="/guide" exact component={Guide} />
          <Route path="/about" exact component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
