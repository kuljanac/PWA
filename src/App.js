import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import EventDetail from './components/Events/EventDetail';
import ReservationForm from './components/Reservations/ReservstionForm';
import AdminPanel from './components/Admin/AdminPanel';
import EventList from './components/Events/EventList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthContext } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import './App.css';
import CreateEvent from './components/Events/CreateEvent';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <BackgroundAnimation />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/reserve/:id" element={<ReservationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-event" element={<CreateEvent />} />
          {user && user.role === 'admin' && (
            <Route path="/admin" element={<AdminPanel />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
