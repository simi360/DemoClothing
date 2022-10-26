import {compose, createStore, applyMiddleware} from 'redux';
// importing self-made logger, can also import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


/**
 * Were using blacklist before to blacklist 'user' state as AuthListener persists the user.
 * Now using whitelist to only persist cart items
 * Not persisting categories, as using redux-thunk to do the async function and using Spinner to let user know that the
 * page is loading
 */
const persistConfig = {
  key: 'root',
  storage,
  // blackList: ['user']
  whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, sagaMiddleware].filter(Boolean);

// when using thunk:
// const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware,thunk].filter(Boolean);
// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//     Boolean
//   );

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);