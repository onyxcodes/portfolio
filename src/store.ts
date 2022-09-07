import { configureStore } from '@reduxjs/toolkit';
import ui, { UIState } from './features/ui';

export type StoreState = {
    ui: UIState;
}

export const store = configureStore({
  reducer: {
    ui
  },
});