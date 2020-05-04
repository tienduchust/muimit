/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reducer from './reducer';
import saga from './saga';
import AppRouter from "../AppRouter";

export default function App() {
  useInjectReducer({key: 'App', reducer});
  useInjectSaga({key: 'App', saga});
  return (
    <React.Fragment>
      <AppRouter/>
      <ToastContainer />
      <GlobalStyle/>
    </React.Fragment>
  );
}
