import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
function Root() {
  return (
    <HashRouter>
      123
      <Link to='/app2'>app2 link</Link>
      <Link to='/app3'>app3 link</Link>
    </HashRouter>
  );
}
export default Root;
