import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import QuizLogo from "./graphics/QuizLogo";
import { COLORS } from "../../../theme/colors";

export function QuizHeader({ search, onSearchChange, onCreate }) {
  const handleSearchInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <HeaderRoot>
      <QuizLogo />

      <SearchWrapper>
        <SearchField
          size="small"
          placeholder="Search quizzes…"
          value={search}
          onChange={handleSearchInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchWrapper>

      <AddButton variant="contained" onClick={onCreate}>
        Add Quiz
      </AddButton>
    </HeaderRoot>
  );
}

const HeaderRoot = styled(Box)`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid ${COLORS.grayBorder};
  background-color: ${COLORS.white};
  position: sticky;
  top: 0;
  z-index: 10;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const AddButton = styled(Button)`
  padding: 6px 20px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  white-space: nowrap;
  order: 3;

  @media (max-width: 600px) {
    order: 2;
  }
`;

const SearchWrapper = styled(Box)`
  flex: 1;
  max-width: 420px;
  order: 2;

  @media (max-width: 600px) {
    flex-basis: 100%;
    max-width: 100%;
    order: 3;
    margin-top: 8px;
  }
`;

const SearchField = styled(TextField)`
  width: 100%;
  background-color: ${COLORS.white};
  border-radius: 8px;

  .MuiInputAdornment-root {
    margin-right: 8px;
    color: ${COLORS.slate};
  }
`;
