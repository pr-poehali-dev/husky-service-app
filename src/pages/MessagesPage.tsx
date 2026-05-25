import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface MessagesPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

const mockMessages = [
  { id: 1, from: "master", name: "Алексей К.", text: "Добрый день! Приняли ваш холодильник Samsung в работу. Начинаем диагностику.", time: "09:15", date: "Сегодня" },
  { id: 2, from: "master", name: "Алексей К.", text: "Диагностика завершена. Выявили неисправность: засорился капилляр системы охлаждения. Стоимость ремонта — 3 500 ₽, срок 1–2 дня. Подтверждаете?", time: "11:32", date: "Сегодня" },
  { id: 3, from: "client", name: "Вы",          text: "Да, подтверждаю. Когда будет готово?", time: "11:45", date: "Сегодня" },
  { id: 4, from: "master", name: "Алексей К.", text: "Постараемся завтра к 15:00. Как только будет готово — получите push-уведомление.", time: "11:49", date: "Сегодня" },
];

export default function MessagesPage({ isLoggedIn, onLogin }: MessagesPageProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: prev.length + 1, from: "client", name: "Вы",
      text: input.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      date: "Сегодня",
    }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: prev.length + 1, from: "master", name: "Алексей К.",
        text: "Спасибо за сообщение! Отвечу в ближайшее время.",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        date: "Сегодня",
      }]);
    }, 1400);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-sm mx-auto px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
            <Icon name="MessageCircle" size={28} className="text-blue-brand" />
          </div>
          <h2 className="font-heading text-3xl text-black mb-3">ЧАТ С МАСТЕРСКОЙ</h2>
          <p className="text-muted-foreground font-body text-sm mb-8">Войдите, чтобы общаться с мастером напрямую</p>
          <button onClick={onLogin} className="btn-blue w-full text-base py-3.5">Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 h-screen flex flex-col">
      {/* Chat header */}
      <div className="border-b border-border bg-white px-4 shadow-sm">
        <div className="max-w-3xl mx-auto py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-sm font-bold font-heading text-blue-brand">
            АК
          </div>
          <div>
            <p className="font-heading font-bold text-sm text-black">Хаски Сервис — Алексей К.</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
              <span className="status-dot bg-green-500" />
              На связи · Заявка HS-2847
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, idx) => {
            const isClient = msg.from === "client";
            const showDate = idx === 0 || messages[idx - 1].date !== msg.date;
            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-body">{msg.date}</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}
                <div className={`flex ${isClient ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className={`max-w-xs sm:max-w-md flex flex-col gap-1 ${isClient ? "items-end" : "items-start"}`}>
                    {!isClient && <span className="text-xs text-muted-foreground px-1 font-body">{msg.name}</span>}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-body ${
                      isClient
                        ? "bg-blue-brand text-white rounded-br-sm"
                        : "bg-white text-foreground rounded-bl-sm border border-border shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-xs text-muted-foreground px-1 font-body">{msg.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-end gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Написать сообщение..."
            className="flex-1 border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors resize-none bg-background placeholder:text-muted-foreground max-h-32 font-body"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-blue-brand flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-dark transition-colors shrink-0"
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center pb-3 font-body">Enter для отправки · Shift+Enter — новая строка</p>
      </div>
    </div>
  );
}
