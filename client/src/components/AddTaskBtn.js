import React from 'react';
import PropTypes from 'prop-types';
import http from '../services/api';
// import '../styles/TaskCard.css';

const AddTaskBtn = ({ update }) => {
  const addBtnClick = async () => {
    const newEmptyTask = {
      action: 'Descreva a Tarefa - 2 cliques para editar e Enter para concluir.',
      responsible: 'Nome do responsável',
      status: 'PENDENTE',
      createdAt: (new Date()).toLocaleString('pt-br'),
    };
    await http.createTask(newEmptyTask);
    update(true);
  };

  const addTaskBtn = () => (
    <button
      type="button"
      onClick={ () => addBtnClick() }
    >
      +
    </button>
  );

  return (
    <>
      {addTaskBtn()}
    </>
  );
};

export default AddTaskBtn;

AddTaskBtn.propTypes = {
  update: PropTypes.func.isRequired,
};
