import React from 'react';
import './styles.css';


const PopUp = ({ hidePopUp, children }) => {
    return (
        <div className="popup">
            <div onClick={hidePopUp} className="popup__veil" />
            <section className="popup__body">
                { children }
            </section>
        </div>
    );
};

export default PopUp;
