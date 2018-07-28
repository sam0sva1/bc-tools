import React from 'react';
import { Link } from 'react-dom';


const NotFound = () => (
    <section className="page list-page">
        <h2>You've chosen the wrong path, man!</h2>
        <span>Would you like to <Link to="/">return to the list?</Link></span>
    </section>
);

export default NotFound;
