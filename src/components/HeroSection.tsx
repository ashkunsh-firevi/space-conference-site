import { motion } from "framer-motion";
import spaceHero from "@/assets/space-hero.jpg";
import { Rocket, Calendar, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={spaceHero}
          alt="Космическое пространство"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-body tracking-wide">
            <Rocket className="w-4 h-4" />
            К 65-летию полёта Ю.А. Гагарина
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Дорога в космос</span>
          <br />
          <span className="text-gradient">начинается на Земле</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          Всероссийская научно-практическая конференция для школьников, студентов
          и всех, кто увлечён космосом
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-body">26 марта 2026 г.</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-body">г. Первоуральск, Свердловская обл.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-display text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            Узнать подробнее
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
