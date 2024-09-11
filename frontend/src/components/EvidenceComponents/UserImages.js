import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import createAxiosInstance from "../../axiosInstance";
import { Image, Spinner, Alert } from "react-bootstrap";

const UserImages = ({ userId, images, setImages }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const userToken = user?.token;

  const axiosInstance = useMemo(
    () => createAxiosInstance(userToken),
    [userToken]
  );

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const responseUserImages = await axiosInstance.get(
        `/api/users/${userId}/evidence`
      );

      if (responseUserImages.data.length === 0) {
        setError("No images found for this user.");
        return;
      }
      
      const filenames = responseUserImages.data.map((img) =>
        img.url.split("/").pop()
      );

      const imagePromises = filenames.map((filename) =>
        axiosInstance.get(`/api/users/evidence/${filename}`, {
          responseType: "blob",
        })
      );
      const imageResponses = await Promise.all(imagePromises);

      const imageUrls = imageResponses.map((res) =>
        URL.createObjectURL(res.data)
      );
      setImages(imageUrls);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Could not fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, userId, setImages]);

  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId, fetchImages]);

  return (
    <div>
      <h4 style={{ color: "#ffffff" }}>User Images</h4>
      {loading && <Spinner animation="border" variant="light" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex flex-wrap">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="m-2">
            <Image
              src={imgSrc}
              alt={`User Image ${idx}`}
              thumbnail
              width={150}
              height={150}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserImages;
