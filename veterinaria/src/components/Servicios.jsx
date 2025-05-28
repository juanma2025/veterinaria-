import React, { useState } from 'react';
import DashboardCard from './DashboardCard';

const ServiciosCard = ({ servicios: initialServicios, loading }) => {
  const [servicios, setServicios] = useState(initialServicios || []);
  const [nuevoServicio, setNuevoServicio] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleAddServicio = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/servicios/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoServicio })
    });
    if (response.ok) {
      const servicioCreado = await response.json();
      setServicios([...servicios, servicioCreado]);
      setNuevoServicio('');
    }
  };

  const handleDeleteServicio = async (id) => {
    const response = await fetch(`${API_BASE_URL}/servicios/${id}/`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setServicios(servicios.filter(s => s.id !== id));
    }
  };

  const renderServicio = (servicio) => (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="font-medium text-gray-900">
        {servicio.servicio || servicio.nombre || servicio.tipo || 'Servicio'}
      </span>
      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
        {servicio.total || servicio.count || servicio.cantidad || 0} veces
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
            <div className="h-6 bg-gray-200 rounded w-52"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardCard
        title="Servicios Más Solicitados"
        icon="🏆"
        data={servicios}
        emptyMessage="No hay servicios registrados"
        renderItem={renderServicio}
      />
      <form onSubmit={handleAddServicio} className="mt-4">
        <input
          type="text"
          value={nuevoServicio}
          onChange={e => setNuevoServicio(e.target.value)}
          placeholder="Nombre del servicio"
          required
          className="border rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Agregar Servicio
        </button>
      </form>
      <ul className="mt-4">
        {servicios.map(servicio => (
          <li key={servicio.id} className="flex justify-between items-center p-2">
            {servicio.nombre}
            <button
              onClick={() => handleDeleteServicio(servicio.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiciosCard;