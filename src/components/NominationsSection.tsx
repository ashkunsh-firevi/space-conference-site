import { motion } from "framer-motion";
import { Atom, Brain, Palette } from "lucide-react";

const nominations = [
  {
    icon: Atom,
    title: "КОСМОС",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    sections: [
      "Естественнонаучная секция (химия, биология, экология, география)",
      "Физико-математическая секция (математика, физика, астрономия, информатика)",
      "Прикладные модели космических аппаратов",
      "Инженерия космических систем",
    ],
  },
  {
    icon: Brain,
    title: "ИНТЕЛЛЕКТ",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    sections: [
      "Инноватика и креативные проекты",
      "Гуманитарная секция (история, литература, языки)",
      "Социально-экономическая секция (экономика, социология, право и космос)",
    ],
  },
  {
    icon: Palette,
    title: "ТВОРЧЕСТВО",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    sections: [
      "Номинация «Живопись» — гуашь, темпера, акварель",
      "Номинация «Графика» — печатные техники",
      "Размер работ не более формата А2",
    ],
  },
];

const NominationsSection = () => {
  return (
    <section id="nominations" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Номинации
          </h2>
          <p className="text-muted-foreground font-body">
            Три направления для участия в конференции
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {nominations.map((nom, i) => (
            <motion.div
              key={nom.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`bg-card-gradient border ${nom.borderColor} rounded-xl p-8 hover:scale-[1.02] transition-transform`}
            >
              <div className={`w-14 h-14 rounded-xl ${nom.bgColor} flex items-center justify-center mb-6`}>
                <nom.icon className={`w-7 h-7 ${nom.color}`} />
              </div>
              <h3 className={`font-display text-2xl font-bold ${nom.color} mb-6`}>
                {nom.title}
              </h3>
              <ul className="space-y-3">
                {nom.sections.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${nom.bgColor} shrink-0`} />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NominationsSection;
