import axios from "axios";
import React, { useState } from "react";
import { WEATHER_API } from "../../apiConstants";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { NightlightRound, WbSunny } from "@mui/icons-material";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    setWeather(null);
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `${WEATHER_API}/weather?q=${city}&appid=905e2cb70b62d57990dd3c7d60ae0132`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (city) {
      fetchWeather();
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container
      maxWidth="2xl"
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: "URL('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: 'linear-gradient(45deg,rgb(243, 33, 198),rgb(48, 121, 138))',
        padding: 4,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          color: "pink",
          fontWeight: 'bold'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Get Your City Weather Information
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2,
            width: "50%",
            "& .MuiInputBase-root": {
              fontSize: "1rem",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderWidth: "5px",
                borderColor: "#3f51b5",
              },
              "&:hover fieldset": {
                borderColor: "#3f51b5",
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
                borderWidth: "2px",
              },
            },
          }}
        />
        {error && (
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              backgroundColor: "beige",
              width: "fit-content",
              padding: 1,
              borderRadius: "10px",
              margin: "0 auto",
            }}
          >
            {error?.toUpperCase()}
          </Typography>
        )}
        <Button variant="contained" onClick={handleClick}>
          Get Weather
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : weather ? (
        <Card sx={{ marginTop: 4, backgroundColor: "beige", width: '75%', margin: "0 auto" }}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              {convertToDate(weather.dt)}
            </Typography>
            <Box
              sx={{
                marginTop: 2,
                marginBottom: 3,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1, color: "darkblue" }}>
                <Typography variant="h6">
                  <WbSunny
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      color: "orange",
                    }}
                  />
                  Sunrise
                </Typography>
                <Typography variant="body1">
                  {convertToTime(weather.sys.sunrise)}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, color: "darkblue" }}>
                <Typography variant="h6">
                  <NightlightRound
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      color: "orange",
                    }}
                  />
                  Sunset
                </Typography>
                <Typography variant="body1">
                  {convertToTime(weather.sys.sunset)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 4,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1, color: "#ed7f27" }}>
                <Typography variant="h6">Humidity</Typography>
                <Typography variant="body1">
                  {weather.main.humidity}%
                </Typography>
              </Box>
              <Box sx={{ flex: 1, color: "red" }}>
                <Typography variant="h6">Temperature</Typography>
                <Typography variant="body1">
                  {kelvinToCelsius(weather.main.temp).toFixed(2)}°c
                </Typography>
              </Box>
              <Box sx={{ flex: 1, color: "darkslategray" }}>
                <Typography variant="h6">Forecast</Typography>
                <Typography variant="body1">
                  {weather.weather[0].description.toUpperCase()}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 4,
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ flex: 1, color: "#ed7f27" }}>
                <Typography variant="h6">Wind Speed</Typography>
                <Typography variant="body1">
                  {weather.wind.speed}%
                </Typography>
              </Box>
              <Box sx={{ flex: 1, color: "red" }}>
                <Typography variant="h6">Wind Direction</Typography>
                <Typography variant="body1">
                  {weather.wind.deg}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, color: "darkslategray" }}>
                <Typography variant="h6">Forecast</Typography>
                <Typography variant="body1">
                  {weather.weather[0].description.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </Container>
  );
};

export default Weather;
