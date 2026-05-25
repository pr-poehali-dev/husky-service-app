import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const categories = ["Все", "Ноутбуки", "Телефоны", "Планшеты", "Бытовая техника", "ПК и Mac"];

const services = [
  { cat: "Ноутбуки",         name: "Замена термопасты",        price: "от 800 ₽",   time: "1–2 ч",    icon: "Cpu" },
  { cat: "Ноутбуки",         name: "Замена матрицы",           price: "от 3 500 ₽", time: "2–4 ч",    icon: "Monitor" },
  { cat: "Ноутбуки",         name: "Замена клавиатуры",        price: "от 1 800 ₽", time: "1–3 ч",    icon: "Keyboard" },
  { cat: "Ноутбуки",         name: "Чистка от пыли",           price: "от 1 200 ₽", time: "1–2 ч",    icon: "Wind" },
  { cat: "Телефоны",         name: "Замена стекла",            price: "от 1 500 ₽", time: "1–2 ч",    icon: "Smartphone" },
  { cat: "Телефоны",         name: "Замена аккумулятора",      price: "от 900 ₽",   time: "30–60 мин", icon: "Battery" },
  { cat: "Телефоны",         name: "Замена разъёма зарядки",   price: "от 1 200 ₽", time: "1–2 ч",    icon: "Plug" },
  { cat: "Телефоны",         name: "Восстановление после воды", price: "от 2 000 ₽", time: "1–3 дня",  icon: "Droplets" },
  { cat: "Планшеты",         name: "Замена дисплея",           price: "от 4 000 ₽", time: "2–4 ч",    icon: "Tablet" },
  { cat: "Планшеты",         name: "Замена аккумулятора",      price: "от 1 500 ₽", time: "1–2 ч",    icon: "Battery" },
  { cat: "Бытовая техника",  name: "Ремонт стиральной машины", price: "от 1 500 ₽", time: "1–3 ч",    icon: "Settings" },
  { cat: "Бытовая техника",  name: "Ремонт холодильника",      price: "от 2 000 ₽", time: "2–4 ч",    icon: "Thermometer" },
  { cat: "ПК и Mac",         name: "Диагностика",              price: "Бесплатно",  time: "30–60 мин", icon: "Search" },
  { cat: "ПК и Mac",         name: "Замена видеокарты",        price: "от 2 500 ₽", time: "2–3 ч",    icon: "Cpu" },
  { cat: "ПК и Mac",         name: "Установка SSD",            price: "от 800 ₽",   time: "30–60 мин", icon: "HardDrive" },
  { cat: "ПК и Mac",         name: "Переустановка ОС",         price: "от 1 000 ₽", time: "2–4 ч",    icon: "RefreshCw" },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? services : services.filter((s) => s.cat === activeCategory);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-brand/80 mb-3">Что мы ремонтируем</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">КАТАЛОГ УСЛУГ</h1>
          <p className="text-white/70 text-base max-w-lg">Прозрачные цены, без скрытых платежей. Гарантия на все работы.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-navy border-navy text-white"
                  : "border-brand-gray text-muted-foreground hover:border-navy hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((s, i) => (
            <div key={i} className="card-service group">
              <div className="w-11 h-11 rounded-xl bg-sky-light flex items-center justify-center mb-4 group-hover:bg-navy transition-all duration-300">
                <Icon name={s.icon} size={20} fallback="Wrench" className="text-navy group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{s.cat}</span>
              <h3 className="font-semibold text-navy mt-2 mb-3 text-sm leading-snug">{s.name}</h3>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                <span className="font-display text-xl text-orange-500">{s.price}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Clock" size={11} />
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button onClick={() => onNavigate("booking")} className="btn-orange text-base py-3.5 px-10">
            <Icon name="CalendarPlus" size={18} />
            Записаться на ремонт
          </button>
        </div>
      </div>
    </div>
  );
}
