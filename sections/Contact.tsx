'use client'

import { motion } from "motion/react";
import { Linkedin, Instagram, Github, Mail, ArrowUpRight, Facebook } from "lucide-react";
import { Particles } from "../components/Particles";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/irgi-adit-pratama/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn"  },
  { href: "https://github.com/irgiadit7",                   icon: <Github    className="w-5 h-5" />, label: "GitHub"    },
  { href: "https://www.facebook.com/profile.php?id=61583691564375", icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
  { href: "https://www.instagram.com/_iaprtma",             icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative flex items-center justify-center c-space section-spacing min-h-screen overflow-hidden"
    >
      <Particles className="absolute inset-0 -z-10" quantity={120} ease={80} color="#ffffff" refresh />

      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div
          className="w-full max-w-[40rem] aspect-square rounded-full"
          style={{ background: "radial-gradient(circle, rgba(92,51,204,0.12) 0%, transparent 65%)" }}
        />
      </div>

      <div className="w-full max-w-2xl text-center space-y-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-white/40 text-sm font-semibold uppercase tracking-widest">
            Get in touch
          </p>
          <h2 className="text-heading leading-tight">
            Let&apos;s create<br />
            <span style={{
              background: "linear-gradient(90deg, #7a57db, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              something great
            </span>
          </h2>
          <p className="text-neutral-400 text-base max-w-md mx-auto leading-relaxed">
            Have a product idea, a partnership in mind, or just want to connect?
            The inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <a
            href="mailto:support@solvinme.com"
            className="group inline-flex items-center gap-2 px-5 py-4 md:px-8 rounded-2xl text-white font-semibold text-sm md:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl max-w-full"
            style={{
              background: "radial-gradient(circle at 40% 40%, #7a57db, #5c33cc)",
              boxShadow: "0 0 40px rgba(92,51,204,0.35)",
              wordBreak: "break-all",
            }}
          >
            <Mail className="w-5 h-5 shrink-0" />
            <span>support@solvinme.com</span>
            <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-4 justify-center"
        >
          <div className="h-px w-16 bg-white/10" />
          <span className="text-white/30 text-xs uppercase tracking-widest">or find me on</span>
          <div className="h-px w-16 bg-white/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;