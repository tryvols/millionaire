import { PayloadAction } from '@reduxjs/toolkit';
import { GameConfig, GameStep, QuestionAnswer } from '@/types/config.types';
import { GameStatus } from '@/types/game.types';
import gameConfig from '@/config/game-config.json';
import createAppSlice from '@/lib/create-app-slice';

export type GameState = Readonly<{
  activeStep: GameStep;
  gameStatus: GameStatus;
  earned: number;
  config: GameConfig;
}>;

const steps = gameConfig.steps.sort();

const initialState: GameState = {
  activeStep: steps[0],
  gameStatus: 'ready_to_start',
  earned: 0,
  config: {
    ...gameConfig,
    steps,
  },
};

export const gameSlice = createAppSlice({
  name: 'game',
  initialState,
  reducers: (create) => ({
    startGame: create.reducer((state) => ({
      ...state,
      gameStatus: 'ongoing',
      activeStep: state.config.steps[0],
      earned: 0,
    })),

    readyToStartGame: create.reducer((state) => ({
      ...state,
      gameStatus: 'ready_to_start',
    })),

    answerQuestion: create.reducer((state, action: PayloadAction<QuestionAnswer>) => {
      const { amount } = state.activeStep;

      if (action.payload.isCorrect) {
        const activeStepId = state.config.steps.findIndex(
          (step) => state.activeStep.amount === step.amount,
        );

        const nextStep = state.config.steps[activeStepId + 1];
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
    }),
  }),
});

export const { startGame, answerQuestion, readyToStartGame } = gameSlice.actions;
