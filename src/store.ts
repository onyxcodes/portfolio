import { configureStore } from '@reduxjs/toolkit';
import ui, { UIState } from 'features/ui';
import content, { ContentState } from 'features/content';

export type StoreState = {
    ui: UIState;
    content: ContentState
}

export const store = configureStore({
  reducer: {
    ui,
    content
  },
});