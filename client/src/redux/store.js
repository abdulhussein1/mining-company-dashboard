import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

// const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
//   // If the "action" is actually a function instead...
//   if (typeof action === 'function') {
//     // then call the function and pass `dispatch` and `getState` as arguments
//     return action(storeAPI.dispatch, storeAPI.getState);
//   }

//   // Otherwise, it's a normal action - send it onwards
//   return next(action);
// };

export function configureStore(preloadedState = {}) {
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(thunk),
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(
    reducer,
    preloadedState,
    composedEnhancers,
  );
  return store;
}

export default configureStore;
