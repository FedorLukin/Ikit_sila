import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Slack } from "lucide-react";
import { useState } from "react";


export default function Header() {
  const [ theme, setTheme ] = useState<string | null>(localStorage.getItem("theme") || null)

  const handleSetTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    if (theme !== "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.removeItem("theme")
    }
  }

  return (
    <header className="w-full border-b border-neutral-300 dark:border-neutral-700 flex items-center justify-between px-4 py-3">
      <div className="text-xl font-semibold">
        <Link to="/"><Slack /></Link>
      </div>

      <nav className="flex items-center gap-6 text-sm">
        <button
        onClick={handleSetTheme}
        className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" /> }
        </button>
        <Link to="/about" className="list-none cursor-pointer">О нас</Link>
        <Link to="/support" className="list-none cursor-pointer">Поддержка</Link>
        <Link to="/rate" className="list-none cursor-pointer">Рейтинг</Link>
        <Button variant="outline" className="rounded-xl px-4 py-2 text-red-500 border-red-500">
          <Link to="/auth">
            Регистрация
          </Link>
        </Button>
      </nav>
    </header>
  );
}