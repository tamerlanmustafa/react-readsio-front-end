import { useState } from "react"




const ReviewForm = (props) => {
    const [formData, setFormData] = useState({
        review_text: '',
        rating: '',
     })
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleAddReview(formData)
        setFormData({ review_text: '' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="review_text">Review</label>
            <textarea
                required
                type="text"
                name="review_text"
                id="review_text"
                value={formData.review_text}
                onChange={handleChange}
            />
            <label htmlFor="rating">Rating</label>
            <select
                name="rating"
                id="rating"
                value={formData.rating}
                onChange={handleChange}
            >
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );

}

export default ReviewForm

