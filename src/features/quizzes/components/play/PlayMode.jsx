import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Fade, Slide, LinearProgress } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../../../../theme/colors";

export const PlayMode = ({ quiz, onClose, questionTime = 20 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionTime);

  const question = quiz.questions[currentIndex];

  const handleReveal = () => setRevealed(true);
  const handlePrev = () => setCurrentIndex((i) => i - 1);
  const handleNext = () => setCurrentIndex((i) => i + 1);

  useEffect(() => {
    if (revealed) return;

    if (timeLeft === 0) {
      setRevealed(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, revealed]);

  useEffect(() => {
    setTimeLeft(questionTime);
    setRevealed(false);
  }, [currentIndex, questionTime]);

  return (
    <Stage>
      <Stack spacing={1} alignItems="center">
        <QuizTitle>{quiz.title}</QuizTitle>
        <QuestionCount>
          Question {currentIndex + 1} / {quiz.questions.length}
        </QuestionCount>
      </Stack>

      <TimerWrapper>
        <TimerBar
          variant="determinate"
          value={(timeLeft / questionTime) * 100}
          $danger={timeLeft < 5}
        />
        <TimerText>{timeLeft}s</TimerText>
      </TimerWrapper>

      <Fade in key={question?.id} timeout={600}>
        <QuestionText>{question?.question}</QuestionText>
      </Fade>

      <Box minHeight={100}>
        <Slide direction="up" in={revealed} mountOnEnter unmountOnExit>
          <AnswerText>{question?.answer}</AnswerText>
        </Slide>
      </Box>

      <Stack spacing={2} alignItems="center">
        {!revealed && (
          <RevealButton variant="contained" size="large" onClick={handleReveal}>
            Reveal Answer
          </RevealButton>
        )}

        <Stack direction="row" spacing={3}>
          <NavButton variant="outlined" disabled={currentIndex === 0} onClick={handlePrev}>
            ◀ Previous
          </NavButton>

          <NavButton
            variant="outlined"
            disabled={currentIndex === quiz.questions.length - 1}
            onClick={handleNext}
          >
            Next ▶
          </NavButton>
        </Stack>

        <ExitButton onClick={onClose}>Exit Quiz</ExitButton>
      </Stack>
    </Stage>
  );
};

const Stage = styled(Box)`
  background: radial-gradient(circle at top, ${COLORS.stageStart} 0%, ${COLORS.black} 65%);
  color: ${COLORS.white};
  padding: 40px 32px;
  border-radius: 20px;
  text-align: center;
`;

const QuizTitle = styled(Typography)`
  font-size: 1.6rem !important;
  font-weight: 800;
  letter-spacing: 1px;
`;

const QuestionCount = styled(Typography)`
  color: ${COLORS.brandYellow};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const QuestionText = styled(Typography)`
  font-size: 1.5rem !important;
  font-weight: 700;
  margin: 40px 0 24px;
`;

const AnswerText = styled(Typography)`
  font-size: 1.3rem !important;
  font-weight: 800;
  color: ${COLORS.greenAnswer};
`;

const TimerWrapper = styled(Box)`
  margin: 24px 0;
`;

const TimerBar = styled(LinearProgress)`
  height: 10px !important;
  border-radius: 5px;
  background-color: ${COLORS.darkGray} !important;

  .MuiLinearProgress-bar {
    background-color: ${({ $danger }) =>
      $danger ? COLORS.redDanger : COLORS.brandYellow} !important;
  }
`;

const TimerText = styled(Typography)`
  margin-top: 8px;
  font-weight: 600;
`;

const RevealButton = styled(Button)`
  background-color: ${COLORS.brandYellow} !important;
  color: ${COLORS.black} !important;
  font-weight: 800 !important;
  padding: 12px 32px !important;

  &:hover {
    background-color: ${COLORS.brandYellowHover} !important;
  }
`;

const ExitButton = styled(Button)`
  color: ${COLORS.grayText} !important;
  text-transform: none !important;
  border: 2px solid ${COLORS.brandYellow} !important;
  border-radius: 12px !important;

  &:hover {
    border-color: ${COLORS.brandYellow} !important;
  }
`;

const NavButton = styled(Button)`
  color: ${COLORS.white} !important;
  border-color: ${COLORS.grayStroke} !important;
  text-transform: none !important;

  &:hover {
    border-color: ${COLORS.white} !important;
  }
`;
