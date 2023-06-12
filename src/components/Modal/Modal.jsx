import { useEffect } from 'react';
import { ModalBackdrop, ModalContent } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({children, onClose}) => {

useEffect(() => {

const handleKeyDown = event => {
      if (event.code === 'Escape') {
      onClose();
  }
  };
  window.addEventListener('keydown', this.handleKeyDown);
  document.body.style.overflow = 'hidden';

return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
}, [onClose]);
  
const handleBackdropClick = event => {
  if (event.currentTarget === event.target) {
    onClose();
  }
}  

return createPortal(
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
 };

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

     
