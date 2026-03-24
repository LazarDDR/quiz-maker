import styled, { css, keyframes } from "styled-components";
import { COLORS } from "../../../../theme/colors";

const DEFAULTS = {
  label: "Quiz Maker",
  showLabel: true,
  lensColor: COLORS.brandYellow,
  accentColor: COLORS.brandYellow,
  strokeColor: COLORS.black,
  glassesWidth: 140,
  glassesHeight: 80,
  disableHoverAnimation: false,
};

const QuizLogo = ({
  label = DEFAULTS.label,
  showLabel = DEFAULTS.showLabel,
  lensColor = DEFAULTS.lensColor,
  accentColor = DEFAULTS.accentColor,
  strokeColor = DEFAULTS.strokeColor,
  glassesWidth = DEFAULTS.glassesWidth,
  glassesHeight = DEFAULTS.glassesHeight,
  disableHoverAnimation = DEFAULTS.disableHoverAnimation,
}) => {
  return (
    <LogoWrapper>
      <Glasses
        viewBox="0 0 100 64"
        $width={glassesWidth}
        $height={glassesHeight}
        $disableHoverAnimation={disableHoverAnimation}
      >
        <ellipse
          cx="18"
          cy="32"
          rx="14"
          ry="16"
          fill={lensColor}
          stroke={strokeColor}
          strokeWidth="3"
          transform="rotate(-6 18 32)"
        />

        <ellipse
          cx="60"
          cy="34"
          rx="14"
          ry="16"
          fill={lensColor}
          stroke={strokeColor}
          strokeWidth="3"
          transform="rotate(4 60 34)"
        />

        <path
          d="M12 24 Q18 18 24 24"
          stroke={COLORS.white}
          strokeWidth="2"
          fill="none"
          opacity={0.5}
        />
        <path
          d="M52 26 Q58 20 64 26"
          stroke={COLORS.white}
          strokeWidth="2"
          fill="none"
          opacity={0.5}
        />

        <circle cx="18" cy="18" r="3" fill={COLORS.white} opacity={0.6} />
        <circle cx="60" cy="20" r="2.5" fill={COLORS.white} opacity={0.5} />

        <line
          x1="34"
          y1="33"
          x2="44"
          y2="33"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path d="M6 32 Q-5 36 -2 48 Q1 58 10 52" stroke={strokeColor} strokeWidth="3" fill="none" />

        <path
          d="M72 34 Q81 38 78 50 Q75 60 68 54"
          stroke={strokeColor}
          strokeWidth="3"
          fill="none"
        />
      </Glasses>
      {showLabel && <LogoText $color={accentColor}>{label}</LogoText>}
    </LogoWrapper>
  );
};

export default QuizLogo;

const hoverBounce = keyframes`
  0% { transform: rotate(-5deg); }
  25% { transform: rotate(-7deg); }
  50% { transform: rotate(-5deg); }
  75% { transform: rotate(-3deg); }
  100% { transform: rotate(-5deg); }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  /* Scale down whole logo on small screens */
  @media (max-width: 600px) {
    transform: scale(0.8);
    transform-origin: left center;
  }

  @media (max-width: 400px) {
    transform: scale(0.7);
  }
`;

const Glasses = styled.svg`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  transform: rotate(-4deg);
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;

  ${({ $disableHoverAnimation }) =>
    !$disableHoverAnimation &&
    css`
      &:hover {
        animation: ${hoverBounce} 0.6s infinite;
      }
    `}

  /* Smaller glasses on mobile */
  @media (max-width: 600px) {
    width: 110px;
    height: 64px;
  }

  @media (max-width: 400px) {
    width: 90px;
    height: 52px;
  }
`;

const LogoText = styled.h1`
  font-family: "Baloo 2", "Comic Sans MS", cursive, sans-serif;
  font-size: 2.6rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  user-select: none;
  color: ${({ $color }) => $color};

  text-shadow:
    -2px -2px 0 ${COLORS.black},
    2px -2px 0 ${COLORS.black},
    -2px 2px 0 ${COLORS.black},
    2px 2px 0 ${COLORS.black},
    0px 3px 0 ${COLORS.black};

  letter-spacing: 1px;

  /* Responsive text sizing */
  @media (max-width: 600px) {
    font-size: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 1.6rem;
  }
`;
