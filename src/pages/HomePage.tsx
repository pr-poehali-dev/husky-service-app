import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: "8+", label: "лет опыта" },
  { value: "12 000+", label: "выполненных заявок" },
  { value: "97%", label: "довольных клиентов" },
  { value: "24 ч", label: "среднее время ремонта" },
];

const advantages = [
  {
    icon: "ShieldCheck",
    title: "Гарантия на работы",
    desc: "Даём письменную гарантию на все виды ремонта от 3 до 12 месяцев",
  },
  {
    icon: "Bell",
    title: "Уведомления о статусе",
    desc: "Push-уведомления на каждом этапе ремонта — всегда знайте, что происходит с вашей техникой",
  },
  {
    icon: "MessageCircle",
    title: "Прямой чат с мастером",
    desc: "Задайте вопрос мастеру напрямую через личный кабинет без ожидания на линии",
  },
  {
    icon: "Clock",
    title: "Срочный ремонт",
    desc: "Экспресс-ремонт в день обращения при наличии запасных частей",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 border border-border rounded-full px-3 py-1.5">
            <span className="status-dot bg-[hsl(var(--accent))] animate-pulse" />
            Принимаем заявки
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Ремонт техники<br />
            <span className="text-[hsl(var(--accent))]">без лишних слов</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Сервисный центр «Хаски Сервис» — профессиональный ремонт ноутбуков, телефонов и бытовой техники. Запись онлайн, статус в реальном времени.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate("booking")}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3.5 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors"
            >
              <Icon name="CalendarPlus" size={16} />
              Записаться на ремонт
            </button>
            <button
              onClick={() => onNavigate("services")}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3.5 rounded font-semibold text-sm hover:border-foreground transition-colors"
            >
              Каталог услуг
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-6 px-8 ${i < stats.length - 1 ? "border-r border-border" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl font-black tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Почему выбирают нас</p>
          <h2 className="text-3xl font-black tracking-tight">Наши преимущества</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-background p-8 group hover:bg-secondary transition-colors">
              <div className="w-10 h-10 rounded flex items-center justify-center border border-border mb-5 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all">
                <Icon name={adv.icon} size={18} />
              </div>
              <h3 className="font-bold text-base mb-2">{adv.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-2">Готовы сдать технику в ремонт?</h2>
            <p className="text-background/70 text-sm">Запишитесь онлайн — займёт меньше минуты</p>
          </div>
          <button
            onClick={() => onNavigate("booking")}
            className="shrink-0 inline-flex items-center gap-2 bg-[hsl(var(--accent))] text-white px-6 py-3.5 rounded font-semibold text-sm hover:bg-[hsl(var(--accent))/90] transition-colors"
          >
            <Icon name="CalendarPlus" size={16} />
            Записаться сейчас
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-black text-foreground tracking-tight">
            <span className="text-[hsl(var(--accent))]">●</span> ХАСКИ СЕРВИС
          </span>
          <span>© 2024 Все права защищены</span>
          <button onClick={() => onNavigate("contacts")} className="hover:text-foreground transition-colors">
            Контакты
          </button>
        </div>
      </footer>
    </div>
  );
}
