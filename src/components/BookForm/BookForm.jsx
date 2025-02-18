
import { useState, useEffect } from "react";
import { useParams } from "react-router";



const BookForm = (props) => {
    const [formData, setFormData] = useState({

        title: "",
        author: "",
        published_year: "", 
        description: "",
        genre: "",
    });

    const { bookId } = useParams();

    useEffect(() => {   
        const fetchBook = async () => {
            const bookData = await props.getBook(props.bookId);
            setFormData(bookData);
        };
        if (props.bookId) fetchBook();
    }, [props.bookId]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (bookId) {
            await props.handleUpdateBook(bookId, formData);
        } else {
            await props.handleAddBook(formData);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
             <h1>{bookId ? 'Edit book' : 'New book'}</h1>
            <label htmlFor="title">Title</label>
            <input            
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <label htmlFor="author">Author</label>
            <input
                required
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            <label htmlFor="published_year">Published Year</label>
            <input
                required
                type="number"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <label htmlFor="genre">Genre</label>
            <select
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
            >
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="science fiction">Science Fiction</option>
                <option value="non-fiction">Non-Fiction</option>

            </select>
                
            
            <button type="submit">Submit</button>
        </form>
    );

}

export default BookForm;