import { configureStore } from '@reduxjs/toolkit';
import { GameReducer } from './features/game/game-slice';

export const makeStore = () => configureStore({
  reducer: GameReducer,
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
