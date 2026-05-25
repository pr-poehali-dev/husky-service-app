import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

const deviceTypes = ["Холодильник", "Стиральная машина", "Посудомоечная машина", "Кондиционер", "Морозилка /ларь", "Сушильная машина", "Водонагреватель", "Другая техника"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ device: "", problem: "", name: "", phone: "", date: "", time: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const canProceed1 = form.device && form.problem;
  const canProceed2 = form.name && form.phone && form.date && form.time;

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-blue-brand flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={36} className="text-white" />
          </div>
          <h2 className="font-heading text-4xl text-black mb-3">ЗАЯВКА ПРИНЯТА!</h2>
          <p className="text-muted-foreground font-body mb-2">
            Перезвоним на <strong>{form.phone}</strong> для подтверждения.
          </p>
          <p className="text-sm text-muted-foreground font-body mb-8">
            Дата: <strong>{form.date} в {form.time}</strong>
          </p>
          <div className="bg-black rounded-xl p-4 mb-6 text-left flex items-start gap-3">
            <Icon name="Bell" size={18} className="text-blue-brand mt-0.5 shrink-0" />
            <p className="text-white/70 text-sm font-body">
              Вы будете получать <span className="text-blue-brand font-semibold">push-уведомления</span> о ходе ремонта — войдите в личный кабинет, чтобы следить онлайн.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("cabinet")} className="btn-blue py-3 px-6">
              <Icon name="User" size={15} />
              Личный кабинет
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ device: "", problem: "", name: "", phone: "", date: "", time: "", comment: "" }); }}
              className="btn-outline py-3 px-6"
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
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#409FFF 1px,transparent 1px),linear-gradient(90deg,#409FFF 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-2xl mx-auto px-4 relative animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-brand/80 mb-3 font-body">Онлайн запись</p>
          <h1 className="font-heading text-5xl text-white">ЗАПИСЬ НА РЕМОНТ</h1>
        </div>
        <div className="h-0.5 bg-blue-brand mt-8" />
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-heading border-2 transition-all ${
                step > s  ? "bg-blue-brand border-blue-brand text-white" :
                step === s ? "bg-black border-black text-white" :
                             "border-border text-muted-foreground bg-white"
              }`}>
                {step > s ? <Icon name="Check" size={14} /> : s}
              </div>
              <span className={`text-xs font-semibold ml-2 hidden sm:block font-heading ${step >= s ? "text-black" : "text-muted-foreground"}`}>
                {s === 1 ? "Устройство" : s === 2 ? "Дата и время" : "Подтверждение"}
              </span>
              {s < 3 && <div className={`h-0.5 w-8 mx-3 rounded-full ${step > s ? "bg-blue-brand" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <label className="block text-sm font-bold font-heading text-black mb-3">Тип техники</label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                {deviceTypes.map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm({ ...form, device: d })}
                    className={`p-3.5 rounded-xl border-2 text-sm font-semibold font-heading text-left transition-all ${
                      form.device === d
                        ? "border-blue-brand bg-blue-brand text-white"
                        : "border-border hover:border-blue-brand text-foreground bg-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold font-heading text-black mb-2">Опишите неисправность</label>
              <textarea
                rows={4}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                placeholder="Например: не морозит, появился лёд на задней стенке, шумит..."
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors resize-none bg-white placeholder:text-muted-foreground font-body"
              />
            </div>
            <button onClick={() => setStep(2)} disabled={!canProceed1} className="btn-blue w-full text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed">
              Далее <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold font-heading text-black mb-2">Ваше имя</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Иванов"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white placeholder:text-muted-foreground font-body" />
              </div>
              <div>
                <label className="block text-sm font-bold font-heading text-black mb-2">Телефон</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (999) 000-00-00"
                  className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white placeholder:text-muted-foreground font-body" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold font-heading text-black mb-2">Дата визита мастера</label>
              <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors bg-white font-body" />
            </div>
            <div>
              <label className="block text-sm font-bold font-heading text-black mb-3">Удобное время</label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map((t) => (
                  <button key={t} onClick={() => setForm({ ...form, time: t })}
                    className={`py-2.5 rounded-xl border-2 text-sm font-semibold font-heading transition-all ${
                      form.time === t ? "border-blue-brand bg-blue-brand text-white" : "border-border hover:border-blue-brand bg-white"
                    }`}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border-2 border-border py-3.5 rounded-xl font-semibold font-heading text-sm hover:border-black transition-colors bg-white">Назад</button>
              <button onClick={() => setStep(3)} disabled={!canProceed2} className="btn-blue flex-[2] py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
                Далее <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <div className="bg-white border-2 border-border rounded-xl p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 font-heading">Ваша заявка</p>
              {[
                { label: "Техника",  value: form.device },
                { label: "Проблема", value: form.problem },
                { label: "Имя",      value: form.name },
                { label: "Телефон",  value: form.phone },
                { label: "Дата",     value: `${form.date} в ${form.time}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 text-sm py-2.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground font-body shrink-0">{label}</span>
                  <span className="font-semibold font-heading text-right text-black">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-bold font-heading text-black mb-2">Комментарий (необязательно)</label>
              <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Дополнительные пожелания..."
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-brand transition-colors resize-none bg-white placeholder:text-muted-foreground font-body" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border-2 border-border py-3.5 rounded-xl font-semibold font-heading text-sm hover:border-black transition-colors bg-white">Назад</button>
              <button onClick={() => setSubmitted(true)} className="btn-blue flex-[2] py-3.5 text-base">
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
