import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import BookingPage from "@/pages/BookingPage";
import CabinetPage from "@/pages/CabinetPage";
import MessagesPage from "@/pages/MessagesPage";
import ContactsPage from "@/pages/ContactsPage";
import LoginPage from "@/pages/LoginPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (target: string) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => setIsLoggedIn(true);

  const unreadNotifications = isLoggedIn ? 2 : 0;

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage onNavigate={navigate} />;
      case "services": return <ServicesPage onNavigate={navigate} />;
      case "booking":  return <BookingPage onNavigate={navigate} />;
      case "cabinet":  return <CabinetPage onNavigate={navigate} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
      case "messages": return <MessagesPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
      case "contacts": return <ContactsPage />;
      case "login":    return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      default:         return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar
        activePage={page}
        onNavigate={navigate}
        isLoggedIn={isLoggedIn}
        notifications={unreadNotifications}
      />
      <main>{renderPage()}</main>
    </div>
  );
}
