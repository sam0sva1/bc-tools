import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../modules';
import './styles.css';


const Block = ({ height, id, timestamp, interlinks }) => {
    return (
        <Link to={`/block/${id}`} className="block">
            <div className="block__header">
                <span className="block__index"># { height + 1 }</span>
                <span className="block__date">{ formatDate(timestamp) }</span>
            </div>
            <div className="block__content">
                <span className="block__identifier">ID: {id}</span>
                <span className="block__interlinks">Interlinks: {interlinks.length}</span>
            </div>
        </Link>
    );
}

export default Block;
