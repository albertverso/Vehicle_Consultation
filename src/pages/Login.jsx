import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin, isAuthenticated, isTokenExpired } from "../services/authService";
import { RiLoopRightFill } from "react-icons/ri";
import { BiArrowBack, BiLogIn } from "react-icons/bi";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated && !isTokenExpired()) {
            navigate('/Vehicle');
        }    
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            await authLogin(email, password);
            if (isAuthenticated) {
                navigate('/Vehicle');
            } else {
                setErrorMessage("Usuário ou senha incorretos!");
            }
        } catch (error) {
            setErrorMessage("Erro!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-white">
            <header className="w-full flex items-center justify-start">
                <BiArrowBack className=" hover:text-blue-600 absolute cursor-pointer hover:scale-110 duration-300 transition-transform top-4 left-4 md:top-6 md:left-6 lg:left-8 lg:top-8" size={30} onClick={() => navigate('/Home')} />
            </header>
            <form onSubmit={handleLogin} className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center mb-10 text-center gap-3">
                    <p className="text-3xl font-bold">
                        Login
                    </p>
                    <BiLogIn size={35} />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label htmlFor="email">Email</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label htmlFor="password">Senha</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-600 mt-10 w-[150px] flex hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded items-center justify-center" type="submit">
                {loading ? <RiLoopRightFill className="animate-spin" size={24} /> : "Entrar"}</button>
            </form>
            {errorMessage && (
                <p className="mt-8 text-red-500">{errorMessage}</p>
            )}
        </div>
    );
}