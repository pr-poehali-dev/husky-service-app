import { useState } from "react";
import Icon from "@/components/ui/icon";

const deviceTypes = ["Ноутбук", "Телефон", "Планшет", "ПК / Mac", "Бытовая техника", "Другое"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ device: "", problem: "", name: "", phone: "", date: "", time: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const canProceed1 = form.device && form.problem;
  const canProceed2 = form.name && form.phone && form.date && form.time;

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={36} className="text-white" />
          </div>
          <h2 className="font-display text-4xl text-navy mb-3">ЗАЯВКА ПРИНЯТА!</h2>
          <p className="text-muted-foreground mb-2">
            Перезвоним на <strong>{form.phone}</strong> для подтверждения.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Дата: <strong>{form.date} в {form.time}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("cabinet")} className="btn-navy py-3 px-6">
              <Icon name="User" size={15} />
              Личный кабинет
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ device: "", problem: "", name: "", phone: "", date: "", time: "", comment: "" }); }}
              className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy py-3 px-6 rounded-lg font-semibold text-sm hover:bg-navy hover:text-white transition-all"
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
      {/* Header */}
      <section className="bg-hero-gradient text-white py-14">
        <div className="max-w-2xl mx-auto px-4 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-brand/80 mb-3">Онлайн запись</p>
          <h1 className="font-display text-5xl text-white">ЗАПИСЬ НА РЕМОНТ</h1>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step > s  ? "bg-navy border-navy text-white" :
                step === s ? "bg-orange-500 border-orange-500 text-white" :
                             "border-brand-gray text-muted-foreground"
              }`}>
                {step > s ? <Icon name="Check" size={14} /> : s}
              </div>
              <span className={`text-xs font-semibold ml-2 hidden sm:block ${step >= s ? "text-navy" : "text-muted-foreground"}`}>
                {s === 1 ? "Устройство" : s === 2 ? "Дата и время" : "Подтверждение"}
              </span>
              {s < 3 && <div className={`h-0.5 w-8 mx-3 rounded-full ${step > s ? "bg-navy" : "bg-brand-gray"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <label className="block text-sm font-bold text-navy mb-3">Тип устройства</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {deviceTypes.map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm({ ...form, device: d })}
                    className={`p-3.5 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                      form.device === d
                        ? "border-navy bg-navy text-white"
                        : "border-border hover:border-navy text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Опишите проблему</label>
              <textarea
                rows={4}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                placeholder="Например: не включается, разбит экран, залили водой..."
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-navy transition-colors resize-none bg-background placeholder:text-muted-foreground"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!canProceed1}
              className="btn-orange w-full text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Далее <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Ваше имя</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Иванов"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-background placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Телефон</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (999) 000-00-00"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-background placeholder:text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Дата визита</label>
              <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-background" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-3">Удобное время</label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map((t) => (
                  <button key={t} onClick={() => setForm({ ...form, time: t })}
                    className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      form.time === t ? "border-orange-500 bg-orange-500 text-white" : "border-border hover:border-navy"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border-2 border-border py-3.5 rounded-xl font-semibold text-sm hover:border-navy transition-colors">Назад</button>
              <button onClick={() => setStep(3)} disabled={!canProceed2} className="btn-orange flex-[2] py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
                Далее <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <div className="border-2 border-border rounded-xl p-5 bg-muted/40">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Ваша заявка</p>
              {[
                { label: "Устройство", value: form.device },
                { label: "Проблема",   value: form.problem },
                { label: "Имя",        value: form.name },
                { label: "Телефон",    value: form.phone },
                { label: "Дата",       value: `${form.date} в ${form.time}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 text-sm py-2.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className="font-semibold text-right text-navy">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Комментарий (необязательно)</label>
              <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Дополнительные пожелания..."
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-navy transition-colors resize-none bg-background placeholder:text-muted-foreground" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border-2 border-border py-3.5 rounded-xl font-semibold text-sm hover:border-navy transition-colors">Назад</button>
              <button onClick={() => setSubmitted(true)} className="btn-orange flex-[2] py-3.5 text-base">
                <Icon name="Check" size={18} />
                Подтвердить запись
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
