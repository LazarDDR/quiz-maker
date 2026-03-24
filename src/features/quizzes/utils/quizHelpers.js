import { STORAGE_KEYS } from "../constants/storageKeys";

export function createEmptyQuiz(now = Date.now()) {
  return {
    id: `quiz-${now}`,
    title: "",
    questions: [],
  };
}

export function loadQuizzesFromStorage(initialQuizData, storageKey = STORAGE_KEYS.QUIZZES) {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }

  localStorage.setItem(storageKey, JSON.stringify(initialQuizData));
  return initialQuizData;
}

export function saveQuizzesToStorage(quizzes, storageKey = STORAGE_KEYS.QUIZZES) {
  localStorage.setItem(storageKey, JSON.stringify(quizzes));
}

export function filterQuizzesByTitle(quizzes, search) {
  const q = search.toLowerCase();
  return quizzes.filter((quiz) => quiz.title.toLowerCase().includes(q));
}

export function getAllQuizzes(initialQuizData) {
  return loadQuizzesFromStorage(initialQuizData);
}

export function getQuizById(id, initialQuizData) {
  const quizzes = loadQuizzesFromStorage(initialQuizData);
  const quiz = quizzes.find((q) => q.id === id);
  if (!quiz) {
    throw new Error(`Quiz with id ${id} not found`);
  }
  return quiz;
}

export function updateQuizQuestion(quiz, index, field, value) {
  return {
    ...quiz,
    questions: quiz.questions.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
  };
}

export function addEmptyQuestionToQuiz(quiz, now = Date.now()) {
  return {
    ...quiz,
    questions: [...quiz.questions, { id: `q-${now}`, question: "", answer: "" }],
  };
}

export function addExistingQuestionToQuiz(quiz, question, now = Date.now()) {
  return {
    ...quiz,
    questions: [
      ...quiz.questions,
      { id: `q-${now}`, question: question.question, answer: question.answer },
    ],
  };
}

export function buildQuestionSuggestions(allQuizzes, editableQuiz) {
  return allQuizzes
    .reduce((acc, quiz) => [...acc, ...quiz.questions], [])
    .filter((q) => !editableQuiz.questions.some((eq) => eq.question === q.question));
}

export function createQuiz(payload) {
  const stored = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes = stored ? JSON.parse(stored) : [];
  const newQuizzes = [...quizzes, payload];
  saveQuizzesToStorage(newQuizzes);
  return newQuizzes;
}

export function updateQuiz(id, payload) {
  const stored = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes = stored ? JSON.parse(stored) : [];
  const updatedQuizzes = quizzes.map((q) => (q.id === id ? payload : q));
  saveQuizzesToStorage(updatedQuizzes);
  return updatedQuizzes;
}

export function deleteQuiz(id) {
  const stored = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes = stored ? JSON.parse(stored) : [];
  const filteredQuizzes = quizzes.filter((q) => q.id !== id);
  saveQuizzesToStorage(filteredQuizzes);
  return filteredQuizzes;
}

export function getAllQuestions(initialQuestions = []) {
  const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    }
  }

  if (initialQuestions.length > 0) {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(initialQuestions));
    return initialQuestions;
  }

  return [];
}

export function addQuestionsToPool(questions) {
  const existing = getAllQuestions();

  // Merge new questions, avoiding duplicates by question text
  const existingTexts = new Set(existing.map((q) => q.question.toLowerCase().trim()));
  const newQuestions = questions.filter((q) => !existingTexts.has(q.question.toLowerCase().trim()));

  const updated = [...existing, ...newQuestions];
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(updated));
}
