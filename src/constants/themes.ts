import { Colors, colors } from '../../tailwind.config';

export interface ElementTheme {
  borderColor: Colors;
  backgroundColor: Colors;
  textColor: Colors;
}

export const gameButtonThemes = {
  inactive: {
    borderColor: colors['grey-3'],
    backgroundColor: colors['white-1'],
    textColor: colors['black-1'],
  },
  selected: {
    borderColor: colors['orange-3'],
    backgroundColor: colors['orange-1'],
    textColor: colors['black-1'],
  },
  correct: {
    borderColor: colors['green-3'],
    backgroundColor: colors['green-1'],
    textColor: colors['black-1'],
  },
  wrong: {
    borderColor: colors['red-3'],
    backgroundColor: colors['red-1'],
    textColor: colors['black-1'],
  },
  hover: {
    borderColor: colors['orange-3'],
    backgroundColor: colors['white-1'],
    textColor: colors['black-1'],
  },
} as const satisfies Record<string, ElementTheme>;
export type GameButtonThemes = keyof typeof gameButtonThemes;

export const amountThemes = {
  received: {
    borderColor: colors['grey-3'],
    backgroundColor: colors['white-1'],
    textColor: colors['grey-3'],
  },
  active: {
    borderColor: colors['orange-3'],
    backgroundColor: colors['white-1'],
    textColor: colors['orange-3'],
  },
  default: {
    borderColor: colors['grey-3'],
    backgroundColor: colors['white-1'],
    textColor: colors['black-1'],
  },
} as const satisfies Record<string, ElementTheme>;
export type AmountThemes = keyof typeof amountThemes;
