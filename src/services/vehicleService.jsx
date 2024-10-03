import apiUrl from "./apiService";


export const sendImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
   
    const response = await fetch(`${apiUrl}/buscar_veiculo`, {
    method: 'POST',
    body: formData,
    });

    const responseData = await response.json(); // Captura a resposta JSON

    // Não precisa verificar se a resposta não é ok
    // Você pode simplesmente retornar os dados ou a mensagem de erro
    return {
        status: response.status,
        ...responseData,
    };
  };

export const addedVehicle = async (licensePlate, model, color, year, owner, token) => {

    const response = await fetch(`${apiUrl}/adicionar_veiculo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({license_plate:licensePlate, model, color, year, owner}),
    });
  
    const responseData = await response.json(); // Captura a resposta JSON
  
    // Não precisa verificar se a resposta não é ok
    // Você pode simplesmente retornar os dados ou a mensagem de erro
    return {
      status: response.status,
      ...responseData,
    };
  };
  