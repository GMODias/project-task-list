import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SortBtns.css';

const DESC = -1;
const ASC = 1;

const SortBtns = ({ sort, setSort }) => {
  const [orderingKey, setOrderingKey] = useState(Object.entries(sort)[0][0]);
  const [orderingDirection, setOrderingDirection] = useState(Object.entries(sort)[0][1]);

  const handleSortClick = ({ name }) => {
    if (name.length <= 2) {
      if (orderingDirection !== Number(name)) {
        setOrderingDirection(Number(name));
        setSort({ [orderingKey]: (Number(name)) });
      }
    } else if (orderingKey !== name) {
      setOrderingKey(name);
      setSort({ [name]: orderingDirection });
    }
  };

  const sortButton = (text, key) => (
    <button
      className={ key === orderingKey || key === orderingDirection ? 'sorted' : 'noSort' }
      name={ key }
      onClick={ ({ target }) => handleSortClick(target) }
      type="button"
    >
      {text}
    </button>
  );

  return (
    <div className="sortBtnsContainer">
      <div className="sortBtns">
        {sortButton('Ordem Alfabética', 'action')}
        {sortButton('Data de criação', 'createdAt')}
        {sortButton('Status', 'status')}
      </div>
      <div className="orderBtns">
        {sortButton('ASC', ASC)}
        {sortButton('DESC', DESC)}
      </div>
    </div>
  );
};

export default SortBtns;

SortBtns.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.shape().isRequired,
};
