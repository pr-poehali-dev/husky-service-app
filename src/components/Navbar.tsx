import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

export default function Navbar({ activePage, onNavigate, isLoggedIn }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "booking", label: "Запись" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 font-black text-xl tracking-tight"
        >
          <span className="text-[hsl(var(--accent))]">●</span>
          <span>ХАСКИ СЕРВИС</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-colors ${
                activePage === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <div className="mt-0.5 h-px bg-[hsl(var(--accent))] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate("cabinet")}
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border transition-all ${
                activePage === "cabinet"
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              <Icon name="User" size={15} />
              Кабинет
            </button>
          ) : (
            <button
              onClick={() => onNavigate("login")}
              className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border border-border hover:border-foreground transition-all"
            >
              Войти
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate(isLoggedIn ? "cabinet" : "login"); setMobileOpen(false); }}
              className="text-left px-3 py-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {isLoggedIn ? "Личный кабинет" : "Войти"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
