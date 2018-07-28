import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import { Provider as CommonContextProvider } from './context/Common';
import ListPage from './screens/listPage/ListPage';
import BlockPage from './screens/blockPage/BlockPage';
import NotFound from './screens/NotFound';
import './App.css';
import chain from './chain.json';


class Foo {
  static Bar = () => {
   console.log(this);
  }
}


class App extends Component {
  render() {
    const bar = new Foo();
    console.log('bar', bar);

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
