import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
console.log(Link);
function Root() {
  return <HashRouter basename='/app3'>app3</HashRouter>;
}
export default Root;
