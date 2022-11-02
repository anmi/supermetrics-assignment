import React from 'react';
import './App.css';
import { LoginPage } from './pages/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PostsPage } from './pages/Posts';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/authors/:authorId/posts" element={<PostsPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<Navigate to="/posts"/>} />
      </Routes>
    </div>
  );
}

export default App;
