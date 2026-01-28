import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/booksService';

const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const updatedBooks = await deleteBook(id);
            setBooks(updatedBooks);
        } catch (err) {
            setError("No se pudo eliminar el producto");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return { 
        books, 
        loading, 
        error, 
        handleDelete, 
        refresh: fetchBooks 
    };
};

export default useBooks;