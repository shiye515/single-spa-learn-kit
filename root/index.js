// import React, { Component } from 'react';

import { registerApplication, start } from "single-spa";
import dva from "dva";

const app = dva();
app.model({
  namespace: "count",
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
registerApplication(
  "app1",
  () => System.import("app1"),
  () => true,
  { dva: app }
);
registerApplication(
  "app2",
  () => System.import("app2"),
  location => {
    return location.hash.indexOf("#/app2") === 0;
  },
  { dva: app }
);
registerApplication(
  "app3",
  () => System.import("app3"),
  location => {
    return location.hash.indexOf("#/app3") === 0;
  },
  { dva: app }
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
