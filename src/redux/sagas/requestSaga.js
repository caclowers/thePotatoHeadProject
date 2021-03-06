import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  HANDLE_GET_ALL_REQUESTS,
  HANDLE_TOGGLE_REQUEST,
  getAllRequests,
  getAllRequestsSuccess,
  getAllRequestsFail,
  updateRequest,
  updateRequestSuccess,
  updateRequestFail
} from '../actions/requestActions';

function* handleGetRequests() {
  try {

    yield put(getAllRequests());
    let { data } = yield axios.get('/api/request');
    yield put(getAllRequestsSuccess(data));
  } catch (err) {

    yield put(getAllRequestsFail(err));

  }
}

// responsible for toggling between sent/unsent
function* toggleRequestSent(action) {
  try {

    const request = {
      ...action.payload,
      markedSent: !action.payload.markedSent
    }

    yield put(updateRequest());
    let { data } = yield axios.put(`/api/request/${request._id}`, request);
    yield put(updateRequestSuccess(data));
     
  } catch (err) {

    yield put(updateRequestFail(err.message));

  }
}

function* requestSaga() {
  yield takeLatest(HANDLE_GET_ALL_REQUESTS, handleGetRequests);
  yield takeLatest(HANDLE_TOGGLE_REQUEST, toggleRequestSent);
} 

export default requestSaga;
