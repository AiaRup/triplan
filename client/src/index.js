import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Security } from '@okta/okta-react';

// import './index.css';
// import config from './app.config';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// function onAuthRequired({ history }) {
//   history.push('/login');
// }

// ReactDOM.render(
//   <Router>
//     <Security
//       issuer={config.issuer}
//       client_id={config.client_id}
//       redirect_uri={config.redirect_uri}
//       onAuthRequired={onAuthRequired}
//     >
//       <App />
//     </Security>
//   </Router>,
//   document.getElementById('root')
// );
// registerServiceWorker();
