import { useNavigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired, logout } from "../services/authService";
import { addedVehicle } from "../services/vehicleService";
import { useEffect, useState } from "react";
import { RiLoopRightFill } from "react-icons/ri";
import Modal from "../components/Modal";
import { BiArrowBack, BiLogOut } from "react-icons/bi";

export default function Vehicle() {
    const [licencePlate, setLicensePlate] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [owner, setOwner] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || isTokenExpired()) {
            logout();
            navigate('/Home');
        } 
    }, []);

    const handleaddedVehicle = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await addedVehicle(licencePlate, model, color, year, owner, token);
            if (response.status === 409) {
                setErrorMessage("Placa ja existente!");
            }
            else if (response.status === 201 && isAuthenticated) {
                resetInputs()
                setIsOpen(true);
                navigate('/Vehicle');
            } 
            else {
                setErrorMessage("Erro ao enviar dados!");
            }
        } catch (error) {
            setErrorMessage("Erro!");
        } finally {
            setLoading(false);
        }
    };

    const handleUppercase = (event) => {
        setLicensePlate(event.target.value.toUpperCase());
    };

    const resetInputs = () => {
        setLicensePlate('');
        setModel('');
        setColor('');
        setYear('');
        setOwner('');
    };

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-white">
            <header className="w-full flex items-center justify-start">
                <BiArrowBack className=" hover:text-blue-600 absolute cursor-pointer hover:scale-110 duration-300 transition-transform top-4 left-4 md:top-6 md:left-6 lg:left-8 lg:top-8" size={30} onClick={() => navigate('/Home')} />
                <BiLogOut className=" hover:text-red-600 absolute cursor-pointer hover:scale-110 duration-300 transition-transform top-4 right-4 md:top-6 md:right-6 lg:right-8 lg:top-8 rotate-180" size={30} onClick={() => {logout(); navigate('/Login')}} />
            </header>
            <form onSubmit={handleaddedVehicle} className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold ">Cadastrar Veiculo</p>
                <div className="flex flex-col mt-5 font-semibold">
                    <label>Placa</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    required
                    type="text" 
                    name="licencePlate" 
                    id="licencePlate" 
                    value={licencePlate}
                    onChange={handleUppercase
                    }
                    maxLength={7}
                    />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label>Modelo</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    required
                    type="text" 
                    name="model" 
                    id="model" 
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label>Cor</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    required
                    type="text" 
                    name="color" 
                    id="color" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label>Ano</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    required
                    type="number" 
                    name="year" 
                    id="year" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-5 font-semibold">
                    <label>Dono</label>
                    <input className="outline-none border-2 focus:border-blue-600 border-gray-300 rounded p-2" 
                    required
                    type="text" 
                    name="owener" 
                    id="owner" 
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    />
                </div>
                <button className="bg-blue-600 mt-5 w-[150px] flex hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded items-center justify-center" type="submit">
                {loading ? <RiLoopRightFill className="animate-spin" size={24} /> : "Cadastrar"}</button>
            </form>
            {errorMessage && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
            )}

            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} vehicleData={null} message="Veiculo Cadastrado com Sucesso!" />
            )}
        </div>
    );
}