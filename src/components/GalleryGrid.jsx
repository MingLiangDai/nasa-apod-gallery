import React, { useEffect, useState } from "react";
import { Grid, Alert, Box, LinearProgress } from "@mui/material";
import axios from "axios";
import ImageCard from "./ImageCard";

const GalleryGrid = ({ dateTaken }) => {
  const [images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [likedMap, setLikedMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLikedMap(
      localStorage.getItem("likedMap")
        ? JSON.parse(localStorage.getItem("likedMap"))
        : {}
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios(
          `https://api.nasa.gov/planetary/apod?api_key=053NMJOOKa5FdJ1jPb7eBe40422SXnZjBVp2joCk&start_date=${dateTaken}`
        );

        // retrieved from local storage
        // directly cuz of async behaviour of setLikedMap
        const likedImages = localStorage.getItem("likedMap")
          ? JSON.parse(localStorage.getItem("likedMap"))
          : {};

        setImages(
          res.data.map((img) => ({ ...img, liked: likedImages[img.title] }))
        );
        if (res.data.length === 0)
          setFetchError("No images found after this date");
        else setFetchError("");
      } catch (err) {
        setImages([]);
        setFetchError("Error fetching images");
      }
      setLoading(false);
    };
    fetchData();
  }, [dateTaken]);

  const updateLiked = (image) => {
    const index = images.findIndex((img) => img.title === image.title);

    const newImages = [...images];
    newImages[index] = { ...newImages[index], liked: !newImages[index].liked };
    setImages(newImages);

    const newLikedMap = { ...likedMap };
    if (newImages[index].liked)
      newLikedMap[image.title] = "*EASTER EGG* Hire me plz!";
    else delete newLikedMap[image.title];
    setLikedMap(newLikedMap);
    localStorage.setItem("likedMap", JSON.stringify(newLikedMap));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Grid pt={2} px={2}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Grid>
      ) : (
        fetchError && (
          <Grid pt={2} px={2}>
            <Alert severity="error">{fetchError}</Alert>
          </Grid>
        )
      )}

      <Grid pt={2} px={2} spacing={2} container>
        {images.map((image, index) => (
          <Grid item md={6} lg={4} key={index}>
            <ImageCard
              image={image}
              key={image.title}
              likeClicked={updateLiked}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default GalleryGrid;
