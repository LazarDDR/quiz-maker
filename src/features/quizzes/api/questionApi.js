import { getAllQuestions, addQuestionsToPool } from "../utils/quizHelpers";
import { initialQuizzes } from "../mocks/initialQuizzes";

// Extract all questions from initial quizzes
const initialQuestions = initialQuizzes.flatMap((quiz) => quiz.questions);

export const questionApi = {
  /**
   * Get all questions from storage (simulates GET /questions)
   * Returns unique questions from all quizzes
   */
  getAll: async () => {
    // return apiClient.get("/questions");
    return getAllQuestions(initialQuestions);
  },

  /**
   * Add questions to the pool (simulates POST /questions)
   * @param questions - Questions to add to the pool
   */
  addQuestions: async (questions) => {
    // await apiClient.post("/questions", questions);
    addQuestionsToPool(questions);
  },
};
