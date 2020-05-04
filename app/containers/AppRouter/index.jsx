import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import {compose} from 'recompose';
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import React, {memo} from 'react';
import {Switch} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import GuestLayout from 'components/Layout';
import {Helmet} from 'react-helmet';

const routes = [
  {
    path: '/',
    exact: true,
    layout: GuestLayout,
    component: HomePage,
  },
  {
    path: '*',
    layout: GuestLayout,
    component: NotFoundPage,
  },
];
const AppRoute = ({
                    component: Component,
                    layout: Layout,
                    path: Path,
                    ...rest
                  }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Layout {...props}>
          <Helmet titleTemplate="%s - Gia đình của Beer" defaultTitle="Gia đình của Beer">
            <meta name="description" content="Gia đình của Beer"/>
          </Helmet>
          <Component/>
        </Layout>
      );
    }}
  />
);
AppRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.any.isRequired,
};

const AppRouter = () => (
  <Switch>
    {_.map(routes, (route, routeId) => (
      <AppRoute
        {...route}
        key={routeId}
      />
    ))}
  </Switch>
);
AppRouter.propTypes = {};
const mapStateToProps = createStructuredSelector({});
const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(
  withConnect,
  memo,
)(AppRouter);
