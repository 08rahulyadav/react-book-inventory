import axios from "axios";

const API_URL = "https://6978faa1cd4fe130e3dada14.mockapi.io/books";

export const getBooks = () => axios.get(API_URL);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
export const addBook = (data) => axios.post(API_URL, data);
export const updateBook = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteBook = (id) =>
  axios.delete(`${API_URL}/${id}`);
