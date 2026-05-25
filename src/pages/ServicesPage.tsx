import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const categories = ["Все", "Холодильники", "Стиральные машины", "Посудомоечные", "Кондиционеры", "Морозилки и лари", "Сушильные машины", "Водонагреватели"];

const services = [
  { cat: "Холодильники",      name: "Не морозит / не холодит",       price: "от 1 500 ₽", time: "1–3 ч",  icon: "Thermometer" },
  { cat: "Холодильники",      name: "Заправка фреоном",               price: "от 2 500 ₽", time: "1–2 ч",  icon: "Thermometer" },
  { cat: "Холодильники",      name: "Замена компрессора",             price: "от 4 000 ₽", time: "2–4 ч",  icon: "Settings" },
  { cat: "Холодильники",      name: "Ремонт системы No Frost",        price: "от 2 000 ₽", time: "1–3 ч",  icon: "Snowflake" },
  { cat: "Холодильники",      name: "Замена терморегулятора",         price: "от 1 200 ₽", time: "1–2 ч",  icon: "Sliders" },
  { cat: "Холодильники",      name: "Устранение утечки фреона",       price: "от 3 000 ₽", time: "2–4 ч",  icon: "AlertCircle" },
  { cat: "Стиральные машины", name: "Не сливает воду",                price: "от 1 000 ₽", time: "1–2 ч",  icon: "Droplets" },
  { cat: "Стиральные машины", name: "Замена подшипников",             price: "от 3 500 ₽", time: "3–5 ч",  icon: "Settings" },
  { cat: "Стиральные машины", name: "Замена ТЭНа",                    price: "от 1 800 ₽", time: "1–3 ч",  icon: "Flame" },
  { cat: "Стиральные машины", name: "Замена манжеты люка",            price: "от 2 000 ₽", time: "2–3 ч",  icon: "Circle" },
  { cat: "Стиральные машины", name: "Замена насоса",                  price: "от 1 500 ₽", time: "1–2 ч",  icon: "Wind" },
  { cat: "Посудомоечные",     name: "Не моет / плохо отмывает",       price: "от 1 200 ₽", time: "1–2 ч",  icon: "Droplets" },
  { cat: "Посудомоечные",     name: "Не сливает воду",                price: "от 1 000 ₽", time: "1–2 ч",  icon: "AlertCircle" },
  { cat: "Посудомоечные",     name: "Замена насоса",                  price: "от 2 000 ₽", time: "2–3 ч",  icon: "Settings" },
  { cat: "Кондиционеры",      name: "Не охлаждает / не греет",        price: "от 1 500 ₽", time: "1–3 ч",  icon: "Wind" },
  { cat: "Кондиционеры",      name: "Заправка фреоном",               price: "от 3 000 ₽", time: "1–2 ч",  icon: "Thermometer" },
  { cat: "Кондиционеры",      name: "Чистка внутреннего блока",       price: "от 1 500 ₽", time: "1–2 ч",  icon: "Sparkles" },
  { cat: "Кондиционеры",      name: "Замена компрессора",             price: "от 8 000 ₽", time: "3–6 ч",  icon: "Settings" },
  { cat: "Морозилки и лари",  name: "Не морозит",                     price: "от 2 000 ₽", time: "1–3 ч",  icon: "Box" },
  { cat: "Морозилки и лари",  name: "Заправка фреоном",               price: "от 2 500 ₽", time: "1–2 ч",  icon: "Thermometer" },
  { cat: "Морозилки и лари",  name: "Замена компрессора",             price: "от 5 000 ₽", time: "3–5 ч",  icon: "Settings" },
  { cat: "Сушильные машины",  name: "Не сушит / плохо сушит",         price: "от 1 500 ₽", time: "1–3 ч",  icon: "Shirt" },
  { cat: "Сушильные машины",  name: "Замена ТЭНа",                    price: "от 2 000 ₽", time: "2–3 ч",  icon: "Flame" },
  { cat: "Водонагреватели",   name: "Не греет воду",                  price: "от 1 200 ₽", time: "1–2 ч",  icon: "Flame" },
  { cat: "Водонагреватели",   name: "Замена ТЭНа",                    price: "от 1 500 ₽", time: "1–2 ч",  icon: "Flame" },
  { cat: "Водонагреватели",   name: "Протекает / течёт",              price: "от 1 000 ₽", time: "1–2 ч",  icon: "Droplets" },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? services : services.filter((s) => s.cat === activeCategory);

  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#409FFF 1px,transparent 1px),linear-gradient(90deg,#409FFF 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-6xl mx-auto px-4 relative animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-brand/80 mb-3 font-body">Бытовая техника</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-3">КАТАЛОГ УСЛУГ</h1>
          <p className="text-white/60 font-body max-w-lg">Прозрачные цены, без скрытых платежей. Гарантия на все работы.</p>
        </div>
        <div className="h-0.5 bg-blue-brand mt-8" />
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-heading border-2 transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black border-black text-white"
                  : "border-border text-muted-foreground hover:border-blue-brand hover:text-blue-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((s, i) => (
            <div key={i} className="card-service group" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center group-hover:bg-blue-brand group-hover:border-blue-brand transition-all duration-300">
                  <Icon name={s.icon} size={18} fallback="Wrench" className="text-black group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5 font-body">{s.cat}</span>
              </div>
              <h3 className="font-semibold font-heading text-black text-sm mb-3 leading-snug">{s.name}</h3>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-heading text-xl text-blue-brand">{s.price}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-body">
                  <Icon name="Clock" size={11} />
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button onClick={() => onNavigate("booking")} className="btn-blue text-base py-3.5 px-10">
            <Icon name="CalendarPlus" size={18} />
            Записаться на ремонт
          </button>
        </div>
      </div>
    </div>
  );
}
