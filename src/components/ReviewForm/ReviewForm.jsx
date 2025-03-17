import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import "./ReviewForm.css";

const ReviewForm = (props) => {
    const [formData, setFormData] = useState({
        review_text: "",
        rating: "",
    });

    const { bookId, reviewId } = useParams();
    const navigate = useNavigate();
    const textareaRef = useRef(null); 

    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
        }
    }, [formData.review_text]); 

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddReview(formData);
        setFormData({ review_text: "", rating: "" }); 
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <label htmlFor="review_text">Write a review</label>
            <textarea
                ref={textareaRef}
                rows="1"
                required
                name="review_text"
                id="review_text"
                value={formData.review_text}
                onChange={handleChange}
                style={{ width: "100%", resize: "none", overflow: "hidden" }} 
            />
            <label htmlFor="rating">Rate the book</label>
            <select
                name="rating"
                id="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                >
                <option value="">Select a rating</option>
                <option value="1">★☆☆☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="3">★★★☆☆</option>
                <option value="4">★★★★☆</option>
                <option value="5">★★★★★</option>
            </select>

            <button className="submit-button" type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
