import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess } from "./user.slice";

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const user = yield call(() =>
      Promise.resolve({ name: action.payload.name })
    );
    yield put(loginSuccess(user));
  } catch (error) {
    console.error("Login failed", error);
  }
}

export function* userSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
