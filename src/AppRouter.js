import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoUploader from './VideoUploader';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<VideoUploader />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;