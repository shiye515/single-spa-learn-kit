import React, { PureComponent } from "react";
import { HashRouter, Link } from "react-router-dom";
class Root extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    props.dva.model({
      namespace: props.name,
      state: {
        content: "app2 state"
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
    dva.router(() => <HashRouter basename="/app2">app2</HashRouter>);
    return dva.start()();
  }
}
export default Root;
