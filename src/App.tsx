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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "services":
        return <ServicesPage onNavigate={navigate} />;
      case "booking":
        return <BookingPage onNavigate={navigate} />;
      case "cabinet":
        return <CabinetPage onNavigate={navigate} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
      case "messages":
        return <MessagesPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
      case "contacts":
        return <ContactsPage />;
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isMessages = page === "messages";

  return (
    <div className="min-h-screen bg-background font-sans">
      {!isMessages && (
        <Navbar activePage={page} onNavigate={navigate} isLoggedIn={isLoggedIn} />
      )}
      {isMessages && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border h-14 flex items-center px-4">
          <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-2 font-black text-lg tracking-tight"
            >
              <span className="text-[hsl(var(--accent))]">●</span>
              <span>ХАСКИ СЕРВИС</span>
            </button>
            <button
              onClick={() => navigate("cabinet")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Кабинет
            </button>
          </div>
        </div>
      )}
      <main>{renderPage()}</main>
    </div>
  );
}
