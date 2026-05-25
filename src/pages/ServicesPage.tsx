import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const categories = ["Все", "Ноутбуки", "Телефоны", "Планшеты", "Бытовая техника", "ПК и Mac"];

const services = [
  { cat: "Ноутбуки", name: "Замена термопасты", price: "от 800 ₽", time: "1–2 ч", icon: "Cpu" },
  { cat: "Ноутбуки", name: "Замена матрицы", price: "от 3 500 ₽", time: "2–4 ч", icon: "Monitor" },
  { cat: "Ноутбуки", name: "Замена клавиатуры", price: "от 1 800 ₽", time: "1–3 ч", icon: "Keyboard" },
  { cat: "Ноутбуки", name: "Чистка от пыли", price: "от 1 200 ₽", time: "1–2 ч", icon: "Wind" },
  { cat: "Телефоны", name: "Замена стекла", price: "от 1 500 ₽", time: "1–2 ч", icon: "Smartphone" },
  { cat: "Телефоны", name: "Замена аккумулятора", price: "от 900 ₽", time: "30–60 мин", icon: "Battery" },
  { cat: "Телефоны", name: "Замена разъёма зарядки", price: "от 1 200 ₽", time: "1–2 ч", icon: "Plug" },
  { cat: "Телефоны", name: "Восстановление после воды", price: "от 2 000 ₽", time: "1–3 дня", icon: "Droplets" },
  { cat: "Планшеты", name: "Замена дисплея", price: "от 4 000 ₽", time: "2–4 ч", icon: "Tablet" },
  { cat: "Планшеты", name: "Замена аккумулятора", price: "от 1 500 ₽", time: "1–2 ч", icon: "Battery" },
  { cat: "Бытовая техника", name: "Ремонт стиральной машины", price: "от 1 500 ₽", time: "1–3 ч", icon: "WashingMachine" },
  { cat: "Бытовая техника", name: "Ремонт холодильника", price: "от 2 000 ₽", time: "2–4 ч", icon: "Refrigerator" },
  { cat: "ПК и Mac", name: "Диагностика", price: "Бесплатно", time: "30–60 мин", icon: "Search" },
  { cat: "ПК и Mac", name: "Замена видеокарты", price: "от 2 500 ₽", time: "2–3 ч", icon: "Cpu" },
  { cat: "ПК и Mac", name: "Установка SSD", price: "от 800 ₽", time: "30–60 мин", icon: "HardDrive" },
  { cat: "ПК и Mac", name: "Переустановка ОС", price: "от 1 000 ₽", time: "2–4 ч", icon: "RefreshCw" },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? services
    : services.filter((s) => s.cat === activeCategory);

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Что мы ремонтируем</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Каталог услуг</h1>
          <p className="text-muted-foreground">Прозрачные цены, никаких скрытых платежей</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((s, i) => (
            <div key={i} className="bg-background p-6 group hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all">
                  <Icon name={s.icon} size={16} fallback="Wrench" />
                </div>
                <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">{s.cat}</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{s.name}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-base font-black text-[hsl(var(--accent))]">{s.price}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Clock" size={11} />
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => onNavigate("booking")}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors"
          >
            <Icon name="CalendarPlus" size={16} />
            Записаться на ремонт
          </button>
        </div>
      </div>
    </div>
  );
}
