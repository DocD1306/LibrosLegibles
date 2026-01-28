import useGetAllBooks from "../hooks/useBooks";
import useSearchBooks from "../hooks/useSearchBooks";
import Book from "../components/Book.jsx";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar.jsx";

/**
 * Catalogue component that displays a searchable list of books.
 * * It handles the logic for filtering books based on a search term using 
 * memoization for performance and renders a grid of accessible book links.
 *
 * @component
 * @returns {JSX.Element} The book catalogue view with search functionality.
 */
function Catalogue(){
/**
     * Consumo de la API Express mediante el hook personalizado.
     * Gestiona estados de carga, error y la función de eliminar[cite: 126, 176].
     */
    const { books, loading, error, handleDelete } = useGetAllBooks();

    /**
     * Gestión del filtrado dinámico mediante el hook de búsqueda[cite: 125].
     * Se le pasa la lista de libros obtenida de la API.
     */
    const { searchTerm, setSearchTerm, filteredBooks } = useSearchBooks(books);

    /**
     * Renderizado condicional para estados de carga y error exigidos por la actividad.
     */
    if (loading) return <p className="text_normal color_grey_2 pt-2 pl-1">Cargando catálogo de productos...</p>;
    if (error) return <p className="text_normal pt-2 pl-1" style={{color: 'red'}}>Error: {error}</p>;

    /*
        Este componente representa el catálogo de libros.
        Aquí se importa el array de libros desde data/books.js y se mapea para renderizar un componente Book por cada libro en el array.
    */
    return (
        <> 
            <h1 className="heading_h1 color_primary">Catálogo de libros</h1>
            <p className="text_normal color_grey_2 pt-2 pl-1">Disfruta de una infinidad de historias</p>
            
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar libros por nombre..."
            />

            <section className="catalogue w-full">
                {
                    filteredBooks.map( book =>
                        <Link 
                            key={book.id}
                            to={`/detail/${book.id}`} 
                            aria-label={`Ver detalles del libro ${book.nombre}`}
                        >
                            <Book 
                                title={book.nombre} 
                                image={book.imagen} 
                                synopsis={book.descripcion}
                                onDelete={() => handleDelete(book.id)}
                            />
                        </Link>
                    )
                }
            </section>
        </>
    )

}

export default Catalogue