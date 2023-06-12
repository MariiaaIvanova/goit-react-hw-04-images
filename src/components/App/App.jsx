import { useState, useEffect } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { getImages } from 'components/services/apiService';
import { toastConfig } from 'components/services/utils';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { ContainerApp, ModalImage } from './App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
 useEffect(() => {
    if (!searchQuery) return;
      getImages(searchQuery, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            toast.error('Enter a valid query', toastConfig);
            return;
          } 
          if (hits.length < 12 || (hits.length !== 0 && hits.length < 12)) {
          toast.info('No more images', toastConfig);
          }

        setImages(prevHits => [...prevHits, ...hits]);
        setTotalImages(totalHits);
        })

        .catch(error => {
          console.error(error.response);
        })
        .finally(() => setIsLoading(false));
 }, [searchQuery, page]);

 const handleSearchFormSubmit = searchValue => {
    setSearchQuery(searchValue);
    setPage(1);
    setImages([]);
    setTotalImages(0);
    setIsLoading(false);
  };

  const handleLoadMore = () =>
    setPage(prevPage => prevPage + 1);
  
 const toggleModal = (url = '') => setLargeImageURL(url);

 const showLoadMoreBtn = !isLoading && images.length !== totalImages;

    return (
      <ContainerApp>
        <Searchbar onSearchSubmit={handleSearchFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} handleImageClick={toggleModal} />
        )}
        {showLoadMoreBtn && (
          <Button onClick={handleLoadMore} disabled={isLoading} />
        )}
        {isLoading && <Loader />}
        {largeImageURL && (
          <Modal onClose={toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
        <ToastContainer />
      </ContainerApp>
    );
  };


export default App;