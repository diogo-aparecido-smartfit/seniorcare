import { all } from "redux-saga/effects";
import { userSaga } from "./modules/user/user.saga";

export function* rootSaga() {
  yield all([userSaga()]);
}
