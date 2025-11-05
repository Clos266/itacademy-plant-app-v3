import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotMatch from "./pages/NotMatch";
import PlantsPage from "./pages/MyPlantsPage";
import HomePage from "./pages/HomePage";
import Events from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="MyPlants"
          element={
            <ProtectedRoute>
              <PlantsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotMatch />} />
      </Route>
    </Routes>
  );
}
