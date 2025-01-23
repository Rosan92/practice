import logo from './logo.svg';
import './App.css';
// import Weather from './components/Weather/Weather';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const Weather = React.lazy(() => import("./components/Weather/Weather"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<CircularProgress />}>
        <Weather />
      </Suspense>
    </div>
  );
}

export default App;
