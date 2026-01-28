import { addBook } from '../services/booksService';
import { useNavigate } from 'react-router-dom';

const useAddBook = () => {
    const navigate = useNavigate();

    const addNewBook = async (formData) => {
        try {
            // Mapeo de los campos del formulario a la estructura requerida por la API de MongoDB 
            const apiData = {
                name: formData.title,
                description: formData.synopsis,
                price: Number(formData.price),
                category: formData.genre,
                photo: formData.image
            };

            await addBook(apiData);
            
            // Redirección automática al catálogo tras éxito, según el requisito del PDF [cite: 161]
            navigate("/catalogue"); 
        } catch (err) {
            console.error("Error al procesar el alta:", err);
        }
    };

    return { addNewBook };
};

export default useAddBook;