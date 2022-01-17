import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, TextField } from "@mui/material";
import GalleryGrid from "./GalleryGrid";
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
      <Box py={2} sx={{ maxWidth: 1440 }} mx="auto">
        <Box px={2}>
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="body1" pb={2}>
            This is{" "}
            <a
              style={{ textDecoration: "none" }}
              href="https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit"
            >
              <b style={{ color: "rgb(25,118,210)" }}>
                NASA Astronomy Pictures of the Day Gallery
              </b>
            </a>
            , a place that brings the wonders of the universe to your screen!
          </Typography>

          <Typography variant="body1" pb={2}>
            Feel free to <b style={{ color: "rgb(25,118,210)" }}>share</b> these
            photos with your friends and if you like what you are seeing, drop a{" "}
            <b style={{ color: "rgb(211,47,47)" }}>like</b>! Your liked photos
            will be kept in record for you even after you leave the site!
          </Typography>
        </Box>
        <Box pt={2} px={2}>
          <DatePicker
            label="Photos Taken After"
            value={dateTaken}
            onChange={(newValue) => {
              setDateTaken(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
          />
        </Box>
        <Box px={2}>
          <GalleryGrid dateTaken={dateTaken.toISOString().slice(0, 10)} />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default GalleryPage;
