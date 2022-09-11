import { createAction } from '@reduxjs/toolkit';

const action = createAction('setLoading', (status: boolean) => {
    return { payload: status };
});

export default action;