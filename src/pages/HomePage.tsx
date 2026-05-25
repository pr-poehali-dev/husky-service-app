import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: "8+",     label: "лет опыта" },
  { value: "12 000+", label: "выполненных заявок" },
  { value: "97%",    label: "довольных клиентов" },
  { value: "24 ч",   label: "среднее время ремонта" },
];

const services = [
  { icon: "WashingMachine", label: "Стиральные машины", fallback: "Wrench" },
  { icon: "Refrigerator",   label: "Холодильники",      fallback: "Wrench" },
  { icon: "Smartphone",     label: "Телефоны",          fallback: "Smartphone" },
  { icon: "Monitor",        label: "Ноутбуки и ПК",    fallback: "Monitor" },
  { icon: "Tablet",         label: "Планшеты",          fallback: "Tablet" },
  { icon: "Search",         label: "Диагностика",       fallback: "Search" },
];

const whyUs = [
  { emoji: "⚡", title: "Быстро", desc: "Выедем за 2 часа, починим за день — гарантируем срок" },
  { emoji: "🔧", title: "Надёжно", desc: "Опытные мастера с сертификатами и инструментами" },
  { emoji: "🛡️", title: "С гарантией", desc: "Письменная гарантия на все виды ремонта от 3 до 12 месяцев" },
  { emoji: "📲", title: "Онлайн-статус", desc: "Push-уведомления на каждом этапе — вы всегда в курсе" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pt-16">

      {/* Hero */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-brand/90 mb-6 border border-sky-brand/30 rounded-full px-3 py-1.5">
              <span className="status-dot bg-orange-400 animate-pulse" />
              Принимаем заявки · Выезд за 2 часа
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-none mb-6 text-white">
              ХАСКИ СЕРВИС —<br />
              <span className="text-orange-400">РЕМОНТ БЫТОВОЙ</span><br />
              ТЕХНИКИ С ГАРАНТИЕЙ
            </h1>
            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-lg font-sans">
              Приедем за 2 часа, починим за день. Профессиональный ремонт ноутбуков, телефонов и бытовой техники.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate("booking")} className="btn-orange text-base py-3.5 px-8">
                <Icon name="CalendarPlus" size={18} />
                Вызвать мастера
              </button>
              <button onClick={() => onNavigate("services")} className="btn-outline-white text-base py-3.5 px-8">
                Каталог услуг
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mascot / logo image */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block animate-bob opacity-90">
          <img
            src="https://cdn.poehali.dev/projects/98752a69-fc99-41c4-ae69-26c3cb674be9/files/323d1ab2-183c-4d86-807c-7cec7025c2f1.jpg"
            alt="Хаски Сервис"
            className="w-64 h-64 object-cover rounded-2xl opacity-70 mix-blend-luminosity"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="py-4 px-8 text-center">
              <div className="font-display text-4xl text-orange-400">{s.value}</div>
              <div className="text-sm text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Что мы ремонтируем</p>
          <h2 className="font-display text-4xl text-navy">НАШИ УСЛУГИ</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => onNavigate("services")}
              className="card-service text-left group"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-light flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-white transition-all duration-300">
                <Icon name={s.icon} size={22} fallback={s.fallback} className="text-navy group-hover:text-white transition-colors" />
              </div>
              <p className="font-semibold text-navy">{s.label}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => onNavigate("services")} className="btn-navy py-3 px-8">
            Смотреть все услуги и цены
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Наши преимущества</p>
            <h2 className="font-display text-4xl text-navy">ПОЧЕМУ МЫ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className="card-service flex flex-col items-start" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4 animate-bob" style={{ animationDelay: `${i * 0.4}s` }}>{w.emoji}</div>
                <h3 className="font-display text-2xl text-navy mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-4xl mb-2">ГОТОВЫ СДАТЬ ТЕХНИКУ В РЕМОНТ?</h2>
            <p className="text-white/70 text-sm">Запишитесь онлайн или звоните — ответим сразу</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button onClick={() => onNavigate("booking")} className="btn-orange text-base py-3.5 px-8">
              <Icon name="CalendarPlus" size={18} />
              Записаться
            </button>
            <a href="tel:+74950000000" className="btn-outline-white text-base py-3.5 px-8">
              <Icon name="Phone" size={18} />
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center font-display text-white text-base">Х</div>
            <span className="font-display text-lg tracking-wider">ХАСКИ СЕРВИС</span>
          </div>
          <span className="text-white/50">© 2024 Все права защищены</span>
          <div className="flex gap-4 text-white/70">
            <button onClick={() => onNavigate("contacts")} className="hover:text-white transition-colors">Контакты</button>
            <button onClick={() => onNavigate("services")} className="hover:text-white transition-colors">Услуги</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
