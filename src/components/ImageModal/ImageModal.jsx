import Modal from "react-modal";
import css from "./ImageModal.module.css"

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
    >
      <img className={css.modalWindow}  src={image.urls.regular} alt={image.alt_description} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </Modal>
  );
};
  export default ImageModal