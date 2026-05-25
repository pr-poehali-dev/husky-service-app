import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface MessagesPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

const mockMessages = [
  {
    id: 1,
    from: "master",
    name: "Алексей К.",
    text: "Добрый день! Мы приняли ваш MacBook Pro 14 в работу. Проводим первичную диагностику.",
    time: "09:15",
    date: "Сегодня",
  },
  {
    id: 2,
    from: "master",
    name: "Алексей К.",
    text: "Диагностика завершена. Проблема — окислились контакты на плате питания. Стоимость ремонта составит 3 500 ₽, срок — 1–2 дня. Подтверждаете?",
    time: "11:32",
    date: "Сегодня",
  },
  {
    id: 3,
    from: "client",
    name: "Вы",
    text: "Да, подтверждаю. Когда будет готово?",
    time: "11:45",
    date: "Сегодня",
  },
  {
    id: 4,
    from: "master",
    name: "Алексей К.",
    text: "Постараемся завтра к 15:00. Как только будет готово — пришлём уведомление.",
    time: "11:48",
    date: "Сегодня",
  },
];

export default function MessagesPage({ isLoggedIn, onLogin }: MessagesPageProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        from: "client",
        name: "Вы",
        text: input.trim(),
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        date: "Сегодня",
      },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "master",
          name: "Алексей К.",
          text: "Спасибо за сообщение! Мы ответим в ближайшее время.",
          time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
          date: "Сегодня",
        },
      ]);
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 border border-border">
            <Icon name="MessageCircle" size={28} />
          </div>
          <h2 className="text-2xl font-black mb-3">Чат с мастерской</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Войдите в личный кабинет, чтобы общаться с мастерами напрямую
          </p>
          <button
            onClick={onLogin}
            className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded font-semibold text-sm"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background px-4">
        <div className="max-w-3xl mx-auto py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
            АК
          </div>
          <div>
            <p className="font-bold text-sm">Хаски Сервис</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="status-dot bg-green-500" />
              На связи · Заявка HS-2847
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Мастер</p>
              <p className="text-sm font-semibold">Алексей К.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, idx) => {
            const isClient = msg.from === "client";
            const showDate = idx === 0 || messages[idx - 1].date !== msg.date;

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-medium">{msg.date}</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}
                <div className={`flex ${isClient ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className={`max-w-xs sm:max-w-md ${isClient ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    {!isClient && (
                      <span className="text-xs text-muted-foreground px-1">{msg.name}</span>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isClient
                          ? "bg-foreground text-background rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm border border-border"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-end gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Написать сообщение..."
            className="flex-1 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background placeholder:text-muted-foreground max-h-32"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors shrink-0"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center pb-3">Enter для отправки · Shift+Enter для новой строки</p>
      </div>
    </div>
  );
}
