import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: "8+",      label: "лет опыта",               color: "text-blue-brand" },
  { value: "12 000+", label: "выполненных заявок",       color: "text-blue-brand" },
  { value: "97%",     label: "довольных клиентов",       color: "text-blue-brand" },
  { value: "2 часа",  label: "выезд мастера",            color: "text-blue-brand" },
];

const appliances = [
  { icon: "Thermometer",  label: "Холодильники",       desc: "Все марки и типы" },
  { icon: "Settings",     label: "Стиральные машины",  desc: "Ремонт и диагностика" },
  { icon: "Droplets",     label: "Посудомоечные",      desc: "Встраиваемые и отдельные" },
  { icon: "Wind",         label: "Кондиционеры",       desc: "Сплит-системы и мульти" },
  { icon: "SnowflakeIcon",label: "Морозилки и лари",   desc: "Промышленные и бытовые", fallback: "Box" },
  { icon: "Shirt",        label: "Сушильные машины",   desc: "Тепловые и конденсатные" },
  { icon: "Flame",        label: "Водонагреватели",    desc: "Накопительные и проточные" },
];

const whyUs = [
  { icon: "Zap",         stat: "2 ч",      label: "Быстро",          desc: "Выедем в течение 2 часов в любой район города" },
  { icon: "ShieldCheck", stat: "12 мес",   label: "Гарантия",        desc: "Письменная гарантия на все виды ремонтных работ" },
  { icon: "Bell",        stat: "онлайн",   label: "Push-уведомления",desc: "Следите за ходом ремонта в реальном времени" },
  { icon: "Wrench",      stat: "10+ лет",  label: "Профессионалы",   desc: "Сертифицированные мастера с большим опытом" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pt-16">

      {/* Hero — чёрный фон */}
      <section className="bg-black text-white relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#409FFF 1px,transparent 1px),linear-gradient(90deg,#409FFF 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 border border-white/20 rounded-full px-3 py-1.5 text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-brand animate-pulse" />
              Принимаем заявки · Выезд за 2 часа
            </div>
            <h1 className="font-heading text-5xl md:text-7xl leading-none mb-6 text-white">
              ХАСКИ СЕРВИС —<br />
              <span className="text-blue-brand">РЕМОНТ БЫТОВОЙ</span><br />
              ТЕХНИКИ С ГАРАНТИЕЙ
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg font-body">
              Приедем за 2 часа, починим за день. Холодильники, стиральные машины, кондиционеры и вся бытовая техника.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate("booking")} className="btn-blue text-base py-3.5 px-8">
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

        {/* Blue accent line at bottom */}
        <div className="h-1 bg-blue-brand" />
      </section>

      {/* Stats — белый с акцентами */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((s, i) => (
            <div key={i} className="py-4 px-8 text-center">
              <div className={`font-heading text-4xl ${s.color}`}>{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1 font-body">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Appliances */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 font-body">Бытовая техника</p>
          <h2 className="font-heading text-4xl text-black">ЧТО МЫ РЕМОНТИРУЕМ</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {appliances.map((a, i) => (
            <button
              key={i}
              onClick={() => onNavigate("services")}
              className="card-service text-left group"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="w-11 h-11 rounded-lg border border-border flex items-center justify-center mb-4 group-hover:bg-blue-brand group-hover:border-blue-brand transition-all duration-300">
                <Icon name={a.icon} size={20} fallback={a.fallback ?? "Wrench"} className="text-black group-hover:text-white transition-colors" />
              </div>
              <p className="font-semibold text-black text-sm font-heading">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-1 font-body">{a.desc}</p>
            </button>
          ))}
          {/* All services CTA card */}
          <button
            onClick={() => onNavigate("services")}
            className="rounded-xl border-2 border-dashed border-border p-6 text-left hover:border-blue-brand transition-all group flex flex-col justify-center items-center text-center"
          >
            <Icon name="ArrowRight" size={22} className="text-muted-foreground group-hover:text-blue-brand transition-colors mb-2" />
            <p className="text-sm font-semibold font-heading text-muted-foreground group-hover:text-blue-brand transition-colors">Все услуги и цены</p>
          </button>
        </div>
      </section>

      {/* Why us — серый фон */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 font-body">Наши преимущества</p>
            <h2 className="font-heading text-4xl text-black">ПОЧЕМУ МЫ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <div key={i} className="card-service">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                    <Icon name={w.icon} size={18} className="text-blue-brand" />
                  </div>
                  <span className="font-heading text-2xl text-blue-brand">{w.stat}</span>
                </div>
                <h3 className="font-heading text-lg text-black mb-1">{w.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Push notifications promo */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-blue-brand text-xs font-semibold tracking-widest uppercase mb-4 font-body">
              <Icon name="Bell" size={14} />
              Личный кабинет
            </div>
            <h2 className="font-heading text-4xl text-white mb-3">СЛЕДИТЕ ЗА ХОДОМ<br /><span className="text-blue-brand">РЕМОНТА ОНЛАЙН</span></h2>
            <p className="text-white/60 leading-relaxed font-body mb-6 max-w-lg">
              Регистрируйтесь и получайте push-уведомления на каждом этапе: принято → диагностика → ремонт → готово к выдаче.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate("login")} className="btn-blue text-base py-3.5 px-8">
                <Icon name="UserPlus" size={18} />
                Создать аккаунт
              </button>
              <button onClick={() => onNavigate("cabinet")} className="btn-outline-white text-base py-3.5 px-8">
                Войти
              </button>
            </div>
          </div>
          {/* Notification mockup */}
          <div className="shrink-0 w-72 space-y-2.5 animate-fade-in">
            {[
              { icon: "CheckCircle", text: "Заявка HS-2847 принята", sub: "Ноутбук MacBook Pro 14", time: "09:00", color: "text-green-400" },
              { icon: "Search",      text: "Начата диагностика",       sub: "Выявлена неисправность платы", time: "11:30", color: "text-blue-brand" },
              { icon: "Wrench",      text: "Ремонт начат",             sub: "Ориентировочно завтра к 15:00",  time: "14:00", color: "text-yellow-400" },
            ].map((n, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/10 backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.15}s` }}>
                <Icon name={n.icon} size={18} className={n.color} fallback="Bell" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold font-heading truncate">{n.text}</p>
                  <p className="text-white/50 text-xs font-body truncate">{n.sub}</p>
                </div>
                <span className="text-white/40 text-xs shrink-0 font-body">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl text-black mb-1">ГОТОВЫ ВЫЗВАТЬ МАСТЕРА?</h2>
            <p className="text-muted-foreground font-body text-sm">Запишитесь онлайн или звоните — ответим сразу</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button onClick={() => onNavigate("booking")} className="btn-blue text-base py-3.5 px-8">
              <Icon name="CalendarPlus" size={18} />
              Записаться
            </button>
            <a href="tel:+74950000000" className="btn-outline text-base py-3.5 px-8">
              <Icon name="Phone" size={18} />
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/98752a69-fc99-41c4-ae69-26c3cb674be9/bucket/0783289f-947e-412c-9f1b-1718928a91aa.jpg"
              alt="Husky Service"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>
          <span className="text-white/40 font-body">© 2024 Все права защищены</span>
          <div className="flex gap-5 text-white/50">
            <button onClick={() => onNavigate("contacts")} className="hover:text-blue-brand transition-colors font-body">Контакты</button>
            <button onClick={() => onNavigate("services")} className="hover:text-blue-brand transition-colors font-body">Услуги</button>
            <button onClick={() => onNavigate("cabinet")} className="hover:text-blue-brand transition-colors font-body">Кабинет</button>
          </div>
        </div>
      </footer>
    </div>
  );
}