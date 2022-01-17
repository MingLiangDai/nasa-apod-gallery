import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Box,
  CardActionArea,
  Fab,
  Zoom,
  Modal,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const imageModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "80%",
  objectFit: "contain",
};

const descModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "80%",
  overflowY: "scroll",
};

const ImageCard = ({ image, heightOverride, likeClicked }) => {
  heightOverride = heightOverride || 700;
  const [showImgPrompt, setShowImgPrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(image.url);
    setShowSnackbar(true);
  };

  return (
    <React.Fragment>
      {/* pop ups */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Image link has been copied to clipboard!
        </Alert>
      </Snackbar>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={imageModalStyle} component="img" src={image.url} />
      </Modal>
      <Modal open={showDescModal} onClose={() => setShowDescModal(false)}>
        <Card sx={descModalStyle}>
          <CardContent>
            <Typography variant="h6" component="div">
              {image.title}
            </Typography>
            <Typography gutterBottom variant="body2">
              Photo taken on {image.date}
            </Typography>
            <Divider light />
            <Typography mt={1} variant="body2" color="text.secondary">
              {image.explanation}
            </Typography>
          </CardContent>
        </Card>
      </Modal>

      <Card sx={{ height: heightOverride, position: "relative" }}>
        <CardActionArea
          onMouseOver={() => setShowImgPrompt(true)}
          onMouseLeave={() => setShowImgPrompt(false)}
          onClick={() => setShowModal(true)}
        >
          {showImgPrompt && <ImgPrompt />}
          <CardMedia
            sx={{ height: heightOverride / 2 }}
            component="img"
            image={image.url}
            alt={image.title}
          />
        </CardActionArea>
        <Grid height={heightOverride / 2} container direction="column">
          <Grid item sx={{ flexBasis: "1px", flexGrow: 1, overflow: "hidden" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {image.title}
              </Typography>
              <Typography gutterBottom variant="body2">
                Photo taken on {image.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {image.explanation}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <IconButton
                    size="small"
                    onClick={() => {
                      likeClicked(image);
                    }}
                  >
                    {image.liked ? (
                      <FavoriteIcon aria-label="Unlike" color="error" />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        aria-label="Like"
                        color="primary"
                      />
                    )}
                  </IconButton>
                  <IconButton size="small" onClick={handleCopy}>
                    <ShareIcon color="primary" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Button size="small" onClick={() => setShowDescModal(true)}>
                    Learn more
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

const ImgPrompt = () => {
  return (
    <Zoom
      sx={{
        zIndex: "tooltip",
        position: "absolute",
        top: "0.5rem",
        left: "0.5rem",
      }}
      in={true}
      unmountOnExit
    >
      <Fab component="div" variant="extended" size="small" color="primary">
        View Image
      </Fab>
    </Zoom>
  );
};

export default ImageCard;
