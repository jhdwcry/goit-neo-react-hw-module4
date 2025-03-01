import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader/Loader"
import SearchBar from "./components/Searchbar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import ImageGallery from "./components/ImageGallery/ImageGallery"
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn"
import FetchImages from "./services/api"
import './App.css'

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    FetchImages(query, page)
      .then((newImages) => setImages((prevImages) => [...prevImages, ...newImages]))
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term.");
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
      <ImageModal isOpen={modalIsOpen} image={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default App;