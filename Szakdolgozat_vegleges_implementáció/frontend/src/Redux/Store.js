import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { Reducers } from '../Redux/Reducers/Reducers';
import { Loading } from './Reducers/Loading';

const composeEnhancers = composeWithDevTools({

});



const rootReducers = combineReducers({
    Reducers,
    Loading
});




const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);


export default store;