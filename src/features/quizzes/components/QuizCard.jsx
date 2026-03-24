import React from "react";
import styled from "styled-components";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { COLORS } from "../../../theme/colors";

export const QuizCard = ({ quiz, onSelectQuiz, onPlayQuiz, onDeleteQuiz }) => {
  const handleCardClick = () => {
    onSelectQuiz(quiz);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlayQuiz(quiz);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteQuiz(quiz.id);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Content>
        <Title variant="h6">{quiz.title}</Title>

        <Typography variant="body2" color="text.secondary">
          {quiz.questions.length} questions
        </Typography>

        <div className="spacer" />
        <Box flexGrow={1} />
        <ButtonGroup>
          <Button fullWidth size="small" variant="contained" onClick={handlePlayClick}>
            Play
          </Button>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Content>
    </StyledCard>
  );
};

const Content = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;

  &:last-child {
    padding-bottom: 16px;
  }
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const Title = styled(Typography)`
  line-height: 1.3;
  min-height: 2.6em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 16rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 180px;
  border-radius: 12px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px ${COLORS.shadowHover};
  }
`;
