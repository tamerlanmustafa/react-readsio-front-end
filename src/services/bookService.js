const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;
const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  

const show = async (bookId) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}
  
const create = async (bookData) => { 
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}
  

const createReview = async (bookId, reviewData) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}

const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}

const update = async (bookId, bookData) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}


const updateReview = async (bookId, reviewId, reviewData) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}

const deleteReview = async (bookId, reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
}


export { 
  index,
  show,
  create,
  createReview,
  deleteBook,
  update,
  updateReview,
  deleteReview
};
