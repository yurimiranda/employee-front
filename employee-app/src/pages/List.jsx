import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://sua-api.com/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://sua-api.com/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Lista de Itens</h1>
      <Link to="/create">Criar Novo Item</Link>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <Link to={`/edit/${item.id}`}>Editar</Link>
            <button onClick={() => handleDelete(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;