import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; // <-- THÊM COMPOSE VÀO ĐÂY
import rootReducer from './rootReducer';
import  thunk  from 'redux-thunk';

// Cấu hình Redux DevTools (nếu dùng)
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; // <-- compose đã được import

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;