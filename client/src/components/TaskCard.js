import React, { useState } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import http from '../services/api';
import '../styles/TaskCard.css';

const TaskCard = ({ cardData }) => {
  const { action, createdAt, id, responsible, status } = cardData;
  const [toggle, setToggle] = useState(true);
  const [cardAction, setCardAction] = useState(action);
  const [cardResponsible, setCardResponsible] = useState(responsible);
  const [cardStatus, setCardStatus] = useState(status);

  const setFunctions = {
    action: (info) => setCardAction(info),
    responsible: (info) => setCardResponsible(info),
    status: (info) => setCardStatus(info),
  };

  const stateTranslator = {
    action: cardAction,
    responsible: cardResponsible,
    status: cardStatus,
  };

  const deleteClick = async ({ name }) => {
    console.log(name);
    await http.deleteTask(name);
    window.location.reload(false);
  };

  const handleInputChange = ({ value, name }) => {
    setFunctions[name](value);
  };

  const keyDownEvent = (key) => {
    if (key === 'Enter' || key === 'Escape') {
      setToggle(true);
    }
  };

  const inputUpdate = (kind) => (
    <input
      type="text"
      name={ kind }
      value={ stateTranslator[kind] }
      onChange={ ({ target }) => handleInputChange(target) }
      onKeyDown={ ({ key }) => keyDownEvent(key) }
    />
  );

  const dataRender = (kind) => (
    toggle
      ? <p onDoubleClick={ () => setToggle(false) }>{stateTranslator[kind]}</p>
      : inputUpdate(kind)
  );

  return (
    <div className="taskCard">
      {dataRender('action')}
      {dataRender('responsible')}
      <p>{status}</p>
      <p>{createdAt}</p>
      <button
        type="button"
        name={ id }
        onClick={ ({ target }) => deleteClick(target) }
      >
        X
      </button>
    </div>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  cardData: PropTypes.shape({
    action: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    responsible: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
