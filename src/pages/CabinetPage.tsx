import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CabinetPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  waiting: { label: "Ожидает приёма", color: "text-muted-foreground", dot: "bg-muted-foreground" },
  diagnosis: { label: "Диагностика", color: "text-blue-600", dot: "bg-blue-500" },
  repair: { label: "В ремонте", color: "text-amber-600", dot: "bg-amber-500" },
  ready: { label: "Готово к выдаче", color: "text-green-600", dot: "bg-green-500" },
  done: { label: "Выдано", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const mockOrders = [
  {
    id: "HS-2847",
    device: "MacBook Pro 14",
    problem: "Не включается",
    status: "repair",
    date: "20 мая 2024",
    master: "Алексей К.",
    price: "от 3 500 ₽",
    updated: "Сегодня, 11:30",
    timeline: [
      { status: "waiting", label: "Принят в работу", time: "20 мая, 09:00", done: true },
      { status: "diagnosis", label: "Диагностика", time: "20 мая, 11:00", done: true },
      { status: "repair", label: "Ремонт", time: "20 мая, 14:00", done: true },
      { status: "ready", label: "Готово", time: "—", done: false },
    ],
  },
  {
    id: "HS-2801",
    device: "iPhone 13",
    problem: "Разбит экран",
    status: "done",
    date: "10 мая 2024",
    master: "Дмитрий М.",
    price: "4 200 ₽",
    updated: "12 мая, 16:00",
    timeline: [],
  },
];

export default function CabinetPage({ onNavigate, isLoggedIn, onLogin }: CabinetPageProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [expanded, setExpanded] = useState<string | null>("HS-2847");

  if (!isLoggedIn) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 border border-border">
            <Icon name="User" size={28} />
          </div>
          <h2 className="text-2xl font-black mb-3">Личный кабинет</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Войдите, чтобы видеть статус ваших заявок, историю ремонтов и переписку с мастерской
          </p>
          <button
            onClick={onLogin}
            className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors"
          >
            Войти в кабинет
          </button>
          <p className="text-xs text-muted-foreground mt-4">
            Нет аккаунта?{" "}
            <button onClick={onLogin} className="text-foreground font-medium underline">
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Добро пожаловать</p>
            <h1 className="text-3xl font-black tracking-tight">Иван Иванов</h1>
          </div>
          <button
            onClick={() => onNavigate("booking")}
            className="hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors"
          >
            <Icon name="Plus" size={15} />
            Новая заявка
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-8">
          {[
            { id: "orders", label: "Мои заявки", icon: "ClipboardList" },
            { id: "profile", label: "Профиль", icon: "User" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "orders" | "profile")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="space-y-3 animate-fade-in">
            {mockOrders.map((order) => {
              const st = statusConfig[order.status];
              const isExpanded = expanded === order.id;
              return (
                <div key={order.id} className="border border-border rounded overflow-hidden">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : order.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-secondary transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm">{order.device}</span>
                          <span className="text-xs text-muted-foreground font-mono">{order.id}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={`status-dot ${st.dot}`} />
                          <span className={`font-medium ${st.color}`}>{st.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold">{order.price}</div>
                        <div className="text-xs text-muted-foreground">{order.date}</div>
                      </div>
                      <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border bg-secondary/30 animate-fade-in">
                      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        {[
                          { label: "Проблема", value: order.problem },
                          { label: "Мастер", value: order.master },
                          { label: "Последнее обновление", value: order.updated },
                          { label: "Стоимость", value: order.price },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                            <p className="text-sm font-medium">{value}</p>
                          </div>
                        ))}
                      </div>

                      {order.timeline.length > 0 && (
                        <div className="mb-5">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Этапы ремонта</p>
                          <div className="flex items-center gap-0">
                            {order.timeline.map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${step.done ? "bg-foreground border-foreground text-background" : "border-border text-muted-foreground"}`}>
                                    {step.done ? <Icon name="Check" size={10} /> : idx + 1}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1 text-center max-w-16">{step.label}</p>
                                </div>
                                {idx < order.timeline.length - 1 && (
                                  <div className={`h-px w-8 mb-5 ${step.done && order.timeline[idx + 1].done ? "bg-foreground" : "bg-border"}`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => onNavigate("messages")}
                        className="inline-flex items-center gap-2 border border-border rounded px-4 py-2 text-sm font-medium hover:border-foreground transition-colors"
                      >
                        <Icon name="MessageCircle" size={15} />
                        Написать мастеру
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => onNavigate("booking")}
              className="sm:hidden w-full mt-2 inline-flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded font-semibold text-sm"
            >
              <Icon name="Plus" size={15} />
              Новая заявка
            </button>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="max-w-md animate-fade-in space-y-4">
            {[
              { label: "Имя", value: "Иван Иванов", type: "text" },
              { label: "Телефон", value: "+7 (999) 123-45-67", type: "tel" },
              { label: "Email", value: "ivan@example.com", type: "email" },
            ].map(({ label, value, type }) => (
              <div key={label}>
                <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">{label}</label>
                <input
                  type={type}
                  defaultValue={value}
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background"
                />
              </div>
            ))}
            <div className="pt-2 flex gap-3">
              <button className="flex-1 bg-foreground text-background py-3 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors">
                Сохранить
              </button>
              <button className="border border-border py-3 px-4 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
