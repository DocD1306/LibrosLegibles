import { UserContext } from "../context/UserContext";
import { useContext } from "react";

/**
 * Individual card component representing a book.
 * * This component displays the book's cover image, title, and synopsis 
 * within an accessible article structure.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title of the book.
 * @param {string} props.image - The URL path for the book's cover image.
 * @param {string} props.synopsis - A brief summary or description of the book.
 * @returns {JSX.Element} A card-style article containing book details.
 */
function Book(props) {

    /* Desestructuración de las props */
    const {title, image, synopsis, onDelete} = props;

    const { userLogged } = useContext(UserContext);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete();
    };

    /*
    Este componente representa una tarjeta individual de un libro, contiene la imagen, el título y la sinopsis del libro.

    Elementos de accesibilidad incluidos:
    aria-label es sirve para la accesibilidad por audio

    figure sirve para agrupar contenido multimedia junto con su descripción
    sr-only le dice a Tailwind que oculte el texto visualmente pero que siga siendo accesible para lectores de pantalla
    
    No se ha añadido tabIndex porque los Link por defecto son focuseables mediante tabulación
    */
    return(
        <article aria-label={title} className="background_color_white book_card">

            <figure className="book_card_image_containter">
                <img src={image} alt={title} className="book_image"/>
                <figcaption className="sr-only">{title}</figcaption>
            </figure>

            <p className="text_normal_bold pt-3 color_primary">{title}</p>
            <p className="text_small color_grey_2 pt-2">{synopsis}</p>

            { userLogged &&
                <button 
                    onClick={handleDeleteClick}
                    className="w-full mt-4 py-2 bg-red-600 rounded-lg text-white text_normal_bold cursor-pointer"
                >
                    Eliminar
                </button>
            }
        
        </article>
    )


}

export default Book