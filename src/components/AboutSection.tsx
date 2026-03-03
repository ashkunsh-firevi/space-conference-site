import { motion } from "framer-motion";
import { Target, BookOpen, Users, Lightbulb } from "lucide-react";

const AboutSection = () => {
  const goals = [
    {
      icon: Target,
      title: "Цель",
      text: "Формирование научного мировоззрения через вовлечение в исследовательскую и проектную деятельность по космической проблематике",
    },
    {
      icon: BookOpen,
      title: "Исследования",
      text: "Стимулирование к проведению исследований и разработке проектов, объединённых космической тематикой",
    },
    {
      icon: Users,
      title: "Участники",
      text: "Школьники, студенты колледжей, техникумов и ВУЗов, а также все заинтересованные лица (18+)",
    },
    {
      icon: Lightbulb,
      title: "Форматы",
      text: "Очное и заочное участие, видеопрезентация проекта или онлайн-формат",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            О конференции
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            Конференция организуется для популяризации темы освоения космоса,
            достижений отечественной космонавтики, развития космических технологий
            и привлечения внимания к научно-техническому творчеству.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card-gradient border border-border rounded-xl p-6 hover:border-primary/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <g.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {g.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {g.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Organizers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card-gradient border border-border rounded-xl p-8"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">
            Организаторы
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground font-body">
            <p>• ГК «Роскосмос»</p>
            <p>• АНО «Корпоративная академия Роскосмоса»</p>
            <p>• Фонд «Золотое сечение»</p>
            <p>• ГАУК СО «Инновационный культурный центр»</p>
            <p>• Евразийский фонд «Строганофф»</p>
            <p>• НПЦ «Планетарий. Екатеринбург»</p>
            <p>• Администрация МО Первоуральск</p>
            <p>• МАОУ СОШ № 1 г. Первоуральска</p>
            <p>• Детский технопарк «Кванториум. г. Первоуральск»</p>
            <p>• МБОУ ДО «ПДХШ»</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
