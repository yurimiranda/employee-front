import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    await axios.post('http://sua-api.com/items', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/list');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Nome" />
      <button type="submit">Criar</button>
    </form>
  );
}

export default Create;