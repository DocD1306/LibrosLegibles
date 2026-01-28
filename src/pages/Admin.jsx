import { useState } from "react";
import useAddBook from "../hooks/useAddBook";

/**
 * Admin view component for adding new books to the system.
 * * This component manages a multi-field form, performs real-time and 
 * submission-based validation, and handles accessibility through ARIA attributes 
 * and automatic focus management on errors.
 *
 * @component
 * @returns {JSX.Element} A container with a book creation form.
 */
function Admin(){

    const { addNewBook } = useAddBook();

    /**
     * State object containing validation error messages.
     * @type {Object.<string, string>}
     */
    const [errors, setErrors] = useState({}); 

    /**
     * Form data state containing book details.
     * @type {Object}
     * @property {string} title - The book title.
     * @property {string} genre - The book genre.
     * @property {string|number} price - The retail price.
     * @property {string} image - URL of the book cover.
     * @property {string} synopsis - Detailed description of the book.
     */
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        price: "",
        image: "",
        synopsis: ""
    });

    /**
     * Updates the form data state and clears the specific field error when the user types.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
     */
    const handleChange = (e) => {

        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))

        setErrors((prev) => {
            const newErrors = {...prev};
            delete newErrors[id];
            return newErrors;
        })

    }

    /**
     * Validates the form data and handles the submission process.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if(formData.title.length < 1){
            newErrors.title = "El título debe contener un caracter como mínimo";
        }

        if(formData.genre.length < 4){
            newErrors.genre = "El nombre del género debe tener al menos 4 caracteres";
        }

        if(Number(formData.price) <= 0 || Number(formData.price) >= 800){
            newErrors.price = "El precio debe ser mayor que 0 y menor que 800";
        }

        if(!/^http.*$/.test(formData.image)){
            newErrors.image = "La URL de la imagen debe comenzar por 'http'";
        }

        if(formData.synopsis.length < 20){
            newErrors.synopsis = "La sinposis debe contener al menos 20 caracteres";
        }


        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);

            {/* Poner el foco en el input con error */}
            const firstErrorKey = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(firstErrorKey);
            if(errorElement) {
                errorElement.focus();
            }

            return;
        }

        await addNewBook(formData);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            
            <div className="form_card background_color_white">
                
                <h1 className="heading_h1 color_primary text-center mb-8">
                    Añadir libros
                </h1>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >

                    <div className="form_group">
                        <label htmlFor="title" className="form_label text_small_bold color_black_2">
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Ej: El Señor de los Anillos"
                            className={`
                                form_input text_normal color_black_1
                                ${errors.title ? "form_input_error_state bg-red-50" : "form_input_base focus:background_color_white"}
                            `}
                            aria-invalid={!!errors.title}
                            aria-describedby={errors.title ? "error-title" : undefined}
                        />
                        {errors.title && (
                            <p id="error-title" className="form_error_message text_small color_error">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="form_group">
                        <label htmlFor="genre" className="form_label text_small_bold color_black_2">
                            Género
                        </label>
                        <input
                            id="genre"
                            type="text"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Fantasía"
                            className={`
                                form_input text_normal color_black_1
                                ${errors.genre ? "form_input_error_state bg-red-50" : "form_input_base focus:background_color_white"}
                            `}
                            aria-invalid={!!errors.genre}
                            aria-describedby={errors.genre ? "error-genre" : undefined}
                        />
                        {errors.genre && (
                            <p id="error-genre" className="form_error_message text_small color_error">
                                {errors.genre}
                            </p>
                        )}
                    </div>

                    <div className="form_group">
                        <label htmlFor="price" className="form_label text_small_bold color_black_2">
                            Precio
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="0.00"
                            className={`
                                form_input pl-8 text_normal color_black_1
                                ${errors.price ? "form_input_error_state bg-red-50" : "form_input_base focus:background_color_white"}
                            `}
                            aria-invalid={!!errors.price}
                            aria-describedby={errors.price ? "error-price" : undefined}
                        />
                        {errors.price && (
                            <p id="error-price" className="form_error_message text_small color_error">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div className="form_group">
                        <label htmlFor="image" className="form_label text_small_bold color_black_2">
                            URL de la imagen
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            placeholder="http..."
                            className={`
                                form_input text_normal color_black_1 
                                ${errors.image ? "form_input_error_state bg-red-50" : "form_input_base focus:background_color_white"}
                            `}
                            aria-invalid={!!errors.image}
                            aria-describedby={errors.image ? "error-image" : undefined}
                        />
                        {errors.image && (
                            <p id="error-image" className="form_error_message text_small color_error">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div className="form_group">
                        <label htmlFor="synopsis" className="form_label text_small_bold color_black_2">
                            Sinopsis
                        </label>
                        <textarea
                            id="synopsis"
                            rows="4"
                            value={formData.synopsis}
                            onChange={handleChange}
                            required
                            placeholder="Escribe una breve descripción..."
                            className={`
                                form_input text_normal color_black_1 
                                ${errors.synopsis ? "form_input_error_state bg-red-50" : "form_input_base focus:background_color_white"}
                            `}
                            aria-invalid={!!errors.synopsis}
                            aria-describedby={errors.synopsis ? "error-synopsis" : undefined}
                        />
                        {errors.synopsis && (
                            <p id="error-synopsis" className="form_error_message text_small color_error">
                                {errors.synopsis}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`
                            form_button text_medium_bold
                            ${Object.keys(errors).length > 0 
                                ? "form_button_disabled_effects background_color_grey_3 color_white" 
                                : "form_button_active_effects background_color_primary color_white"
                            }
                        `}
                    >
                        Añadir
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Admin