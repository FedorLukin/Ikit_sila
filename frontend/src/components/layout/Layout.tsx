import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="px-4 py-6 max-w-3xl mx-auto flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}