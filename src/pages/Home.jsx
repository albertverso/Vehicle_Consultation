import { useState } from "react";
import { sendImage } from "../services/vehicleService";
import Modal from "../components/Modal";
import { RiLoopRightFill } from 'react-icons/ri';
import plate from '../assets/plate.png';
import { FaUserCircle, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(''); // Estado para a mensagem de resposta
  const [isImageSelected, setIsImageSelected] = useState(false); // Estado para controle de seleção de imagem
  const [vehicleData, setVehicleData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controle de loading
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(e.target.files[0]);
    setMessage(''); // Limpa mensagem ao selecionar um novo arquivo

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setIsImageSelected(true);
    } else {
      alert('Por favor, selecione um arquivo de imagem.');
      setIsImageSelected(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Nenhum arquivo de imagem foi selecionado.');
      return;
    }

    setLoading(true); // Ativa o loading

    try {
      const result = await sendImage(file);

      // Aqui verificamos se result é um objeto com um status
      if (result.status === 404) {
        setMessage(`${result.error}`);
        setVehicleData(null); // Limpa os dados do veículo se não encontrado
        setFile(null); // Limpa o estado do arquivo após sucesso
      } else if (result.status === 200) {
        setVehicleData(result); // Armazena os dados do veículo
        setMessage('');
        setIsModalOpen(true); // Abre o modal
        setFile(null); // Limpa o estado do arquivo após sucesso
      }
    } catch (error) {
      setMessage('Erro ao enviar a imagem.'); // Isso deve capturar outros erros, como problemas de rede
    } finally {
      setLoading(false); // Desativa o loading, independentemente do resultado
      setFile(null); // Limpa o arquivo
      setIsImageSelected(false); // Reseta o estado de seleção de imagem
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fecha o modal
    setFile(null); // Limpa o arquivo
    setIsImageSelected(false); // Reseta o estado de seleção de imagem
    setVehicleData(null); // Limpa os dados do veículo
  };


  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-white">
      <form onSubmit={handleSubmit} className="text-center flex flex-col items-center justify-center">
        <p className="text-2xl mb-10 font-bold">CONSULTAR PLACA VEICULAR</p>
        <label className="cursor-pointer flex flex-col items-center justify-center w-56">
          <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
          <img src={plate} alt="" className={`transform transition-transform duration-300 hover:scale-110 ${isImageSelected && 'scale-110'}`} />
        </label>
        <button
          type="submit"
          className="outline-none mt-10 w-[150px] font-semibold bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-900 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? <RiLoopRightFill className="animate-spin" size={24} /> : 'Buscar'}
        </button>
      </form>
      {message && (
        <p className="mt-8 text-red-500">{message}</p>
      )}

      <div onClick={() => navigate('/Login')} className="flex flex-col justify-center items-center hover:text-blue-600 cursor-pointer absolute bottom-4 md:bottom-4 md:right-4 lg:right-8 lg:bottom-8">
        <FaUserCircle size={30} />
        <p className="underline">Administrador</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        vehicleData={vehicleData}
      />
    </div>
  )
}