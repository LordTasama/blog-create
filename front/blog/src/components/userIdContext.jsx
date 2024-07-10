// UserIdContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState({
    id: '',
    nombre: '',
    apellido: '',
    foto_perfil: '',
    correo: '',
    rol_id: '',
    cargados: false,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(
            'http://localhost:3000/usuarios/userId',
            {
              headers: {
                Authorization: token,
              },
            },
          );
          if (response.ok) {
            const data = await response.json();
            data.cargados = true;

            setUserId(data);
          }
        } catch (error) {
          console.error('Error al obtener el id del usuario', error);
        }
      }
    };

    fetchUserId();
  }, []);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
