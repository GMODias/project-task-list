import React, { useEffect, useState } from 'react';
import http from '../services/api';
import CardList from '../components/CardList';

const Main = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getTasks();
      setTasks(result);
    };

    getAllTasks();
  }, []);

  console.log(tasks);

  if (tasks === null) return <h1>Carregando</h1>;
  return (
    <>
      <div>
        <p>Boa Tarde</p>
      </div>
      <CardList listData={ tasks } />
    </>
  );
};

export default Main;
