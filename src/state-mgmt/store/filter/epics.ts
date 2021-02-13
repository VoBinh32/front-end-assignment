import { Epic } from "redux-observable";
import { from, of, defer } from "rxjs";
import { switchMap, filter, map, catchError } from "rxjs/operators";
import { ActionType } from "typesafe-actions";

import {
  requesFilterActionFailure,
  requestFilterAction,
  requestFilterActionSuccess,
} from "./slice";

import { RootState } from "../index";

import { Observable } from "rxjs/Observable";

import { getDate } from "../../../services/api/api";

type SourceActions =
  | typeof requesFilterActionFailure
  | typeof requestFilterActionSuccess
  | typeof requestFilterAction;

type Action = ActionType<SourceActions>;

export const doFilterEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(requestFilterAction.match),
    switchMap<Action, Observable<Action>>((action) =>
      defer(() =>
        from(
          getDate(action.payload.startDate.toDate(), action.payload.endDate)
        ).pipe(
          map(requestFilterActionSuccess),
          catchError((error) => of(requesFilterActionFailure(error)))
        )
      )
    )
  );
