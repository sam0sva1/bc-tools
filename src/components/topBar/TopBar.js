import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


const fakeFunc = name => () => { throw new Error(`You forgot to write a realization for the ${name}!`); };

const BackButton = ({ children, onClick }) => {
    return (
      <button
        className="top-bar__controll top-bar__back-button"
        onClick={onClick}
      >
        { children }
      </button>
    );
  };
  BackButton.defaultProps = {
    onClick: fakeFunc('BackButton'),
  };

class Header extends Component {
    static BackButton = BackButton
    render() {
        const { children } = this.props;

        return (
            <section className="top-bar">
              <div className="top-bar__content">
                <Link to="/">
                  <img className="top-bar__logo" src="http://emojipop.net/data/images/emoji_set_820.png" alt="little logo" />
                </Link>
                  { children }
              </div>
            </section>
        );
    }
};

export default Header;
