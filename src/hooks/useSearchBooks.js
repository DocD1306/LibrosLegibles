import { useState, useMemo } from 'react';

const useSearchBooks = (books) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = useMemo(() => {
        return books.filter((book) =>
            book.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, books]);

    return {
        searchTerm,
        setSearchTerm,
        filteredBooks
    };
};

export default useSearchBooks;