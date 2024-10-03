import React from 'react';

const Modal = ({ isOpen, onClose, vehicleData, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 flex flex-col items-center  justify-center rounded shadow-lg">

        {vehicleData && <h2 className="text-xl font-semibold mb-4">Informações do Veículo</h2>}

        {vehicleData && (
          <div>
            <p><strong>Modelo:</strong> {vehicleData.model}</p>
            <p><strong>Ano:</strong> {vehicleData.year}</p>
            <p><strong>Cor:</strong> {vehicleData.color}</p>
            <p><strong>Proprietário:</strong> {vehicleData.owner}</p>
            <p><strong>Placa:</strong> {vehicleData.license_plate}</p>
          </div>
        )}
        {
          message && (
            <p className="text-green-500">{message}</p>
          )
        }

        <button 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-900 transition-colors duration-300" 
          onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;

