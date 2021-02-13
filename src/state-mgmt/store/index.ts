import systemReducer, {
  requestLoginAction,
  requestLoginSuccessAction,
  requestCurrentUserActionSuccess,
  requestLoginActionFailure,
} from "./system/slice";

import filterReducer, {
  requesFilterActionFailure,
  requestFilterAction,
  requestFilterActionSuccess,
} from "./filter/slice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { doLoginEpic } from "./system/epics";
import { doFilterEpic } from "./filter/epics";
import { ActionType } from "typesafe-actions";
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from "connected-react-router";

type SystemActionsWithPayload =
  | typeof requestLoginAction
  | typeof requestLoginSuccessAction
  | typeof requestCurrentUserActionSuccess
  | typeof requestLoginActionFailure;

type FilterActionsWithPayload =
  | typeof requesFilterActionFailure
  | typeof requestFilterAction
  | typeof requestFilterActionSuccess;

type SystemActions = ActionType<SystemActionsWithPayload>;

type FilterActions = ActionType<FilterActionsWithPayload>;

const epics = combineEpics(doLoginEpic, doFilterEpic);

export const history = createBrowserHistory<RouterState>();
export const rootReducer = combineReducers({
  router: connectRouter(history),
  system: systemReducer,
  filter: filterReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware<
  SystemActions, // input actions
  SystemActions, // output actions
  RootState
>();

const epicMiddleware1 = createEpicMiddleware<
  FilterActions,
  FilterActions,
  RootState
>();

function configureAppStore(initialState?: any) {
  // configure middlewares
  const middlewares = [
    routerMiddleware(history),
    epicMiddleware,
    epicMiddleware1,
  ];
  // create store
  return configureStore<RootState>({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState: initialState,
  });
}

export const store = configureAppStore();
epicMiddleware.run(epics);
