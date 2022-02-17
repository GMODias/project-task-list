import React from 'react';
import http from '../services/api';
// import '../styles/TaskCard.css';

const AddTaskBtn = () => {
  const addBtnClick = async () => {
    const newEmptyTask = {
      action: 'Descreva a Tarefa - 2 cliques para editar e Enter para concluir.',
      responsible: 'Nome do responsável',
      status: 'PENDENTE',
      createdAt: (new Date()).toLocaleString('pt-br'),
    };
    await http.createTask(newEmptyTask);
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
