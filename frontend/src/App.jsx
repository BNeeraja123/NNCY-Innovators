import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import EventsListing from './pages/EventsListing';
import EventDetail from './pages/EventDetail';
import MyEvents from './pages/MyEvents';
import EventGallery from './pages/EventGallery';
import ChatbotDemo from './pages/ChatbotDemo';
import FAQChatbot from './components/FAQChatbot';
import AlumniShowcase from './pages/AlumniShowcase';
import AlumniProfile from './pages/AlumniProfile';
import AdminAlumni from './pages/AdminAlumni';
import PlacementDashboard from './pages/PlacementDashboard';
import CompanyDetail from './pages/CompanyDetail';
import PlacedStudents from './pages/PlacedStudents';
import AdminPlacement from './pages/AdminPlacement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import RankingsPage from './pages/RankingsPage';
import AwardsPage from './pages/AwardsPage';
import AchievementsPage from './pages/AchievementsPage';
import ReportsPage from './pages/ReportsPage';
import ClubsDashboard from './pages/ClubsDashboard';
import TechnicalClubsPage from './pages/TechnicalClubsPage';
import CulturalGroupsPage from './pages/CulturalGroupsPage';
import SportsTeamsPage from './pages/SportsTeamsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          {/* Event Management Routes */}
          <Route path="/events" element={<EventsListing />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/gallery" element={<EventGallery />} />
          
          {/* Alumni Routes */}
          <Route path="/alumni" element={<AlumniShowcase />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/admin/alumni" element={<AdminAlumni />} />
          
          {/* Placement Routes */}
          <Route path="/placement" element={<PlacementDashboard />} />
          <Route path="/placement/company/:id" element={<CompanyDetail />} />
          <Route path="/placement/students" element={<PlacedStudents />} />
          <Route path="/admin/placement" element={<AdminPlacement />} />
          
          {/* Analytics Routes */}
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/analytics/rankings" element={<RankingsPage />} />
          <Route path="/analytics/awards" element={<AwardsPage />} />
          <Route path="/analytics/achievements" element={<AchievementsPage />} />
          <Route path="/analytics/reports" element={<ReportsPage />} />
          
          {/* Clubs & Societies Routes */}
          <Route path="/clubs" element={<ClubsDashboard />} />
          <Route path="/clubs/technical" element={<TechnicalClubsPage />} />
          <Route path="/clubs/cultural" element={<CulturalGroupsPage />} />
          <Route path="/clubs/sports" element={<SportsTeamsPage />} />
          <Route path="/clubs/:clubId" element={<ClubDetailPage />} />
          
          {/* Chatbot Routes */}
          <Route path="/chatbot" element={<ChatbotDemo />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        {/* FAQ Chatbot - Available on all pages */}
        <FAQChatbot />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
