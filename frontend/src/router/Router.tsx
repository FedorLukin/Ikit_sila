import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../components/layout/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import AboutPage from "@/pages/AboutPage";
import SupportPage from "@/pages/SupportPage";
import LeaderBoardPage from "@/pages/LeaderBoardPage";
import AuthPage from "@/pages/AuthPage";
import EventPage from "@/pages/EventPage";

// lazy pages
const EventListPage = lazy(() => import("../pages/EventListPage"));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="rate" element={<LeaderBoardPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="event" element={<EventPage />} />

        <Route path="list" element={
          <Suspense fallback={<Loader />}>
            <EventListPage />
          </Suspense>
        } />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
