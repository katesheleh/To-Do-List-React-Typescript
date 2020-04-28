import React from 'react';
import Header from './Header';
import List from './List';
import Footer from './Footer';

function Todolist() {
  return (
    <div className="todoList">
      <Header />
      <List />
      <Footer />
    </div>
  )
}

export default Todolist;