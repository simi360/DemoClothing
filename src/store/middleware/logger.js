export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
      console.log('DOES NOT HAVE A TYPE', action.type)
      return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
  
    next(action);
  
    console.log('Next State: ', store.getState());
  }