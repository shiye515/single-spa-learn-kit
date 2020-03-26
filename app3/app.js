import React, { PureComponent } from "react";
import { HashRouter, Link, Switch, Route } from "react-router-dom";
class Root extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    props.dva.model({
      namespace: props.name,
      state: {
        content: "app3 state"
      },
      reducers: {
        add(state, { payload }) {
          return { ...state, ...payload };
        }
      }
    });
  }
  componentWillUnmount() {
    const { dva, name } = this.props;
    dva.unmodel(name);
  }
  render() {
    const { dva } = this.props;
    dva.router(() => (
      <HashRouter basename="/app3">
        <div style={{ border: "1px solid red" }}>
          <div>app3</div>
          <div>
            <Link to="/inner1">inner1 link</Link>
            <Link to="/inner2">inner2 link</Link>
          </div>
          <Switch>
            <Route path="/inner1" render={() => <div>inner1</div>} />
            <Route path="/inner2" render={() => <div>inner2</div>} />
          </Switch>
        </div>
      </HashRouter>
    ));
    return dva.start()();
  }
}
export default Root;
