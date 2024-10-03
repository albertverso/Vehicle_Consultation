import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import { useEffect, useState } from 'react';
import { loadingApi } from './services/apiService';
import animation from '/animation.gif';
import { RiLoopRightFill } from "react-icons/ri";
import Login from "./pages/Login";

export default function AppRouter() {
    const [loading, setLoading] = useState(true); // Estado de loading
    // const animation = new URL('./assets/animation.webm', import.meta.url).href;

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
        <div className="h-full bg-white">
            {loading ? 
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={animation} alt="" width={500} />    
                <div className="flex flex-col items-center justify-center font-semibold text-2xl gap-2">
                    <p>Carregando</p>
                    <RiLoopRightFill className="animate-spin" size={24} />
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
                <Route path="Login" element={<Login />}>
                    
                </Route>
            </Routes>
            }
        </div>
    )
}