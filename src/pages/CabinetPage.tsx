import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CabinetPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const statusConfig: Record<string, { label: string; color: string; dot: string; bg: string }> = {
  waiting:   { label: "Ожидает приёма",   color: "text-muted-foreground", dot: "bg-gray-400",   bg: "bg-gray-100" },
  diagnosis: { label: "Диагностика",       color: "text-blue-brand",       dot: "bg-blue-brand", bg: "bg-blue-50" },
  repair:    { label: "В ремонте",         color: "text-yellow-600",        dot: "bg-yellow-500", bg: "bg-yellow-50" },
  ready:     { label: "Готово к выдаче",   color: "text-green-600",         dot: "bg-green-500",  bg: "bg-green-50" },
  done:      { label: "Выдано",            color: "text-muted-foreground", dot: "bg-gray-300",   bg: "bg-gray-50" },
};

const mockNotifications = [
  { id: 1, icon: "Search",      text: "Диагностика завершена по заявке HS-2847",   sub: "Выявлена неисправность платы питания",   time: "Сегодня, 11:30", read: false },
  { id: 2, icon: "Wrench",      text: "Ремонт начат",                              sub: "Заявка HS-2847 · MacBook Pro 14",          time: "Сегодня, 14:00", read: false },
  { id: 3, icon: "CheckCircle", text: "Заявка HS-2801 выдана клиенту",            sub: "iPhone 13 · Ремонт экрана",                time: "12 мая, 16:00",  read: true },
];

const mockOrders = [
  {
    id: "HS-2847",
    device: "Холодильник Samsung RB37",
    problem: "Не морозит, появился лёд на задней стенке",
    status: "repair",
    date: "20 мая 2024",
    master: "Алексей К.",
    price: "от 3 500 ₽",
    updated: "Сегодня, 14:00",
    timeline: [
      { label: "Принят",      done: true,  time: "09:00" },
      { label: "Диагностика", done: true,  time: "11:30" },
      { label: "Ремонт",      done: true,  time: "14:00" },
      { label: "Готово",      done: false, time: "—" },
    ],
  },
  {
    id: "HS-2801",
    device: "Стиральная машина Bosch WAN24161",
    problem: "Не сливает воду, выдаёт ошибку E18",
    status: "done",
    date: "10 мая 2024",
    master: "Дмитрий М.",
    price: "2 200 ₽",
    updated: "12 мая, 15:30",
    timeline: [],
  },
];

export default function CabinetPage({ onNavigate, isLoggedIn, onLogin }: CabinetPageProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "notifications" | "profile">("orders");
  const [expanded, setExpanded] = useState<string | null>("HS-2847");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  if (!isLoggedIn) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center max-w-sm mx-auto px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
            <Icon name="User" size={28} className="text-blue-brand" />
          </div>
          <h2 className="font-heading text-3xl text-black mb-3">ЛИЧНЫЙ КАБИНЕТ</h2>
          <p className="text-muted-foreground font-body text-sm mb-8">
            Войдите, чтобы отслеживать статус ремонта, получать push-уведомления и общаться с мастером
          </p>
          <button onClick={onLogin} className="btn-blue w-full text-base py-3.5">
            Войти в кабинет
          </button>
          <button onClick={onLogin} className="mt-3 text-sm text-muted-foreground hover:text-blue-brand transition-colors font-body">
            Нет аккаунта? <span className="text-blue-brand underline">Зарегистрироваться</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-brand/80 mb-2 font-body">Личный кабинет</p>
          <h1 className="font-heading text-4xl text-white">ИВАН ИВАНОВ</h1>
          <p className="text-white/50 font-body text-sm mt-1">+7 (999) 123-45-67 · ivan@example.com</p>
        </div>
        <div className="h-0.5 bg-blue-brand" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-8 bg-white rounded-t-xl overflow-hidden">
          {[
            { id: "orders",        label: "Мои заявки",     icon: "ClipboardList", badge: 0 },
            { id: "notifications", label: "Уведомления",    icon: "Bell",          badge: unreadCount },
            { id: "profile",       label: "Профиль",        icon: "User",          badge: 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "orders" | "notifications" | "profile")}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold font-heading border-b-2 transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? "border-blue-brand text-blue-brand bg-blue-brand/5"
                  : "border-transparent text-muted-foreground hover:text-foreground bg-white"
              }`}
            >
              <Icon name={tab.icon} size={15} />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-blue-brand text-white text-[10px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {activeTab === "orders" && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <p className="font-heading text-lg text-black">АКТИВНЫЕ ЗАЯВКИ</p>
              <button onClick={() => onNavigate("booking")} className="btn-blue text-sm py-2 px-4">
                <Icon name="Plus" size={14} />
                Новая заявка
              </button>
            </div>

            {mockOrders.map((order) => {
              const st = statusConfig[order.status];
              const isExpanded = expanded === order.id;
              return (
                <div key={order.id} className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : order.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${st.bg} flex items-center justify-center shrink-0`}>
                        <Icon name="Wrench" size={16} className={st.color} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-semibold font-heading text-sm text-black">{order.device}</span>
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{order.id}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={`status-dot ${st.dot}`} />
                          <span className={`font-semibold font-body ${st.color}`}>{st.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="font-heading text-base text-blue-brand">{order.price}</div>
                        <div className="text-xs text-muted-foreground font-body">{order.date}</div>
                      </div>
                      <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border animate-fade-in">
                      <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                        {[
                          { label: "Проблема",    value: order.problem },
                          { label: "Мастер",      value: order.master },
                          { label: "Обновление",  value: order.updated },
                          { label: "Стоимость",   value: order.price },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs text-muted-foreground font-body mb-0.5">{label}</p>
                            <p className="text-sm font-semibold font-heading text-black">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Timeline */}
                      {order.timeline.length > 0 && (
                        <div className="mb-5">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 font-body">Этапы ремонта</p>
                          <div className="flex items-center">
                            {order.timeline.map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex flex-col items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-all ${
                                    step.done
                                      ? "bg-blue-brand border-blue-brand text-white"
                                      : "border-border text-muted-foreground bg-white"
                                  }`}>
                                    {step.done ? <Icon name="Check" size={12} /> : idx + 1}
                                  </div>
                                  <p className="text-[10px] text-muted-foreground mt-1.5 font-body text-center w-16">{step.label}</p>
                                  <p className="text-[10px] text-blue-brand font-semibold font-body">{step.time}</p>
                                </div>
                                {idx < order.timeline.length - 1 && (
                                  <div className={`h-0.5 w-10 mb-8 mx-1 rounded-full ${
                                    step.done && order.timeline[idx + 1]?.done ? "bg-blue-brand" : "bg-border"
                                  }`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => onNavigate("messages")}
                        className="btn-outline text-sm py-2.5 px-5"
                      >
                        <Icon name="MessageCircle" size={15} />
                        Написать мастеру
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Notifications tab */}
        {activeTab === "notifications" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <p className="font-heading text-lg text-black">PUSH-УВЕДОМЛЕНИЯ</p>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-sm text-blue-brand hover:underline font-body">
                  Прочитать все
                </button>
              )}
            </div>

            {/* Info block */}
            <div className="bg-black rounded-xl p-5 mb-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-brand/20 flex items-center justify-center shrink-0">
                <Icon name="Bell" size={18} className="text-blue-brand" />
              </div>
              <div>
                <p className="font-heading text-white text-sm mb-1">КАК РАБОТАЮТ УВЕДОМЛЕНИЯ</p>
                <p className="text-white/60 text-xs font-body leading-relaxed">
                  Мы отправляем уведомление на каждом этапе ремонта: при приёме, начале диагностики, в ходе ремонта и когда техника готова к выдаче.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  className={`bg-white rounded-xl border p-4 flex items-start gap-4 cursor-pointer transition-all ${
                    n.read ? "border-border opacity-60" : "border-blue-brand shadow-sm shadow-blue-brand/10"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${n.read ? "bg-muted" : "bg-blue-brand"}`}>
                    <Icon name={n.icon} size={16} fallback="Bell" className={n.read ? "text-muted-foreground" : "text-white"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold font-heading ${n.read ? "text-muted-foreground" : "text-black"}`}>{n.text}</p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">{n.sub}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs text-muted-foreground font-body">{n.time}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-brand" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile tab */}
        {activeTab === "profile" && (
          <div className="max-w-md animate-fade-in">
            <p className="font-heading text-lg text-black mb-5">МОЙ ПРОФИЛЬ</p>
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              {[
                { label: "Имя",    value: "Иван Иванов",          type: "text" },
                { label: "Телефон", value: "+7 (999) 123-45-67",  type: "tel" },
                { label: "Email",   value: "ivan@example.com",     type: "email" },
              ].map(({ label, value, type }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 font-heading">{label}</label>
                  <input
                    type={type}
                    defaultValue={value}
                    className="w-full border-2 border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-background font-body"
                  />
                </div>
              ))}
              <div className="pt-2 flex gap-3">
                <button className="btn-blue flex-1 py-3 text-sm">Сохранить</button>
                <button className="border-2 border-border py-3 px-4 rounded-lg text-sm font-semibold font-heading text-muted-foreground hover:border-black hover:text-black transition-colors">
                  Выйти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
