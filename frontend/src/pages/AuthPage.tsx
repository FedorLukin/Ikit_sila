import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {tab === "login" ? "Вход" : "Регистрация"}
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          <Button
            onClick={() => setTab("login")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              tab === "login"
                ? "bg-red-500 text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            Вход
          </Button>
          <Button
            onClick={() => setTab("register")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              tab === "register"
                ? "bg-red-500 text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            }`}
          >
            Регистрация
          </Button>
        </div>

        <form className="space-y-4">
          <input
            required
            type="email"
            className="w-full p-3 border rounded-xl bg-transparent focus:ring-2 focus:ring-red-400"
            placeholder="Email"
          />
          <input
            required
            type="password"
            className="w-full p-3 border rounded-xl bg-transparent focus:ring-2 focus:ring-red-400"
            placeholder="Password"
          />

          {tab === "register" && (
            <>
              <input
                required
                type="text"
                className="w-full p-3 border rounded-xl bg-transparent focus:ring-2 focus:ring-red-400"
                placeholder="Имя"
              />
              <input
                required
                type="password"
                className="w-full p-3 border rounded-xl bg-transparent focus:ring-2 focus:ring-red-400"
                placeholder="Подтвердите пароль"
              />
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600 active:scale-95 transition-all"
          >
            {tab === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>
      </div>
    </div>
  );
}
