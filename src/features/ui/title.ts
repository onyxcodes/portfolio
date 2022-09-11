import { createAction } from '@reduxjs/toolkit';

const action = createAction('setTitle', (title: string) => {
    return { payload: title };
});

export default action;