import React, { useState } from 'react';

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [nuevoPropietario, setNuevoPropietario] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleAddPropietario = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/propietarios/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoPropietario })
    });
    if (response.ok) {
      const propietarioCreado = await response.json();
      setPropietarios([...propietarios, propietarioCreado]);
      setNuevoPropietario('');
    }
  };

  const handleDeletePropietario = async (id) => {
    const response = await fetch(`${API_BASE_URL}/propietarios/${id}/`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setPropietarios(propietarios.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Propietarios</h2>
      <form onSubmit={handleAddPropietario}>
        <input
          type="text"
          value={nuevoPropietario}
          onChange={e => setNuevoPropietario(e.target.value)}
          placeholder="Nombre del propietario"
          required
        />
        <button type="submit">Agregar Propietario</button>
      </form>
      <ul>
        {propietarios.map(propietario => (
          <li key={propietario.id}>
            {propietario.nombre}
            <button onClick={() => handleDeletePropietario(propietario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Propietarios;