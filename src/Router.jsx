import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'

export default function AppRouter() {
   
    return (
        <div className="h-full">
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
        </div>
    )
}