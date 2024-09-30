import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import { useEffect, useState } from 'react';
import { loadingApi } from './services/apiService';
import Animation from './assets/animation.webm';

export default function AppRouter() {
    const [loading, setLoading] = useState(true); // Estado de loading
    const animation = new URL('./assets/animation.webm', import.meta.url).href;


    useEffect(() => {
      const wakeUpApi = async () => {
          const response = await loadingApi();
          if (response.status === 200) {
            setLoading(false); // Quando a API responder, o loading é desativado
          }
      };
  
      wakeUpApi(); // Chama a função que acorda a API
    }, []);
   
    return (
        <div className="h-full">
            {loading ? 
            <div className="flex flex-col items-center justify-center h-screen">
                <video autoPlay loop muted className="w-64 h-64">
                    <source src={animation} type="video/webm" />
                    Seu navegador não suporta o vídeo.
                </video>    
                <div className="flex flex-col items-center justify-center font-semibold text-red-600">
                    <p>Carregando</p>
                    <p>Por favor, aguarde...</p>
                </div>
           </div>
            : 
            <Routes>
                <Route path="/consultar-veiculos/" element={<Navigate to="/Home" />} />
                <Route path="/" element={<Navigate to="/Home" />}></Route>
                <Route
                    path="/Home"
                    element={
                            <Home/>
                    }
                />
            </Routes>
            }
        </div>
    )
}