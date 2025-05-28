import React, { useState } from 'react';

const MascotasVisitas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nuevaMascota, setNuevaMascota] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleAddMascota = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/mascotas/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevaMascota })
    });
    if (response.ok) {
      const mascotaCreada = await response.json();
      setMascotas([...mascotas, mascotaCreada]);
      setNuevaMascota('');
    }
  };

  const handleDeleteMascota = async (id) => {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}/`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setMascotas(mascotas.filter(m => m.id !== id));
    }
  };

  return (
    <div>
      <h2>Mascotas</h2>
      <form onSubmit={handleAddMascota}>
        <input
          type="text"
          value={nuevaMascota}
          onChange={e => setNuevaMascota(e.target.value)}
          placeholder="Nombre de la mascota"
          required
        />
        <button type="submit">Agregar Mascota</button>
      </form>
      <ul>
        {mascotas.map(mascota => (
          <li key={mascota.id}>
            {mascota.nombre}
            <button onClick={() => handleDeleteMascota(mascota.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MascotasVisitas;