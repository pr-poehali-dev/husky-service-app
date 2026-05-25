import Icon from "@/components/ui/icon";

const contacts = [
  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00", sub: "Пн–Вс, 9:00–20:00" },
  { icon: "Mail", label: "Email", value: "info@husky-service.ru", sub: "Ответим в течение часа" },
  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1", sub: "Вход со стороны двора" },
  { icon: "Clock", label: "Режим работы", value: "9:00 — 20:00", sub: "Без выходных" },
];

export default function ContactsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Найдите нас</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Контакты</h1>
          <p className="text-muted-foreground">Мы работаем без выходных и готовы помочь</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts */}
          <div className="space-y-1">
            {contacts.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 border border-border rounded group hover:bg-secondary transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded flex items-center justify-center border border-border bg-background group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all shrink-0">
                  <Icon name={c.icon} size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                  <p className="font-bold text-sm">{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder + form */}
          <div className="space-y-6">
            {/* Map */}
            <div className="h-56 rounded border border-border bg-secondary flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Icon name="MapPin" size={28} />
              <p className="text-sm font-medium">Москва, ул. Примерная, 1</p>
              <p className="text-xs">Схема проезда на Яндекс.Картах</p>
            </div>

            {/* Quick message */}
            <div className="border border-border rounded p-6">
              <p className="font-bold mb-4">Быстрое сообщение</p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
                />
                <textarea
                  rows={3}
                  placeholder="Ваш вопрос..."
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background placeholder:text-muted-foreground"
                />
                <button className="w-full bg-foreground text-background py-3 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors">
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
