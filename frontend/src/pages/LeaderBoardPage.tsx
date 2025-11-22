export default function LeaderBoardPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold">Таблица лидеров</h1>

            <div className="p-4 border rounded-xl">
                <h2 className="font-semibold mb-2">Метрика 1</h2>
                <p>Таблица пользователей</p>
            </div>

            <div className="p-4 border rounded-xl">
                <h2 className="font-semibold mb-2">Метрика 2</h2>
                <p>Таблица пользователей</p>
            </div>

            <div className="p-4 border rounded-xl">
                <h2 className="font-semibold mb-2">Метрика 3</h2>
                <p>Таблица пользователей</p>
            </div>
        </div>
    );
}