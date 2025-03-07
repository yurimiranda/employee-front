import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://sua-api.com/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setValue('name', response.data.name);
    };
    fetchItem();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://sua-api.com/items/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/list');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Nome" />
      <button type="submit">Atualizar</button>
    </form>
  );
}

export default Edit;