import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
function Root() {
  return <HashRouter basename='/app2'>app2</HashRouter>;
}
export default Root;
