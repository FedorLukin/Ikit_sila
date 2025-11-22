import CardEventList from "@/components/CardEventList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MainPage() {
  const list = [
    {
      id: 1,
      title: "Концерт Jazz Night",
      date: "2024-07-01",
      location: "Москва, Парк Горького",
      time: "18:00",
      organizer: "MusicFest",
      description: "Вечер джазовой музыки с участием известных музыкантов."
    },
    {
      id: 2,
      title: "Выставка современного искусства",
      date: "2024-07-05",
      location: "Санкт-Петербург, Эрмитаж",
      time: "19:00",
      organizer: "ArtGallery",
      description: "Выставка работ современных художников."
    },
    {
      id: 3,
      title: "Лекция по философии",
      date: "2024-07-10",
      location: "Новосибирск, Университет",
      time: "17:00",
      organizer: "ThinkersClub",
      description: "Обсуждение современных философских течений."
    },
    {
      id: 4,
      title: "Лекция по философии",
      date: "2024-07-10",
      location: "Новосибирск, Университет",
      time: "17:00",
      organizer: "ThinkersClub",
      description: "Обсуждение современных философских течений."
    },
    {
      id: 5,
      title: "Лекция по философии",
      date: "2024-07-10",
      location: "Новосибирск, Университет",
      time: "17:00",
      organizer: "ThinkersClub",
      description: "Обсуждение современных философских течений."
    },
  ];

  return (
    <section className="min-h-screen text-neutral-900 dark:text-neutral-100 px-4 py-8 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-wide">Добро пожаловать на наш сервис!</h1>
        <p className="text-lg opacity-90 leading-relaxed">
          Мы помогаем находить лучшие мероприятия в вашем городе, создавать профили и повышать ваш рейтинг среди пользователей.
        </p>
        <div className="flex justify-center mt-4 gap-4 flex-wrap">
          <Button className="bg-red-600 text-white rounded-xl px-6 py-2 text-sm font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all">
            <Link to="/auth">
              Регистрация
            </Link>
          </Button>
          <Button className="bg-black text-white rounded-xl px-6 py-2 text-sm font-medium hover:bg-neutral-800 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all">
            <Link to="/auth">
              Войти
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
          <h3 className="text-2xl font-bold text-red-500">120+</h3>
          <p className="opacity-80 text-sm mt-1">Активных мероприятий</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
          <h3 className="text-2xl font-bold text-red-500">500+</h3>
          <p className="opacity-80 text-sm mt-1">Зарегистрированных пользователей</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
          <h3 className="text-2xl font-bold text-red-500">95%</h3>
          <p className="opacity-80 text-sm mt-1">Положительных отзывов</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-4">
        <h2 className="text-xl font-semibold">Тут бы что-то написать</h2>
        <p className="text-sm opacity-80">
          Тут бы что-то написать. Тут бы что-то написать.
        </p>
        <Button className="bg-red-500 text-white rounded-xl px-6 py-2 text-sm font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all">
          Супер кнопка
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-center">Активные мероприятия</h2>
        <CardEventList cardEventList={list.length < 3 ? list : list.slice(0, 3)} />
        <div className="flex justify-center mt-4">
          <Button className="bg-red-500 text-white rounded-xl px-6 py-2 text-sm font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all">
            <Link
              to="/list"
              state={{list}}
            >
              Показать все мероприятия
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-500 text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
          <h3 className="text-xl font-bold">Будь в курсе всех событий</h3>
          <p className="opacity-90 text-sm mt-2">Не пропускай ни одно мероприятие в твоём городе!</p>
        </div>
        <div className="bg-black text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
          <h3 className="text-xl font-bold">Поднимай свой рейтинг</h3>
          <p className="opacity-90 text-sm mt-2">Активность приносит больше возможностей и привилегий.</p>
        </div>
      </div>
    </section>
  );
}
