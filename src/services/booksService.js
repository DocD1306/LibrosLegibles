import axios from 'axios';

const API_URL = "http://localhost:3000/productos";
// const API_URL = import.meta.env.VITE_API_URL + "/productos";

const mapProductoFromAPI = (producto) => ({
    id: producto._id,
    nombre: producto.name,
    descripcion: producto.description,
    precio: producto.price,
    categoria: producto.category,
    imagen: producto.photo,
});

export const getBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data.map(mapProductoFromAPI);
    } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Could not fetch books");
    }
}

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return mapProductoFromAPI(response.data);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        throw new Error("Could not fetch book");
    }
}

export const addBook = async (bookData) => {
    try {
        const response = await axios.post(API_URL, bookData);
        return mapProductoFromAPI(response.data.savedProducto);
    } catch (error) {
        console.error("Error adding book:", error);
        throw new Error("Could not add book");
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data.data.map(mapProductoFromAPI);
    } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Could not delete book");
    }
};