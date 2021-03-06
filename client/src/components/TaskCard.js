import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import http from '../services/api';
import '../styles/TaskCard.css';

const TaskCard = ({ cardData, update }) => {
  const { action, createdAt, id, responsible, status } = cardData;
  const [toggle, setToggle] = useState(true);
  const [cardAction, setCardAction] = useState(action);
  const [cardResponsible, setCardResponsible] = useState(responsible);
  const [cardStatus, setCardStatus] = useState(status);

  useEffect(() => {
    const updateData = () => {
      const { action: task, responsible: user, status: st } = cardData;
      setCardAction(task);
      setCardResponsible(user);
      setCardStatus(st);
    };

    updateData();
  }, [cardData]);

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

  // Renderização do botão de delete e a sua ação ao ser clicado
  const deleteClick = async ({ name }) => {
    console.log(name);
    await http.deleteTask(name);
    update(true);
  };

  const deleteTaskBtn = () => (
    <button
      className="deleteBtn"
      type="button"
      name={ id }
      onClick={ ({ target }) => deleteClick(target) }
    >
      X
    </button>
  );

  // Renderização dos textos de responsável e tarefa, e possibilita aleterar o conteúdo desses com 2 clickes, e sai com enter
  const handleInputChange = ({ value, name }) => {
    setFunctions[name](value);
  };

  const keyDownEvent = async (key) => {
    if (key === 'Enter' || key === 'Escape') {
      setToggle(true);
      await http.editTask({ id, action: cardAction, responsible: cardResponsible });
    }
  };

  const inputUpdate = (kind) => (
    <textarea
      className={ kind }
      type="text"
      name={ kind }
      value={ stateTranslator[kind] }
      onChange={ ({ target }) => handleInputChange(target) }
      onKeyDown={ ({ key }) => keyDownEvent(key) }
    />
  );

  const dataRender = (kind) => {
    if (toggle) {
      return (
        <p
          className={ kind }
          onDoubleClick={ () => setToggle(false) }
        >
          {stateTranslator[kind]}
        </p>);
    }
    return inputUpdate(kind);
  };

  // Botões de alteração de status e suas lógicas
  const handleStatusBtnClick = async ({ className, name }) => {
    if (className !== 'chosenStatus') {
      setCardStatus(name);
      await http.editTask({ id, status: name });
    }
  };

  const statusBtn = (text) => (
    <button
      className={ text === cardStatus ? 'chosenStatus' : 'regularStatus' }
      name={ text }
      onClick={ ({ target }) => handleStatusBtnClick(target) }
      type="button"
    >
      {text}
    </button>
  );

  return (
    <div className="taskCard">
      {dataRender('action')}
      {dataRender('responsible')}
      <div className="statusPlace">
        {statusBtn('PENDENTE')}
        {statusBtn('EM ANDAMENTO')}
        {statusBtn('CONCLUÍDO')}
      </div>
      <p className="createdAt">{createdAt}</p>
      {deleteTaskBtn()}
    </div>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  update: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    action: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    responsible: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
