import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import AddTaskBtn from './AddTaskBtn';

const CardList = ({ listData, update }) => {
  console.log('cardlist', listData, update);
  return (
    <div className="cardsContainer">
      {listData
        .map((data, index) => (<TaskCard
          key={ index }
          cardData={ data }
          update={ update }
        />))}
      <AddTaskBtn update={ update } />
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
};
