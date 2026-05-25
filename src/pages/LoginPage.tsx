import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginPageProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    onNavigate("cabinet");
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-4 animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-[hsl(var(--accent))]">●</span> ХАСКИ СЕРВИС
          </span>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "login" ? "Войдите в личный кабинет" : "Создайте аккаунт"}
          </p>
        </div>

        <div className="border border-border rounded overflow-hidden mb-5">
          <div className="flex">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${
                mode === "login" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${
                mode === "register" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Регистрация
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
            />
          )}
          <input
            type="tel"
            placeholder="+7 (999) 000-00-00"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
          />

          {mode === "login" && (
            <div className="text-right">
              <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Забыли пароль?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded font-semibold text-sm hover:bg-foreground/90 transition-colors"
          >
            <Icon name="LogIn" size={15} />
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <button className="text-foreground underline">политикой конфиденциальности</button>
        </p>

        <button
          onClick={() => onNavigate("home")}
          className="w-full mt-4 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
}
