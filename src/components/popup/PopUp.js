import React, { Component } from 'react';
import './styles.css';


const PopUp = ({ hidePopUp, children }) => {
    return (
        <div onClick={hidePopUp} className="popup">
            <section className="popup__body">
                { children }
            </section>
        </div>
    );
};

export default PopUp;
