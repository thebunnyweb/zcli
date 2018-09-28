import React from 'react';
import { IndexRoute, Route } from 'react-router-dom';
import { App } from './containers';

import {
    /* Component Imports */
        
        StateFullComponent,
        
} from './pages';

import routeconfig from './config/routeconfig';

export default store => (
  <div>
    <Switch>
      <Route path={routeconfig.statefullcomponent} component={StateFullComponent} />
        {/* Routes */}
        
        
    </Switch>
  </div>
);
