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

  getSameLevelInterlinks = () => {

  }

  onBackButtonClickHandler = () => {
    this.props.history.push('/');
  }

  hidePopUp = () => {
    this.setState({ foundInterlinks: null });
  }

  onInterlinkClick = (id, level) => () => {
    this.setState(
      { foundInterlinks: [] },
      () => {
        const { block } = this.state;
        const links = [block];
        let linkedBlock = block;
        let end = false;
        let link = null;

        do {
          link = linkedBlock.interlinks[level];

          if (link) {
            linkedBlock = this.props.chain.find(block => block.id === link);
            links.push(linkedBlock);
          } else {
            end = true;
          }
        } while (end);

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
          <TopBar.BackButton onClick={this.onBackButtonClickHandler}>To list</TopBar.BackButton>
        </TopBar>
        { children }
      </section>
    );

    if (isLoading && !block) {
      return (
        <Wrapper>
          <h2 class="loader">Loading...</h2>
        </Wrapper>
      );
    }

    if (!isLoading && !block) {
      return <Redirect to="not-found" />
    }

    if (!isLoading && block.id !== blockId) {
      this.getBlock(blockId);
    }

    const { height, id, timestamp, interlinks } = block;
    const { foundInterlinks } = this.state;

    return (
      <Wrapper>
        <div className="block-page__content">
          <span className="block-page__index"># { height + 1 }</span>
          <span className="block-page__date">{ formatDate(timestamp) }</span>
          <span className="block-page__identifier">ID: {id}</span>
          <div className="block-page__interlinks">
            Interlinks:
            {
              interlinks.map((id, index) => (
                <button
                  onClick={this.onInterlinkClick(id, index)}
                  key={`${id}${index}`}
                  className="block-page__interlink interlink"
                >
                  <div className="interlink__level">Level {index + 1}</div>
                  <div className="interlink__idx">{ id }</div>
                </button>
              ))
            }
          </div>
        </div>


        {
          foundInterlinks &&
          <PopUp hidePopUp={this.hidePopUp}>
            Linked:
            {
              foundInterlinks.length > 0
                ? foundInterlinks.map(block => <Block key={block.id} {...block} />)
                : <h2 class="loader">Searching...</h2>
            }
          </PopUp>
        }
      </Wrapper>
    );
  }
}

export default withCommonContext(BlockPage);
