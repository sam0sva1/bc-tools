import React, { Component } from 'react';
import { Link } from 'react-dom';
import { withCommonContext } from '../context/Common';


class ListPage extends Component {
  render() {
    return (
      <section className="page list-page">
        <h2>You've chosen the wrong path, man!</h2>
        <span>Would you like to <Link to="/">return to the list?</Link></span>
      </section>
    );
  }
}

export default withCommonContext(ListPage);
