import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QuizGridPage, QuizPlayPage } from "../pages";
import { QUIZ_ROUTES } from "../features/quizzes/constants/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={QUIZ_ROUTES.HOME} element={<QuizGridPage />} />
        <Route path={QUIZ_ROUTES.PLAY} element={<QuizPlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
