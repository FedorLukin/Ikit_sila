import { Mail, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full mt-10 py-6 text-center border-t border-neutral-300 dark:border-neutral-700 space-y-4">
      <div className="flex justify-center items-center gap-4 text-sm opacity-70">
        <a href="mailto:info@example.com" className="flex items-center gap-1 hover:text-red-500 transition">
          <Mail className="w-4 h-4" /> info@example.com
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-red-500 transition">
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-red-500 transition">
          <Twitter className="w-4 h-4" /> Twitter
        </a>
      </div>
      <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Минималистичный проект. Все права защищены.</p>
    </footer>
  );
}
