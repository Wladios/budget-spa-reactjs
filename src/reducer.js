import { reducer as categories } from './categories';
import { reducer as operations } from './operations';
import { reducer as table } from './Table';
import { combineReducers } from 'redux';

export default combineReducers({
  months: (state = []) => state,
  categories,
  operations,
  table
});
