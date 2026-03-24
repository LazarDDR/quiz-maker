export const QUIZ_ROUTES = {
  HOME: "/",
  PLAY: "/quiz/:quizId",
};

export const buildQuizPlayRoute = (quizId) => `/quiz/${quizId}`;
