import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, TextField } from "@mui/material";
import GalleryGrid from "./GalleryGrid";
import landingImg from "../assets/images/landing.jpg";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const GalleryPage = () => {
  const [dateTaken, setDateTaken] = useState(
    (() => {
      // self calling func
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    })()
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid pb={2} sx={{ maxWidth: 1440 }}>
        <Grid
          height="100vh"
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: "100%",
              objectFit: "cover",
              height: "100vh",
              position: "absolute",
              zIndex: "-1",
            }}
            component="img"
            src={landingImg}
          />
          <Typography variant="h2" color="white" sx={{ textAlign: "center" }}>
            NASA Astronomy Pictures of the Day Gallery
          </Typography>
        </Grid>
        <Grid pt={2} px={2}>
          <DatePicker
            label="Photos Taken After"
            value={dateTaken}
            onChange={(newValue) => {
              setDateTaken(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
          />
        </Grid>
        <GalleryGrid dateTaken={dateTaken.toISOString().slice(0, 10)} />
      </Grid>
    </LocalizationProvider>
  );
};

export default GalleryPage;
