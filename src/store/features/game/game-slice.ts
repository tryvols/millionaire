import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStep, QuestionAnswer } from '@/types/config.types';
import { GameStatus } from '@/types/game.types';
import gameConfig from '@/config/game-config.json';

export type GameState = Readonly<{
  activeStep: GameStep;
  gameStatus: GameStatus;
  steps: GameStep[];
  earned: number;
}>;

const steps = gameConfig.steps.sort();

const GameSlice = createSlice({
  name: 'game',

  initialState: {
    activeStep: steps[0],
    gameStatus: 'ready_to_start',
    steps,
    earned: 0,
  } satisfies GameState as GameState,

  reducers: {
    startGame(state) {
      return {
        ...state,
        gameStatus: 'ongoing',
        activeStep: state.steps[0],
        earned: 0,
      };
    },
    readyToStartGame(state) {
      return {
        ...state,
        gameStatus: 'ready_to_start',
      };
    },
    answerQuestion(state, action: PayloadAction<QuestionAnswer>) {
      const { amount } = state.activeStep;

      if (action.payload.isCorrect) {
        const activeStepId = state.steps.findIndex(
          (step) => state.activeStep.amount === step.amount,
        );

        const nextStep = state.steps[activeStepId + 1];
        if (nextStep === undefined) {
          return {
            ...state,
            earned: amount,
            gameStatus: 'finished',
          };
        }

        return {
          ...state,
          earned: amount,
          activeStep: nextStep,
        };
      }

      return {
        ...state,
        gameStatus: 'finished',
      };
    },
  },
});

export const { startGame, answerQuestion, readyToStartGame } = GameSlice.actions;

export const GameReducer = GameSlice.reducer;
