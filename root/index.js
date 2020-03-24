// import React, { Component } from 'react';
// import Dom from 'react-dom';
// import bar from './bar';
// import { registerApplication, start } from 'single-spa';
// console.log(bar, Component, React);
// console.log(registerApplication, start);
// console.log(Dom);
// export default bar;

import { registerApplication, start } from 'single-spa';
// console.log(registerApplication);
// console.log(start);
registerApplication(
  'app1',
  () => System.import('app1'),
  () => true
);
registerApplication(
  'app2',
  () => System.import('app2'),
  location => {
    return location.hash.indexOf('#/app2') === 0;
  }
);
registerApplication(
  'app3',
  () => System.import('app3'),
  location => {
    return location.hash.indexOf('#/app3') === 0;
  }
);
// registerApplication(
//   '@react-mf/navbar',
//   () => System.import('@react-mf/navbar'),
//   isActive.navbar
// );

// registerApplication(
//   '@react-mf/people',
//   () => System.import('@react-mf/people'),
//   isActive.people
// );

// registerApplication(
//   '@react-mf/planets',
//   () => System.import('@react-mf/planets'),
//   isActive.planets
// );

start();
