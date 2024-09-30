const apiUrl = import.meta.env.VITE_API || 'http://127.0.0.1:5000';

export default apiUrl;

export const loadingApi = async () => {
    const response = await fetch(`${apiUrl}/loadingAPI`);
    return response;
}