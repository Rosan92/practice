import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Grid, Slider, CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faDownload, faUpload, faQuestionCircle, faHistory, faImage as faImagePlaceholder } from '@fortawesome/free-solid-svg-icons';
import { compress } from 'image-conversion';

const Comproser = () => {
  const [compressedLink, setCompressedLink] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [originalLink, setOriginalLink] = useState('');
  const [uploadImage, setUploadImage] = useState(false);
  const [outputFileName, setOutputFileName] = useState('');
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressed, setIsCompressed] = useState(false);
  const [compressionInProgress, setCompressionInProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [compressedHistory, setCompressedHistory] = useState([]);
  const [showCompressedImage, setShowCompressedImage] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
      if (originalImage) {
          setCompressedLink('');
          setCompressedSize(0);
          setIsCompressed(false);
          setShowCompressedImage(false);
      }
  }, [originalImage]);

  async function uploadLink(event) {
      const imageFile = event.target.files[0];
      setOriginalLink(URL.createObjectURL(imageFile));
      setOriginalImage(imageFile);
      setOutputFileName(imageFile.name);
      setUploadImage(true);
      setOriginalSize(imageFile.size);
  }

  async function compressImage() {
      if (!originalImage) {
          alert('Please upload an image first.');
          return;
      }
      try {
          setCompressionInProgress(true);
          setShowCompressedImage(false);
          setLoading(true);
          const compressedImage = await compress(originalImage, {
              quality: compressionQuality,
              width: 800,
              height: 800,
          });
          setCompressedLink(URL.createObjectURL(compressedImage));
          setCompressedSize(compressedImage.size);
          setIsCompressed(true);
          setCompressedHistory([
              ...compressedHistory,
              {
                  link: compressedLink,
                  name: outputFileName,
              },
          ]);
          setTimeout(() => {
              setLoading(false);
              setShowCompressedImage(true);
          }, 2000);
      } catch (error) {
          console.error('Image compression failed:', error);
          alert('Image compression failed. Please try again.');
      } finally {
          setCompressionInProgress(false);
      }
  }

  function resetApp() {
      setOriginalLink('');
      setOriginalImage(null);
      setUploadImage(false);
      setOutputFileName('');
      setCompressionQuality(0.8);
      setOriginalSize(0);
      setCompressedSize(0);
      setIsCompressed(false);
      setCompressedLink('');
      setShowCompressedImage(false);
  }

  function toggleHelp() {
      setShowHelp(!showHelp);
  }

  function toggleHistory() {
      setShowHistory(!showHistory);
  }

  return (
      <Box className="mainContainer">
          <AppBar position="static">
              <Toolbar>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                      <FontAwesomeIcon icon={faImage} className="icon" />
                      <Typography variant="h6" sx={{ marginLeft: 1 }}>
                          Image Compressor
                      </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                      <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" onClick={toggleHelp} />
                      <FontAwesomeIcon icon={faHistory} className="history-icon" onClick={toggleHistory} sx={{ marginLeft: 2 }} />
                  </Box>
              </Toolbar>
          </AppBar>

          {/* Help Modal */}
          {showHelp && (
              <Box className="help-container" sx={{ padding: 2 }}>
                  <Typography variant="h6">Instructions:</Typography>
                  <ul>
                      <li>Upload an image using the "Upload a file" button.</li>
                      <li>Adjust the compression quality using the slider.</li>
                      <li>Press the "Compress" button to start the compression.</li>
                      <li>Download the compressed image using the "Download" button.</li>
                  </ul>
              </Box>
          )}

          {/* History Modal */}
          {showHistory && (
              <Box className="history-container" sx={{ padding: 2 }}>
                  <Typography variant="h6">Compressed History:</Typography>
                  <ul>
                      {compressedHistory.map((item, index) => (
                          <li key={index}>
                              <a href={item.link} download={item.name}>
                                  {item.name}
                              </a>
                          </li>
                      ))}
                  </ul>
              </Box>
          )}

          <Grid container spacing={2} sx={{ marginTop: 5 }}>
              {/* Left Column (Upload Section) */}
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {uploadImage ? (
                      <img className="image" src={originalLink} alt="Original Image" style={{ maxWidth: '100%', borderRadius: 8 }} />
                  ) : (
                      <Box className="uploadCard" sx={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <FontAwesomeIcon icon={faUpload} className="icon" size="3x" />
                      </Box>
                  )}
                  <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                      <FontAwesomeIcon icon={faUpload} className="icon" />
                      Upload a file
                      <input type="file" hidden accept="image/*" onChange={uploadLink} />
                  </Button>
              </Grid>

              {/* Middle Column (Compression Settings) */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {outputFileName && (
                      <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6">Compression Quality</Typography>
                          <Slider
                              value={compressionQuality}
                              onChange={(e, newValue) => setCompressionQuality(newValue)}
                              min={0.1}
                              max={1}
                              step={0.1}
                              valueLabelDisplay="auto"
                          />
                          <Typography variant="body2">Original Size: {Math.round(originalSize / 1024)} KB</Typography>
                          <Typography variant="body2">Compressed Size: {Math.round(compressedSize / 1024)} KB</Typography>

                          {isCompressed && !compressionInProgress && (
                              <Typography variant="body2" color="success.main">Image compressed successfully!</Typography>
                          )}

                          {compressionInProgress && <CircularProgress />}

                          <Box sx={{ marginTop: 2 }}>
                              {loading ? (
                                  <Typography variant="body2">Loading...</Typography>
                              ) : (
                                  <Button variant="contained" color="success" onClick={compressImage} sx={{ marginRight: 2 }}>
                                      <FontAwesomeIcon icon={faImage} className="icon" />
                                      Compress
                                  </Button>
                              )}
                              <Button variant="outlined" color="error" onClick={resetApp}>
                                  Reset
                              </Button>
                          </Box>
                      </Box>
                  )}
              </Grid>

              {/* Right Column (Compressed Image Display) */}
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {showCompressedImage ? (
                      <Box sx={{ textAlign: 'center' }}>
                          <img
                              className="image"
                              src={compressedLink}
                              alt="Compressed Image"
                              onClick={() => setModalShow(true)}
                              style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: 8 }}
                          />
                          <Button variant="contained" color="success" href={compressedLink} download={outputFileName} sx={{ marginTop: 2 }}>
                              <FontAwesomeIcon icon={faDownload} className="icon" />
                              Download
                          </Button>
                      </Box>
                  ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {compressionInProgress ? (
                              <CircularProgress />
                          ) : (
                              <FontAwesomeIcon icon={faImagePlaceholder} className="icon" size="3x" />
                          )}
                      </Box>
                  )}
              </Grid>
          </Grid>

          {/* Modal for Viewing Compressed Image */}
          <Dialog open={modalShow} onClose={() => setModalShow(false)} maxWidth="lg">
              <DialogContent sx={{ textAlign: 'center' }}>
                  <img className="image" src={compressedLink} alt="Compressed Image" style={{ maxWidth: '100%', borderRadius: 8 }} />
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setModalShow(false)} color="primary">Close</Button>
              </DialogActions>
          </Dialog>
      </Box>
  );
}

export default Comproser