import { READ_EVENTS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      console.log(action);
      return state;
    default:
      return state;
  }
};
