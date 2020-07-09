import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import firebaseConf from "./Firebase/firebase";
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./store/reducers/rootReducer";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
// import firebaseConf from "./Firebase/firebase";
// import firebase from "firebase/app";

ReactDOM.render(
  <BrowserRouter>
    <FirebaseAppProvider firebaseConfig={firebaseConf} >
      <SuspenseWithPerf fallback={<p>loading app...</p>} traceId={'loading-app'}>
        <App />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </BrowserRouter>
  , document.getElementById('root')
);

/*const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, firebaseConf)
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: {...firebaseConf, ...rrfConfig},
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>, document.getElementById('root')
);*/