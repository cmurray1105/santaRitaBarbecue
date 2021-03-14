const Home = require('../client/src/components/Home.jsx');
const Admin = require('../client/src/components/Admin');
// const NotFound = require('./components/notFound');

const routesConfig = [
  {path: '/', component: Home},
  {path: '/Admin', component: Admin},
  // {path: '*', component: NotFound}
];

module.exports = routesConfig;