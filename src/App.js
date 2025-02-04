import logo from './logo.svg';
import './App.css';
// import Weather from './components/Weather/Weather';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
// import TodoApp from './components/Todo/TodoApp';

const Weather = React.lazy(() => import("./components/Weather/Weather"));
const TodoApp = React.lazy(() => import("./components/Todo/TodoApp"));

function App() {
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        {/* <Weather /> */}
        <TodoApp />
      </Suspense>
    </div>
  );
}

export default App;
