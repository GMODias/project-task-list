// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const TaskCard = ({ cardData }) => {
  const { action, responsible, status, createdAt } = cardData;

  return (
    <div className="taskCard">
      <p>{action}</p>
      <p>{responsible}</p>
      <p>{status}</p>
      <p>{createdAt}</p>
    </div>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  cardData: PropTypes.shape({
    action: PropTypes.string.isRequired,
    responsible: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
