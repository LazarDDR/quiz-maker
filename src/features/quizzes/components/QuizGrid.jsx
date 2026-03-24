import { useEffect, useMemo, useState, useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { QuizCard } from "./QuizCard";
import { QuizHeader } from "./QuizHeader";
import { QuizModal } from "./QuizModal";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
import { QUIZ_MODES } from "../constants/quizModes";
import { buildQuizPlayRoute } from "../constants/routes";
import { createEmptyQuiz, filterQuizzesByTitle } from "../utils/quizHelpers";
import { quizApi } from "../api/quizApi";
import { useToast } from "../../../shared/hooks/useToast";

export function QuizGrid() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [quizzes, setQuizzes] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(true);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [mode, setMode] = useState(QUIZ_MODES.EDIT);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      setIsLoadingQuizzes(true);
      try {
        const loaded = await quizApi.getAll();
        setQuizzes(loaded);
      } catch (error) {
        showError("Failed to load quizzes");
        console.error("Error loading quizzes:", error);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadQuizzes();
  }, [showError]);

  const filteredQuizzes = useMemo(() => {
    return filterQuizzesByTitle(quizzes, search);
  }, [quizzes, search]);

  const handleCreate = useCallback(() => {
    setSelectedQuiz(createEmptyQuiz());
    setMode(QUIZ_MODES.CREATE);
    setIsCreating(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedQuiz(null);
    setIsCreating(false);
  }, []);

  const handleSaveQuiz = useCallback(
    async (quiz) => {
      try {
        const updatedQuizzes = isCreating
          ? await quizApi.create(quiz)
          : await quizApi.update(quiz.id, quiz);

        setQuizzes(updatedQuizzes);
        setSelectedQuiz(null);
        setIsCreating(false);
        showSuccess(isCreating ? "Quiz created successfully!" : "Quiz updated successfully!");
      } catch (error) {
        showError("Failed to save quiz. Please try again.");
        console.error("Error saving quiz:", error);
      }
    },
    [isCreating, showSuccess, showError],
  );

  const handleDeleteQuiz = useCallback((quizId) => {
    setQuizToDelete(quizId);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!quizToDelete) return;

    try {
      const updatedQuizzes = await quizApi.delete(quizToDelete);
      setQuizzes(updatedQuizzes);
      setSelectedQuiz(null);
      showSuccess("Quiz deleted successfully!");
    } catch (error) {
      showError("Failed to delete quiz. Please try again.");
      console.error("Error deleting quiz:", error);
    } finally {
      setDeleteDialogOpen(false);
      setQuizToDelete(null);
    }
  }, [quizToDelete, showSuccess, showError]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setQuizToDelete(null);
  }, []);

  const handleSelectQuiz = useCallback((quiz) => {
    setSelectedQuiz(quiz);
    setMode(QUIZ_MODES.EDIT);
  }, []);

  const handlePlayQuiz = useCallback(
    (quiz) => {
      navigate(buildQuizPlayRoute(quiz.id));
      setSelectedQuiz(quiz);
      setMode(QUIZ_MODES.PLAY);
    },
    [navigate],
  );

  return (
    <>
      <QuizHeader search={search} onSearchChange={setSearch} onCreate={handleCreate} />
      {isLoadingQuizzes ? (
        <LoadingState>
          <CircularProgress size={32} />
        </LoadingState>
      ) : (
        <Grid>
          {filteredQuizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              quiz={quiz}
              onSelectQuiz={handleSelectQuiz}
              onPlayQuiz={handlePlayQuiz}
              onDeleteQuiz={handleDeleteQuiz}
            />
          ))}

          {filteredQuizzes.length === 0 && (
            <EmptyState color="text.secondary" align="center">
              No quizzes found
            </EmptyState>
          )}
        </Grid>
      )}

      {selectedQuiz && (
        <QuizModal
          quiz={selectedQuiz}
          open
          mode={mode}
          isCreating={isCreating}
          onClose={handleClose}
          onSave={handleSaveQuiz}
          onDelete={handleDeleteQuiz}
          allQuizzes={quizzes}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Quiz"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

const Grid = styled(Box)`
  display: grid;
  gap: 16px;
  padding: 24px;
  justify-content: center;
  justify-items: center;
  align-items: stretch;

  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, 16rem);
  }
`;

const EmptyState = styled(Typography)`
  margin-top: 32px;
  grid-column: 1 / -1;
`;

const LoadingState = styled(Box)`
  padding: 48px 24px;
  display: flex;
  justify-content: center;
`;
