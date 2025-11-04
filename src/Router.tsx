import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import NotMatch from "./pages/NotMatch";
import PlantsPage from "./pages/MyPlants";
import HomePage from "./pages/Home";
import Events from "./pages/Events";

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="events" element={<Events />} />
        <Route path="MyPlants" element={<PlantsPage />} />
        <Route path="*" element={<NotMatch />} />
      </Route>
    </Routes>
  );
}
