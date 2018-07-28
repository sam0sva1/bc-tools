import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withCommonContext } from '../../context/Common';
import TopBar from '../../components/topBar/TopBar';
import PopUp from '../../components/popup/PopUp';
import Block from '../../components/block/Block';
import { formatDate } from '../../modules';
import './styles.css';


class BlockPage extends Component {
  state = {
    block: null,
    foundInterlinks: null,
    selectedLevel: 0,
    isLoading: true,
  }

  componentDidMount = () => {
    const { match: { params: { blockId } } } = this.props;
    this.getBlock(blockId);
  }

  getBlock = (blockId) => {
    const block = this.getSelectedBlock(blockId);
    this.setState({
      block,
      isLoading: false,
      foundInterlinks: null,
    });
  }

  getSelectedBlock = (id) => {
    return this.props.chain.find(block => block.id === id);
  }

  onBackButtonClickHandler = () => {
    this.props.history.push('/');
  }

  hidePopUp = () => {
    this.setState({ foundInterlinks: null, selectedLevel: 0 });
  }

  onInterlinkClick = (id, level) => () => {
    this.setState(
      { foundInterlinks: [], selectedLevel: level },
      () => {
        const { block } = this.state;
        const links = [block];
        let linkedBlock = block;
        let notEnd = true;
        let link = null;

        do {
          link = linkedBlock.interlinks[level];

          if (link) {
            linkedBlock = this.getSelectedBlock(link);
            links.push(linkedBlock);
          } else {
            notEnd = false;
          }
        } while (notEnd);

        this.setState({ foundInterlinks: links });
      },
    );
  }

  render() {
    const { block, isLoading } = this.state;
    const { match: { params: { blockId } } } = this.props;

    const Wrapper = ({ children }) => (
      <section className="page block-page">
        <TopBar>
          <TopBar.BackButton onClick={this.onBackButtonClickHandler}>TO LIST</TopBar.BackButton>
        </TopBar>
        { children }
      </section>
    );

    if (isLoading && !block) {
      return (
        <Wrapper>
          <h2 className="loader">Loading...</h2>
        </Wrapper>
      );
    }

    if (!isLoading && !block) {
      return <Redirect from="/block/:blockId" to="/not-found" />
    }

    if (!isLoading && block.id !== blockId) {
      this.getBlock(blockId);
    }

    const { height, id, timestamp, interlinks } = block;
    const { foundInterlinks, selectedLevel } = this.state;

    return (
      <Wrapper>
        <div className="block-page__content">
          <div className="block-page__hat">
            <span className="block-page__index"># { height + 1 }</span>
            <span className="block-page__date">{ formatDate(timestamp) }</span>
          </div>
          <span className="block-page__identifier">ID: {id}</span>
          {
            interlinks.length > 0 &&
            <div className="block-page__interlinks interlinks">
              <div className="interlinks__label">Interlinks:</div>
              <div className="interlinks__list">
                {
                  interlinks.map((id, index) => (
                    <button
                      onClick={this.onInterlinkClick(id, index)}
                      key={`${id}${index}`}
                      className="interlinks__interlink interlink"
                    >
                      <div className="interlink__level">Level {index + 1}</div>
                      <div className="interlink__idx">{ id }</div>
                    </button>
                  ))
                }
              </div>
            </div>
          }
        </div>


        {
          foundInterlinks &&
          <PopUp hidePopUp={this.hidePopUp}>
            <div className="block-page-popup">
              <div className="block-page-popup__label">Level {selectedLevel + 1} linked:</div>
              <div className="block-page-popup__list">
                {
                  foundInterlinks.length > 0
                    ? foundInterlinks.map(block => <Block key={block.id} {...block} />)
                    : <h2 className="loader">Searching...</h2>
                }
              </div>
            </div>
          </PopUp>
        }
      </Wrapper>
    );
  }
}

export default withCommonContext(BlockPage);
