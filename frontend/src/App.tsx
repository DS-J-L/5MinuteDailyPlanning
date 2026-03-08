import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import BrainDumpPage from "./pages/BrainDump";
import EstimatePage from "./pages/Estimate";
import HistoryPage from "./pages/History";
import HomePage from "./pages/Home";
import PickBig3Page from "./pages/PickBig3";
import ReviewPage from "./pages/Review";
import TodayPage from "./pages/Today";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/brain-dump" element={<BrainDumpPage />} />
        <Route path="/pick-big3" element={<PickBig3Page />} />
        <Route path="/estimate" element={<EstimatePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
