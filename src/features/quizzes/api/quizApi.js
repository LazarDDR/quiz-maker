import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../utils/quizHelpers";
import { initialQuizzes } from "../mocks/initialQuizzes";
import { questionApi } from "./questionApi";

// Simulates API calls using localStorage as a database
// When you have a real backend, replace these implementations with apiClient calls

export const quizApi = {
  /**
   * Get all quizzes from storage (simulates GET /quizzes)
   */
  getAll: async () => {
    // return apiClient.get("/quizzes");
    return getAllQuizzes(initialQuizzes);
  },

  /**
   * Get a quiz by ID (simulates GET /quizzes/:id)
   */
  getById: async (id) => {
    // return apiClient.get(`/quizzes/${encodeURIComponent(id)}`);
    return getQuizById(id, initialQuizzes);
  },

  /**
   * Create a new quiz (simulates POST /quizzes)
   * @returns Updated list of all quizzes
   */
  create: async (payload) => {
    const newQuizzes = createQuiz(payload);

    // Add questions to the questions pool
    await questionApi.addQuestions(payload.questions);

    return newQuizzes;
  },

  /**
   * Update an existing quiz (simulates PUT /quizzes/:id)
   * @returns Updated list of all quizzes
   */
  update: async (id, payload) => {
    const updatedQuizzes = updateQuiz(id, payload);

    // Add new questions to the questions pool
    await questionApi.addQuestions(payload.questions);

    return updatedQuizzes;
  },

  /**
   * Delete a quiz by ID (simulates DELETE /quizzes/:id)
   * @returns Updated list of all quizzes
   */
  delete: async (id) => {
    return deleteQuiz(id);
  },
};
