import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const NotFound = () => (
    <section className="page not-found-page">
        <h2 className="not-found-page__title">You've chosen the wrong path, man!</h2>
        <span className="not-found-page__message">Would you like to <Link to="/">return to the list?</Link></span>
    </section>
);

export default NotFound;
