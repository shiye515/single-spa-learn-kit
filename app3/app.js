import React from 'react';
import { HashRouter, Link, Switch, Route } from 'react-router-dom';
function Root() {
  return (
    <HashRouter basename='/app3'>
      <div style={{ border: '1px solid red' }}>
        <div>app3</div>
        <div>
          <Link to='/inner1'>inner1 link</Link>
          <Link to='/inner2'>inner2 link</Link>
        </div>
        <Switch>
          <Route path='/inner1' render={() => <div>inner1</div>} />
          <Route path='/inner2' render={() => <div>inner2</div>} />
        </Switch>
      </div>
    </HashRouter>
  );
}
export default Root;
