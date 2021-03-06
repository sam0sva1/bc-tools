import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import { Provider as CommonContextProvider } from './context/Common';
import ListPage from './screens/listPage/ListPage';
import BlockPage from './screens/blockPage/BlockPage';
import NotFound from './screens/notFound/NotFound';
import './App.css';
import chain from './chain.json';


class App extends Component {
  render() {
    console.log('NotFound', NotFound);

    return (
      <CommonContextProvider value={chain}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exect path="/block/:blockId" component={BlockPage} />
            <Route exect path="/oops" component={NotFound} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </CommonContextProvider>
    );
  }
}

export default App;
