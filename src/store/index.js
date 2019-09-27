import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';


// // import { persistStore, persistReducer } from 'redux-persist';
// import { persistStore, autoRehydrate,persistReducer } from 'redux-persist-immutable';
// // import createMigration from 'redux-persist-migrate'
// import immutableTransform from 'redux-persist-transform-immutable'
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//     transforms: [immutableTransform()],
//     key: 'root',
//     storage: storage,
//     stateReconciler: autoMergeLevel2// 查看 'Merge Process' 部分的具体情况
// };

// const persistedReducer = persistReducer(persistConfig, reducers)
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middlewares = composeEnhancers(applyMiddleware(thunk));
// export const store = createStore(persistedReducer, middlewares);

// export const persistor = persistStore(store)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))

export default store