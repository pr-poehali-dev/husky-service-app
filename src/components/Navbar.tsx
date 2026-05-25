import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

const links = [
  { id: "services", label: "Услуги" },
  { id: "booking",  label: "Запись" },
  { id: "contacts", label: "Контакты" },
];

export default function Navbar({ activePage, onNavigate, isLoggedIn }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-display text-white text-xl leading-none">
            Х
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider text-white">ХАСКИ СЕРВИС</div>
            <div className="text-[10px] text-sky-brand opacity-80 tracking-widest uppercase -mt-0.5">Ремонт техники</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activePage === link.id ? "text-sky-brand" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+74950000000" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
            <Icon name="Phone" size={14} />
            +7 (495) 000-00-00
          </a>
          {isLoggedIn ? (
            <button onClick={() => onNavigate("cabinet")} className="btn-orange text-sm py-2 px-4">
              <Icon name="User" size={14} />
              Кабинет
            </button>
          ) : (
            <button onClick={() => onNavigate("booking")} className="btn-orange text-sm py-2 px-4">
              <Icon name="CalendarPlus" size={14} />
              Вызвать мастера
            </button>
          )}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy animate-fade-in">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  activePage === link.id
                    ? "bg-white/10 text-sky-brand"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 mt-1">
              <button
                onClick={() => { onNavigate(isLoggedIn ? "cabinet" : "booking"); setMobileOpen(false); }}
                className="btn-orange w-full text-sm py-3"
              >
                <Icon name="CalendarPlus" size={15} />
                {isLoggedIn ? "Личный кабинет" : "Вызвать мастера"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
