import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacts" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Контакты
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-card-gradient border border-border rounded-xl p-8 space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-body">Координатор</p>
              <p className="text-foreground font-body font-medium">
                Земова Диана Игоревна
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Зам. директора МАОУ СОШ №1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-body">Email</p>
              <a href="mailto:school1.pvk@mail.ru" className="text-primary font-body hover:underline">
                school1.pvk@mail.ru
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-body">Телефон</p>
              <a href="tel:+79321197007" className="text-primary font-body hover:underline">
                +7 (932) 119-70-07
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-body">Место проведения</p>
              <p className="text-foreground font-body">
                Свердловская обл., г. Первоуральск, ул. Строителей, 7
              </p>
              <p className="text-xs text-muted-foreground font-body">МАОУ СОШ № 1</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground font-body mt-16"
        >
          © 2026 Всероссийская конференция «Дорога в космос начинается на Земле»
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
