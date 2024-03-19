import React, { FC, memo } from 'react';
import truncate from 'lodash/truncate';
import { AmountThemes, amountThemes } from '../constants/themes';

interface GameAmountProps {
  text: string;
  theme?: AmountThemes;
  className?: string;
}

const GameAmount: FC<GameAmountProps> = memo(({
  text,
  theme = 'default',
  className = '',
}: GameAmountProps) => {
  const { textColor, backgroundColor, borderColor } = amountThemes[theme];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 376 40"
      className={`${className}`}
    >
      <path stroke={borderColor} d="M69 20H0M376 20h-69" />
      <path
        fill={backgroundColor}
        stroke={borderColor}
        d="M81.453 4.638A11.5 11.5 0 0 1 90.287.5h195.426c3.413 0 6.649 1.516 8.834 4.138L307.349 20l-12.802 15.362a11.499 11.499 0 0 1-8.834 4.138H90.287a11.5 11.5 0 0 1-8.834-4.138L68.65 20 81.453 4.638Z"
      />

      <text
        x="50%"
        y="55%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize="23"
        fontWeight="300"
        fill={textColor}
      >
        {truncate(text, { length: 16 })}
      </text>
    </svg>
  );
});

GameAmount.defaultProps = {
  className: '',
  theme: 'default',
};

export default GameAmount;
