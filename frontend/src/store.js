import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import { combineReducers, applyMiddleware,legacy_createStore as createStore} from "redux"
import { productDetailsReducer, productReducer } from "./component/reducers/productReducer"

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer
})

const initialState = {};
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;



// loading: false,
// error: null,
// products: [], // make sure this is initialized as an empty array
// productsCount: 0,
