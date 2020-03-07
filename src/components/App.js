import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Loader from "../components/loader";
import "./App.scss";

const Repositories = lazy(() => import("./repositories"));
const User = lazy(() => import("./user"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            <Link to="/">Github API V2</Link>
          </p>
        </header>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Repositories} />
            <Route path="/user/:name" component={User} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
