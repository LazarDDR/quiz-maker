import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import pubQuizPattern from "../assets/pub-quiz-pattern.svg";

import { PlayQuizShell } from "./play/PlayQuizShell";
import { QuestionSuggestionDropdown } from "./QuestionSuggestionDropdown";
import QuizLogo from "./graphics/QuizLogo";
import {
  addEmptyQuestionToQuiz,
  addExistingQuestionToQuiz,
  updateQuizQuestion,
} from "../utils/quizHelpers";
import { QUIZ_MODES } from "../constants/quizModes";
import { COLORS } from "../../../theme/colors";
import { validateQuiz } from "../validation/quizValidation";
import { questionApi } from "../api/questionApi";

export const QuizModal = ({ quiz, open, mode, onClose, onSave, onDelete }) => {
  const [editableQuiz, setEditableQuiz] = useState(quiz);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({ questions: [] });
  const [availableQuestions, setAvailableQuestions] = useState([]);

  const DialogContentComponent = mode === QUIZ_MODES.PLAY ? StyledDialogContent : DialogContent;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await questionApi.getAll();
        setAvailableQuestions(questions);
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    };

    if (mode !== QUIZ_MODES.PLAY) {
      loadQuestions();
    }
  }, [mode]);

  useEffect(() => {
    setEditableQuiz(quiz);
    setSubmitAttempted(false);
  }, [quiz]);

  useEffect(() => {
    if (mode === QUIZ_MODES.PLAY) return;

    setErrors(validateQuiz(editableQuiz).errors);
  }, [editableQuiz, mode, setErrors]);

  const isValid = mode === QUIZ_MODES.PLAY ? true : validateQuiz(editableQuiz).isValid;

  const updateQuestion = (index, field, value) => {
    setEditableQuiz((prev) => updateQuizQuestion(prev, index, field, value));
  };

  const handleAddQuestion = () => {
    const next = addEmptyQuestionToQuiz(editableQuiz);
    setEditableQuiz(next);
  };

  const handleTitleChange = (e) => {
    setEditableQuiz((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleQuestionFieldChange = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const field = e.currentTarget.dataset.field;
    if (!Number.isFinite(index) || (field !== "question" && field !== "answer")) return;
    updateQuestion(index, field, e.target.value);
  };

  const handleAddSuggestedQuestion = (question) => {
    const next = addExistingQuestionToQuiz(editableQuiz, question);
    setEditableQuiz(next);
  };

  const handleDeleteQuestion = (index) => {
    setEditableQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setSubmitAttempted(true);

    const result = validateQuiz(editableQuiz);
    setErrors(result.errors);
    if (!result.isValid) return;

    onSave(editableQuiz);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editableQuiz.id);
    onClose();
  };

  return (
    <StyledDialog open={open} maxWidth="md" fullWidth>
      <StyledDialogTitle $play={mode === QUIZ_MODES.PLAY}>
        {mode === QUIZ_MODES.PLAY ? (
          <QuizLogo />
        ) : (
          <>
            <TitleRow>
              <TitleText>
                {mode === QUIZ_MODES.EDIT && "Edit Quiz"}
                {mode === QUIZ_MODES.CREATE && "Create Quiz"}
              </TitleText>
              <CloseButton onClick={onClose}>
                <CloseIcon />
              </CloseButton>
            </TitleRow>
            {(mode === QUIZ_MODES.EDIT || mode === QUIZ_MODES.CREATE) && (
              <DropdownWrapper>
                <QuestionSuggestionDropdown
                  editableQuiz={editableQuiz}
                  availableQuestions={availableQuestions}
                  onAddQuestion={handleAddSuggestedQuestion}
                />
              </DropdownWrapper>
            )}
          </>
        )}
      </StyledDialogTitle>

      <DialogContentComponent dividers>
        {mode === QUIZ_MODES.PLAY ? (
          <PlayQuizShell quiz={editableQuiz} onClose={onClose} />
        ) : (
          <Stack spacing={2}>
            <TextField
              label="Quiz Title"
              value={editableQuiz.title}
              onChange={handleTitleChange}
              fullWidth
              error={submitAttempted && Boolean(errors.title)}
              helperText={submitAttempted ? errors.title : undefined}
            />

            {editableQuiz.questions.map((q, index) => (
              <QuestionCard key={q.id} spacing={1}>
                <QuestionHeader>
                  <QuestionNumber>Question {index + 1}</QuestionNumber>
                  <DeleteButton size="small" onClick={() => handleDeleteQuestion(index)}>
                    <DeleteIcon fontSize="small" />
                  </DeleteButton>
                </QuestionHeader>
                <StyledTextField
                  label="Question"
                  value={q.question}
                  onChange={handleQuestionFieldChange}
                  inputProps={{ "data-index": index, "data-field": "question" }}
                  fullWidth
                  error={submitAttempted && Boolean(errors.questions[index]?.question)}
                  helperText={submitAttempted ? errors.questions[index]?.question : undefined}
                />
                <StyledTextField
                  label="Answer"
                  value={q.answer}
                  onChange={handleQuestionFieldChange}
                  inputProps={{ "data-index": index, "data-field": "answer" }}
                  fullWidth
                  error={submitAttempted && Boolean(errors.questions[index]?.answer)}
                  helperText={submitAttempted ? errors.questions[index]?.answer : undefined}
                />
              </QuestionCard>
            ))}

            <Button onClick={handleAddQuestion}>Add Question</Button>

            <PrimaryButton variant="contained" onClick={handleSave} disabled={!isValid}>
              {mode === QUIZ_MODES.CREATE ? "Create Quiz" : "Save Changes"}
            </PrimaryButton>

            {mode === QUIZ_MODES.EDIT && (
              <Button color="error" variant="outlined" onClick={handleDelete}>
                Delete Quiz
              </Button>
            )}
          </Stack>
        )}
      </DialogContentComponent>
    </StyledDialog>
  );
};

const StyledDialogTitle = styled(DialogTitle)`
  position: relative;
  font-weight: 700;
  font-size: 1.25rem;
  padding: 16px 24px;

  ${({ $play }) =>
    $play &&
    `
    background-color: ${COLORS.modalTitleBg};
    color: ${COLORS.brandYellow};
    text-align: center;
    padding: 20px 48px;
    letter-spacing: 2px;
    text-transform: uppercase;
  `}
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleText = styled.div`
  flex: 1;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const StyledDialogContent = styled(DialogContent)`
  background-color: ${COLORS.softYellow}; /* soft yellow base */
  min-height: 400px;
  position: relative;

  /* subtle pattern overlay */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${pubQuizPattern}); /* subtle SVG illustration */
    background-repeat: repeat;
    background-size: 80px; /* adjust size for subtlety */
    pointer-events: none; /* so it doesn't block clicks */
  }

  /* make sure content is above the overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
    background: ${COLORS.backgroundPaper};
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
`;

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 8px;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${COLORS.primaryBlue} !important;
  font-weight: 700 !important;
  text-transform: none !important;

  &:hover {
    background-color: ${COLORS.primaryBlueHover} !important;
  }
`;

const QuestionCard = styled(Stack)`
  padding: 16px;
  border-radius: 12px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.grayBorder};
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const QuestionNumber = styled.div`
  font-weight: 600;
  color: ${COLORS.darkGray};
  font-size: 0.875rem;
`;

const DeleteButton = styled(IconButton)`
  color: ${COLORS.redDanger} !important;

  &:hover {
    background-color: rgba(255, 82, 82, 0.1) !important;
  }
`;
