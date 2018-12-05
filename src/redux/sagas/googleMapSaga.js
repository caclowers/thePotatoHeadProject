import { put, takeEvery } from 'redux-saga/effects';
import { GET_MAP } from '../actions/googleMapAction'
import { runStoreLocation, runGeocode,runLatandLong } from '../requests/googleMapRequest'

//Get data from database
//intercept from index.js
function* getAddress(action) {
    try {
        const location = yield runGeocode(action.payload.payload.streetAddress)
        const body = {
            longitude: location[0].geometry.location.lng,
            latitude: location[0].geometry.location.lat,
        }
       const checkData = yield runLatandLong()
       let flag = false;
       for (let i = 0; i < checkData.length; i++) {
           if (checkData[i].latitude === body.latitude && checkData[i].longitude === body.longitude) {
               flag = true;
               break;
           }
       }
       if (!flag){
            yield put({
                type: GET_MAP.STORE_GEO,
                payload: body
            })
       }

    } catch (error) {
        throw new Error(error.message);
    };
}
//This store the address of lat and long to database
function* storeLatAndLng(body){
    try{
        yield runStoreLocation(body.payload)
    }catch (error) {
        throw new Error(error.message)
    };
}

//this grab lat and long from database
function* getLatAndLng(){
    try{
      const location = yield runLatandLong()
       yield put({
        type: GET_MAP.USE_LAT_LNG,
        payload:location
       })
    }catch (error) {
        throw new Error(error.message);
    };
}

function* googleMapSaga() {
    yield takeEvery(GET_MAP.GET, getAddress)
    yield takeEvery(GET_MAP.STORE_GEO, storeLatAndLng)
    yield takeEvery(GET_MAP.LOCATION_LOADED , getLatAndLng)
}

export default googleMapSaga;