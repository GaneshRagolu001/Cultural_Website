import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeritageList from "./pages/HeritageList";
import HeritageDetail from "./pages/HeritageDetail";
import Timeline from "./pages/Timeline";
import StoryList from "./pages/StoryList";
import StorySubmit from "./pages/StorySubmit";
import AdminDashboard from "./pages/AdminDashboard";
import PendingStories from "./pages/PendingStories";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import MapPage from "./pages/MapPage";
import AdminHeritage from "./pages/AdminHeritage";
import AdminHeritageForm from "./pages/AdminHeritageForm";
import AdminTimeline from "./pages/AdminTimeline";
import AdminTimelineForm from "./pages/AdminTImelineForm";
import StoryDetail from "./pages/StoryDetail";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-[#F9F8F6]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heritage" element={<HeritageList />} />
          <Route path="/heritage/:id" element={<HeritageDetail />} />

          <Route path="/timeline" element={<Timeline />} />

          <Route path="/stories" element={<StoryList />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route
            path="/stories/submit"
            element={
              <ProtectedRoute>
                <StorySubmit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/heritage"
            element={
              <ProtectedRoute admin>
                <AdminHeritage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/heritage/new"
            element={
              <ProtectedRoute admin>
                <AdminHeritageForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/heritage/edit/:id"
            element={
              <ProtectedRoute admin>
                <AdminHeritageForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/pending-stories"
            element={
              <ProtectedRoute admin>
                <PendingStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/timeline"
            element={
              <ProtectedRoute admin>
                <AdminTimeline />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/timeline/new"
            element={
              <ProtectedRoute admin>
                <AdminTimelineForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/timeline/edit/:id"
            element={
              <ProtectedRoute admin>
                <AdminTimelineForm />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
