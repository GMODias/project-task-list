import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const CardList = ({ listData }) => {
  console.log('cardlist', listData);
  return (
    <div className="cardsContainer">
      {listData.map((data, index) => (<TaskCard key={ index } cardData={ data } />))}
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
