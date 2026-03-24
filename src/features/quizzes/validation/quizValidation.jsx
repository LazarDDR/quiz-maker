import * as yup from "yup";

const quizSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  questions: yup
    .array()
    .of(
      yup.object({
        question: yup.string().trim().required("Question is required"),
        answer: yup.string().trim().required("Answer is required"),
      }),
    )
    .min(1, "At least 1 question is required"),
});

export function validateQuiz(quiz) {
  const errors = { questions: [] };

  try {
    quizSchema.validateSync(
      {
        title: quiz.title,
        questions: quiz.questions,
      },
      { abortEarly: false },
    );

    return { errors, isValid: true };
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      for (const err of e.inner) {
        const path = err.path ?? "";

        if (path === "title") {
          errors.title = err.message;
          continue;
        }

        const match = path.match(/^questions\[(\d+)\]\.(question|answer)$/);
        if (match) {
          const index = Number(match[1]);
          const field = match[2];
          if (!errors.questions[index]) errors.questions[index] = {};
          errors.questions[index][field] = err.message;
          continue;
        }

        if (path === "questions") {
          errors.questions[0] = { question: err.message };
        }
      }
    }

    const hasQuestionErrors = errors.questions.some((q) => q && (q.question || q.answer));
    return { errors, isValid: !errors.title && !hasQuestionErrors };
  }
}
