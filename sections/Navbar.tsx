'use client'

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

function Navigation({ onClose }: { onClose?: () => void }) {
  return (
    <ul className="nav-ul">
      {[
        { href: "#home",    label: "Home"    },
        { href: "#about",   label: "About"   },
        { href: "#work",    label: "Work"    },
        { href: "#contact", label: "Contact" },
      ].map((item) => (
        <li key={item.href} className="nav-li">
          <a
            className="nav-link"
            href={item.href}
            onClick={onClose}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   
    <div className="fixed left-0 right-0 top-0 z-50 w-full backdrop-blur-md bg-black/50 border-b border-white/15 transition-all duration-500">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 md:py-3">
          <Link
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            &lt;Irgi /&gt;
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="overflow-hidden border-t border-white/15 bg-black/50 sm:hidden w-full"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <nav className="py-5 c-space">
            <Navigation onClose={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;