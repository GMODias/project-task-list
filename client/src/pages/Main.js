import React, { useEffect, useState } from 'react';
import http from '../services/api';
import CardList from '../components/CardList';
import SortBtns from '../components/SortBtns';
import '../styles/Main.css';

const Main = () => {
  const [tasks, setTasks] = useState(null);
  const [sort, setSort] = useState({ createdAt: -1 });
  const [qttUpdate, setQttUpdate] = useState(true);

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getTasks(sort);
      setTasks(result);
    };

    if (qttUpdate) {
      getAllTasks();
      setQttUpdate(false);
    }
  }, [sort, qttUpdate]);

  console.log(sort);

  if (tasks === null) return <h1>Carregando</h1>;
  return (
    <main>
      <SortBtns sort={ sort } setSort={ setSort } update={ setQttUpdate } />
      <CardList update={ setQttUpdate } listData={ tasks } />
    </main>
  );
};

export default Main;
