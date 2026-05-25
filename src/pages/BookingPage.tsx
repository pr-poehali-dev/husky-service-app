import { useState } from "react";
import Icon from "@/components/ui/icon";

const deviceTypes = ["Ноутбук", "Телефон", "Планшет", "ПК / Mac", "Бытовая техника", "Другое"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    device: "",
    problem: "",
    name: "",
    phone: "",
    date: "",
    time: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canProceed1 = form.device && form.problem;
  const canProceed2 = form.name && form.phone && form.date && form.time;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={28} />
          </div>
          <h2 className="text-2xl font-black mb-3">Заявка принята!</h2>
          <p className="text-muted-foreground mb-2">
            Мы перезвоним вам на номер <strong>{form.phone}</strong> для подтверждения.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Дата визита: <strong>{form.date} в {form.time}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("cabinet")}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3 rounded font-semibold text-sm"
            >
              <Icon name="User" size={15} />
              Личный кабинет
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ device: "", problem: "", name: "", phone: "", date: "", time: "", comment: "" }); }}
              className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 rounded font-semibold text-sm hover:border-foreground transition-colors"
            >
              Новая заявка
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="mb-10 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Онлайн запись</p>
          <h1 className="text-4xl font-black tracking-tight">Запись на ремонт</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  step >= s
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {step > s ? <Icon name="Check" size={12} /> : s}
              </div>
              <div className="text-xs text-muted-foreground ml-2 mr-6 hidden sm:block">
                {s === 1 ? "Устройство" : s === 2 ? "Дата и время" : "Подтверждение"}
              </div>
              {s < 3 && <div className={`h-px w-8 mr-2 ${step > s ? "bg-foreground" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Тип устройства</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {deviceTypes.map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm({ ...form, device: d })}
                    className={`p-3 rounded border text-sm font-medium text-left transition-all ${
                      form.device === d
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Опишите проблему</label>
              <textarea
                rows={4}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                placeholder="Например: не включается, разбит экран, залили водой..."
                className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background placeholder:text-muted-foreground"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceed1}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors"
            >
              Далее
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Телефон</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Дата визита</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Удобное время</label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, time: t })}
                    className={`py-2 rounded border text-sm font-medium transition-all ${
                      form.time === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-border py-3.5 rounded font-semibold text-sm hover:border-foreground transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceed2}
                className="flex-[2] inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors"
              >
                Далее
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <div className="border border-border rounded p-5 space-y-3">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Ваша заявка</p>
              {[
                { label: "Устройство", value: form.device },
                { label: "Проблема", value: form.problem },
                { label: "Имя", value: form.name },
                { label: "Телефон", value: form.phone },
                { label: "Дата", value: `${form.date} в ${form.time}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 text-sm py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Дополнительный комментарий (необязательно)</label>
              <textarea
                rows={3}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Любые дополнительные пожелания..."
                className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-border py-3.5 rounded font-semibold text-sm hover:border-foreground transition-colors"
              >
                Назад
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] inline-flex items-center justify-center gap-2 bg-[hsl(var(--accent))] text-white py-3.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Icon name="Check" size={16} />
                Подтвердить запись
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
