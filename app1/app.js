import React from "react";
import { HashRouter, Link } from "react-router-dom";
import dva, { connect } from "dva";

const app = dva();
app.model({
  namespace: "app1",
  state: 0,
  reducers: {
    add(count) {
      return count + 1;
    },
    minus(count) {
      return count - 1;
    }
  }
});

const App = connect(props => props)(function(props) {
  return (
    <HashRouter>
      <h2>
        {props.app1}
        <button
          key="add"
          onClick={() => {
            props.dispatch({ type: "app1/add" });
          }}
        >
          +
        </button>
        <button
          key="minus"
          onClick={() => {
            props.dispatch({ type: "app1/minus" });
          }}
        >
          -
        </button>
      </h2>

      <Link to="/app2">app2 link</Link>
      <Link to="/app3">app3 link</Link>
    </HashRouter>
  );
});

app.router(() => <App />);
export default app.start();
