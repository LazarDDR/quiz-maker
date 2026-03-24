import { useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styled from "styled-components";

export const QuestionSuggestionDropdown = ({ editableQuiz, availableQuestions, onAddQuestion }) => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = useMemo(() => {
    const currentQuestions = new Set(
      editableQuiz.questions.map((q) => q.question.toLowerCase().trim()),
    );

    const uniqueQuestions = new Map();

    availableQuestions
      .filter((q) => !currentQuestions.has(q.question.toLowerCase().trim()))
      .forEach((q) => {
        const key = q.question.toLowerCase().trim();
        if (!uniqueQuestions.has(key)) {
          uniqueQuestions.set(key, { question: q.question, answer: q.answer });
        }
      });

    return Array.from(uniqueQuestions.values());
  }, [availableQuestions, editableQuiz]);

  if (suggestions.length === 0) return null;

  const handleInputChange = (_, value) => {
    setInputValue(value);
  };

  const handleChange = (_, selected) => {
    if (!selected) return;
    onAddQuestion(selected);
    setInputValue("");
  };

  return (
    <Wrapper>
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.question}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              className: params.InputLabelProps?.className ?? "",
            }}
            label="Add previous question"
            size="small"
          />
        )}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        disableClearable
        fullWidth
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
`;
