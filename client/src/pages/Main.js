import React, { useEffect, useState } from 'react';
import http from '../services/api';
import CardList from '../components/CardList';
import SortBtns from '../components/SortBtns';

const Main = () => {
  const [tasks, setTasks] = useState(null);
  const [sort, setSort] = useState({ createdAt: -1 });
  console.log('------->', sort);

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getTasks(sort);
      setTasks(result);
    };

    getAllTasks();
  }, [sort]);

  console.log(tasks);

  if (tasks === null) return <h1>Carregando</h1>;
  return (
    <>
      <div>
        <p>Boa Tarde</p>
      </div>
      <SortBtns sort={ sort } setSort={ setSort } />
      <CardList kind={ sort } listData={ tasks } />
    </>
  );
};

export default Main;
