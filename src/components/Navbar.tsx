import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  notifications?: number;
}

const links = [
  { id: "services",  label: "Услуги" },
  { id: "booking",   label: "Запись" },
  { id: "contacts",  label: "Контакты" },
];

export default function Navbar({ activePage, onNavigate, isLoggedIn, notifications = 0 }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <img
            src="https://cdn.poehali.dev/projects/98752a69-fc99-41c4-ae69-26c3cb674be9/bucket/0783289f-947e-412c-9f1b-1718928a91aa.jpg"
            alt="Husky Service"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-semibold font-heading transition-colors relative py-1 ${
                activePage === link.id
                  ? "text-blue-brand"
                  : "text-foreground hover:text-blue-brand"
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-blue-brand rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+74950000000" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-brand transition-colors font-body">
            <Icon name="Phone" size={14} />
            +7 (495) 000-00-00
          </a>
          {isLoggedIn ? (
            <button onClick={() => onNavigate("cabinet")} className="btn-blue text-sm py-2 px-4 relative">
              <Icon name="User" size={14} />
              Кабинет
              {notifications > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                  {notifications}
                </span>
              )}
            </button>
          ) : (
            <button onClick={() => onNavigate("booking")} className="btn-blue text-sm py-2 px-4">
              <Icon name="CalendarPlus" size={14} />
              Вызвать мастера
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn && notifications > 0 && (
            <button onClick={() => onNavigate("cabinet")} className="relative p-2">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-brand flex items-center justify-center text-white text-[9px] font-bold">
                {notifications}
              </span>
            </button>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold font-heading transition-colors ${
                  activePage === link.id
                    ? "bg-blue-brand/10 text-blue-brand"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-border mt-1">
              <button
                onClick={() => { onNavigate(isLoggedIn ? "cabinet" : "booking"); setMobileOpen(false); }}
                className="btn-blue w-full text-sm py-3"
              >
                <Icon name={isLoggedIn ? "User" : "CalendarPlus"} size={15} />
                {isLoggedIn ? "Личный кабинет" : "Вызвать мастера"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}