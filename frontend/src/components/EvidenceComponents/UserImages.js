import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import createAxiosInstance from "../../axiosInstance";
import { Image, Spinner, Alert } from "react-bootstrap";

const UserImages = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  // Extract token to a separate variable for better dependency tracking
  const userToken = user?.token;

  // Memoize axiosInstance with the extracted userToken
  const axiosInstance = useMemo(() => createAxiosInstance(userToken), [userToken]);

  // Use useCallback to memoize the fetchImages function
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const responseUserImages = await axiosInstance.get(
        `/api/users/${userId}/evidence`
      );

      // Extract filenames from the URLs
      const filenames = responseUserImages.data.map((img) =>
        img.url.split("/").pop()
      );

      console.log("Extracted filenames:", filenames);

      // Construct the URLs for serving the images
      const imagePromises = filenames.map((filename) =>
        axiosInstance.get(`/api/users/evidence/${filename}`, {
          responseType: "blob", // To handle the response as a blob
        })
      );
      const imageResponses = await Promise.all(imagePromises);

      // Convert blobs to image URLs and store them in state
      const imageUrls = imageResponses.map((res) => URL.createObjectURL(res.data));
      console.log(imageUrls)
      setImages(imageUrls);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Could not fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, userId]); // Include axiosInstance and userId as dependencies

  // Effect to fetch images on component mount or when userId changes
  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId, fetchImages]); // Only re-run if userId or fetchImages changes

  console.log(images);
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
