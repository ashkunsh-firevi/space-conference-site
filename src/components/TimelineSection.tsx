import { motion } from "framer-motion";
import { Clock, Send, FileCheck, Presentation, Award } from "lucide-react";

const steps = [
  {
    icon: Send,
    date: "до 23 марта 2026",
    title: "Подача заявки",
    desc: "Отправить заявку, работу, аннотацию и согласие на обработку персональных данных на school1.pvk@mail.ru",
  },
  {
    icon: FileCheck,
    date: "24–25 марта 2026",
    title: "Заочный тур",
    desc: "Жюри оценивает содержательную часть работы (до 60 баллов)",
  },
  {
    icon: Presentation,
    date: "26 марта 2026",
    title: "Очный тур",
    desc: "Выступление с презентацией проекта (до 40 баллов). Доклад — 7 мин., вопросы — 5 мин.",
  },
  {
    icon: Award,
    date: "по итогам",
    title: "Награждение",
    desc: "Победители и призёры награждаются дипломами. Все участники получают сертификаты",
  },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Этапы участия
          </h2>
          <p className="text-muted-foreground font-body flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Участие бесплатное. Индивидуально или командой до 3 человек.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex gap-6 md:gap-8 mb-12 last:mb-0"
            >
              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-card-gradient border border-primary/30 flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="pt-1">
                <span className="text-xs font-display text-primary uppercase tracking-wider">
                  {step.date}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
