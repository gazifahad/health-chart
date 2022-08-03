import { configureStore } from '@reduxjs/toolkit'
// import CounterReducer  from './../features/counter/CounterSlice';
// import PostReducer  from './../features/posts/postsSlice';
import usersReducer from '../features/chartSlice';
const store=configureStore({
    reducer: {
        users:usersReducer,
    },
});

export default store;