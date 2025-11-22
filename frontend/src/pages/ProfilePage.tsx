export default function ProfilePage() {
    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">Профиль</h1>

            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                    <div>
                        <p className="font-semibold">Имя пользователя</p>
                        <p className="opacity-70 text-sm">email@example.com</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm">Уровень: 12</p>
                    <div className="w-full h-3 bg-neutral-300 dark:bg-neutral-700 rounded-xl">
                    <div className="h-3 bg-red-500 rounded-xl" style={{ width: "60%" }} />
                </div>
            </div>

            <p className="opacity-80 text-sm">
            Краткое описание профиля. Текст-заглушка.
            </p>
        </div>
    );
}