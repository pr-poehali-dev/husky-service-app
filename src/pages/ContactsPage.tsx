import Icon from "@/components/ui/icon";

const contacts = [
  { icon: "Phone",   label: "Телефон",        value: "+7 (495) 000-00-00",   sub: "Пн–Вс, 9:00–20:00" },
  { icon: "Mail",    label: "Email",           value: "info@husky-service.ru", sub: "Ответим в течение часа" },
  { icon: "MapPin",  label: "Адрес",           value: "Москва, ул. Примерная, 1", sub: "Вход со стороны двора" },
  { icon: "Clock",   label: "Режим работы",    value: "9:00 — 20:00",         sub: "Без выходных" },
];

export default function ContactsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#409FFF 1px,transparent 1px),linear-gradient(90deg,#409FFF 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-6xl mx-auto px-4 relative animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-brand/80 mb-3 font-body">Найдите нас</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-3">КОНТАКТЫ</h1>
          <p className="text-white/60 font-body">Работаем без выходных, готовы помочь в любое время</p>
        </div>
        <div className="h-0.5 bg-blue-brand mt-8" />
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts */}
          <div className="space-y-3">
            {contacts.map((c, i) => (
              <div key={i} className="card-service flex items-center gap-5 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0 group-hover:bg-blue-brand transition-all">
                  <Icon name={c.icon} size={20} className="text-blue-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body mb-0.5">{c.label}</p>
                  <p className="font-semibold font-heading text-black">{c.value}</p>
                  <p className="text-xs text-muted-foreground font-body">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="h-52 rounded-xl border-2 border-border bg-muted flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <Icon name="MapPin" size={22} className="text-blue-brand" />
              </div>
              <p className="text-sm font-semibold font-heading text-black">Москва, ул. Примерная, 1</p>
              <p className="text-xs font-body">Нажмите, чтобы открыть на карте</p>
            </div>

            {/* Quick form */}
            <div className="bg-white border border-border rounded-xl p-6">
              <p className="font-heading font-bold text-black mb-4">БЫСТРОЕ СООБЩЕНИЕ</p>
              <div className="space-y-3">
                <input type="text" placeholder="Ваше имя"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-background placeholder:text-muted-foreground font-body" />
                <input type="tel" placeholder="Телефон"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-background placeholder:text-muted-foreground font-body" />
                <textarea rows={3} placeholder="Ваш вопрос..."
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors resize-none bg-background placeholder:text-muted-foreground font-body" />
                <button className="btn-blue w-full py-3 text-sm">
                  <Icon name="Send" size={15} />
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
