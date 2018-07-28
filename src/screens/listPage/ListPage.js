import React, { Component } from 'react';

import Block from '../../components/block/Block';
import TopBar from '../../components/topBar/TopBar';
import { withCommonContext } from '../../context/Common';


class ListPage extends Component {
  render() {
    const { chain } = this.props;

    return (
      <div className="page list-page">
        <TopBar />
        {
          chain.map((block) => <Block key={block.id} {...block} />)
        }
      </div>
    );
  }
}

export default withCommonContext(ListPage);
