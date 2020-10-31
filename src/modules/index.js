import { combineReducers } from 'redux'
import { treeReducer } from '../store/reducers';

export default combineReducers({
  tree: treeReducer
})
