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
    <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-sm mx-auto px-4 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-3">
            <img
              src="https://cdn.poehali.dev/projects/98752a69-fc99-41c4-ae69-26c3cb674be9/bucket/0783289f-947e-412c-9f1b-1718928a91aa.jpg"
              alt="Husky Service"
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground font-body text-sm">
            {mode === "login" ? "Войдите в личный кабинет" : "Создайте аккаунт бесплатно"}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl overflow-hidden border-2 border-border mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-sm font-semibold font-heading transition-all ${
              mode === "login" ? "bg-black text-white" : "text-muted-foreground hover:text-foreground bg-white"
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 text-sm font-semibold font-heading transition-all ${
              mode === "register" ? "bg-black text-white" : "text-muted-foreground hover:text-foreground bg-white"
            }`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <input type="text" placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white placeholder:text-muted-foreground font-body" />
          )}
          <input type="tel" placeholder="+7 (999) 000-00-00" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white placeholder:text-muted-foreground font-body" />
          <input type="password" placeholder="Пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white placeholder:text-muted-foreground font-body" />

          {mode === "login" && (
            <div className="text-right">
              <button type="button" className="text-xs text-muted-foreground hover:text-blue-brand transition-colors font-body">
                Забыли пароль?
              </button>
            </div>
          )}

          {/* Push notifications promo */}
          <div className="bg-black rounded-xl p-3.5 flex items-start gap-3">
            <Icon name="Bell" size={16} className="text-blue-brand mt-0.5 shrink-0" />
            <p className="text-white/70 text-xs font-body leading-relaxed">
              После входа вы будете получать <span className="text-blue-brand">push-уведомления</span> о ходе ремонта вашей техники
            </p>
          </div>

          <button type="submit" className="btn-blue w-full text-base py-3.5">
            <Icon name="LogIn" size={16} />
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-5 font-body">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <button className="text-blue-brand hover:underline">политикой конфиденциальности</button>
        </p>

        <button onClick={() => onNavigate("home")} className="w-full mt-4 text-center text-sm text-muted-foreground hover:text-blue-brand transition-colors font-body">
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
}