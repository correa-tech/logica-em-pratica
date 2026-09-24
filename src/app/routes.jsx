import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "../components/SiteLayout.jsx";
import { HomePage } from "../features/home/HomePage.jsx";
import { LessonsPage } from "../features/aulas/LessonsPage.jsx";
import { ExercisesPage } from "../features/exercicios/ExercisesPage.jsx";
import { LaboratoryPage } from "../features/laboratorio/LaboratoryPage.jsx";

export default function AppRoutes() {
  return <BrowserRouter><SiteLayout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/aulas/" element={<LessonsPage />} />
    <Route path="/exercicios/" element={<ExercisesPage />} />
    <Route path="/laboratorio/" element={<LaboratoryPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes></SiteLayout></BrowserRouter>;
}
