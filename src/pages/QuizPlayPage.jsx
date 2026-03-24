import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

import { QUIZ_MODES, QuizModal, quizApi } from "../features/quizzes";
import { QUIZ_ROUTES } from "../features/quizzes/constants/routes";

export default function QuizPlayPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        setError("No quiz ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const fetchedQuiz = await quizApi.getById(quizId);
        setQuiz(fetchedQuiz);
      } catch (err) {
        console.error("Failed to load quiz:", err);
        setError("Quiz not found");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !quiz) {
    return <div>{error || "Quiz not found"}</div>;
  }

  const handleClose = () => navigate(QUIZ_ROUTES.HOME);
  const handleSave = () => {};
  const handleDelete = () => {};

  return (
    <QuizModal
      quiz={quiz}
      open
      mode={QUIZ_MODES.PLAY}
      isCreating={false}
      onClose={handleClose}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
