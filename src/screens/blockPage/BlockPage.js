import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withCommonContext } from '../../context/Common';
import TopBar from '../../components/topBar/TopBar';
import PopUp from '../../components/popup/PopUp';
import Block from '../../components/block/Block';
import { formatDate } from '../../modules';


class BlockPage extends Component {
  state = {
    foundInterlinks: null,
  }

  getSelectedBlock = (id) => {
    return this.props.chain.find(block => block.id === id);
  }

  getSameLevelInterlinks = () => {

  }

  onBackButtonClickHandler = () => {
    this.props.history.push('/');
  }

  hidePopUp = () => {
    this.setState({ foundInterlinks: null });
  }

  render() {
    const { match: { params: { blockId } } } = this.props;
    const block = this.getSelectedBlock(blockId);

    if (!block) {
      return <Redirect to="not-found" />
    }

    const { height, id, timestamp, interlinks } = block;
    const { foundInterlinks } = this.state;

    return (
      <section className="page block-page">
        <TopBar>
          <TopBar.BackButton onClick={this.onBackButtonClickHandler}>To list</TopBar.BackButton>
        </TopBar>
        <div className="block__header">
        </div>
        <div className="block-page__content">
          <span className="block-page__index"># { height + 1 }</span>
          <span className="block-page__date">{ formatDate(timestamp) }</span>
          <span className="block-page__identifier">ID: {id}</span>
          <div className="block-page__interlinks">
            Interlinks:
            {
              interlinks.map((id, index) => (
                <div key={`${id}${index}`} className="block-page__interlink interlink">
                  <div className="interlink__level">Level {index + 1}</div>
                  <div className="interlink__idx">{ id }</div>
                </div>
              ))
            }
          </div>
        </div>

        {
          foundInterlinks &&
          <PopUp>
            {
              foundInterlinks.length > 0
                ? foundInterlinks.map(block => <Block key={block.id} {...block} />)
                : <h2>Loading...</h2>
            }
          </PopUp>
        }
      </section>
    );
  }
}

export default withCommonContext(BlockPage);
