import useGetAllBooks from "../hooks/useBooks";
import useSearchBooks from "../hooks/useSearchBooks";
import Book from "../components/Book.jsx";
import { Link } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import SearchBar from "../components/SearchBar.jsx";

// Imports para microfono

import useVoiceRecognition from "../hooks/useVoiceRecognition";
import { Mic } from "lucide-react"; // npm install lucide-react

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

    const voice = useVoiceRecognition((text) => setSearchTerm(text));

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const touchStartX = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    }

    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX.current;

        if (diff > 70 && voice.isSupported) {
            voice.startListening();
        }
        
        touchStartX.current = null;
    };

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
            
            <div 
                className="relative w-full max-w-lg mx-auto mb-6 z-10"
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
            >
                {isMobile && voice.isSupported && (
                    <p className={`text-xs text-center transition-opacity my-5 ${voice.isListening ? "text-red-500 font-bold animate-pulse" : "text-gray-500"}`}>
                        {voice.isListening 
                            ? "Escuchando..." 
                            : "Desliza → para buscar por voz"}
                    </p>
                )}
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar libros por nombre..."
                />
                {/* Botón de voz solo si es desktop y soporta reconocimiento */}
                {!isMobile && voice.isSupported && (
                <button
                    onClick={voice.startListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition
                    ${voice.isListening
                        ? "text-red-500 animate-pulse"
                        : "text-gray-400 hover:text-blue-600"
                    }`}
                    title="Buscar por voz"
                >
                    <Mic size={20} />
                </button>
                )}
            </div>
            

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