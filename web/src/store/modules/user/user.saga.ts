import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess } from "./user.slice";
import { IUser } from "./user.types";

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<unknown, void, IUser> {
  try {
    const user = yield call(() =>
      Promise.resolve({ name: action.payload.name })
    );
    yield put(loginSuccess(user as IUser));
  } catch (error) {
    console.error("Login failed", error);
  }
}

export function* userSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
