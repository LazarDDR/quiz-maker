import { useCallback } from "react";
import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styled from "styled-components";
import { PlayMode } from "./PlayMode";
import { COLORS } from "../../../../theme/colors";

export const PlayQuizShell = ({ quiz, onClose }) => {
  const handleCopyLink = useCallback(() => {
    const url = `${window.location.origin}/quiz/${quiz.id}`;
    navigator.clipboard.writeText(url);
  }, [quiz.id]);

  return (
    <Wrapper>
      <Content>
        <PlayMode quiz={quiz} onClose={onClose} />
      </Content>
      <Footer>
        <CopyButton onClick={handleCopyLink}>
          <ContentCopyIcon fontSize="small" />
          Copy Quiz Link
        </CopyButton>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 24px;
  min-height: auto;
  border-radius: 20px;

  background-image: linear-gradient(${COLORS.overlayTop}, ${COLORS.overlayBottom});
  background-size: cover;
  background-position: center;

  overflow-y: auto; /* Enable vertical scroll */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.scrollbarThumb};
    border-radius: 4px;
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  transform: none;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;

const CopyButton = styled(Button)`
  background: ${COLORS.brandYellow} !important;
  color: ${COLORS.black} !important;
  font-weight: 800 !important;
  text-transform: none !important;
  border-radius: 999px !important;
  padding: 10px 22px !important;
  gap: 8px;

  &:hover {
    background: ${COLORS.brandYellowHover} !important;
  }
`;
