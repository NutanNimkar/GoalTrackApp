import React, { useState } from "react";
import { Image, Alert, Button, Modal } from "react-bootstrap";
import createAxiosInstance from "../../axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";
const UserImages = ({ imageList, fetchUserImages, userId }) => {
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [enlargeImage, setEnlargeImage] = useState(null);
  const { user } = useAuthContext();
  const axiosInstance = createAxiosInstance(user?.token);
  
  // Handle image selection by fileId
  const handleImageSelect = (fileId) => {
    if (selectedFileIds.includes(fileId)) {
      setSelectedFileIds((prev) => prev.filter((id) => id !== fileId));
    } else {
      setSelectedFileIds((prev) => [...prev, fileId]);
    }
  };
  // Show confirmation modal
  const openConfirmationModal = () => setShowModal(true);
  const closeConfirmationModal = () => setShowModal(false);
  // Show enlarged image modal
  const handleEnlargeImage = (imageUrl) => {
    setEnlargeImage(imageUrl);
  };

  // Close enlarged image modal
  const closeEnlargeModal = () => {
    setEnlargeImage(null);
  };
  // Delete selected images by fileId after confirmation
  const handleDeleteImages = async () => {
    try {
      // Delete images
      await Promise.all(
        selectedFileIds.map((fileId) =>
          axiosInstance.delete(`/api/users/${userId}/image/${fileId}`)
        )
      );
      fetchUserImages(); 
      setSelectedFileIds([]); 
      closeConfirmationModal();
    } catch (err) {
      console.error("Error deleting images:", err);
      alert("Failed to delete images. Please try again.");
    }
  };
  return (
    <div>
      <h4 style={{ color: "#ffffff" }}>User Images</h4>
      {imageList.length === 0 && <Alert variant="info">No images found for this user.</Alert>}
      <div className="d-flex flex-wrap">
        {imageList && imageList.map((image, idx) => (
          <div
            key={image.fileId}
            className={`m-2 ${selectedFileIds.includes(image.fileId) ? "border border-primary" : ""}`}
            onClick={() => handleImageSelect(image.fileId)}
            onDoubleClick={() => handleEnlargeImage(image.url)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={image.url}
              alt={`User Image ${idx}`}
              thumbnail
              width={150}
              height={150}
            />
          </div>
        ))}
      </div>

      {selectedFileIds.length > 0 && (
        <Button variant="danger" className="mt-3" onClick={openConfirmationModal}>
          Delete Selected Images
        </Button>
      )}

      <Modal show={showModal} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedFileIds.length} image(s)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteImages}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!enlargeImage} onHide={closeEnlargeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {enlargeImage && <Image src={enlargeImage} fluid />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEnlargeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserImages;
