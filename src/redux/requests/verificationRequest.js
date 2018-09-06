import axios from 'axios'



export function runVerification(action){
    console.log('did we get the data to request?', action)
    const url=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${action.payload.input}&types=hospital&key=AIzaSyAIQHnEnIgGsF0oihJbaw7V7Q7ID_Ybkts`
    // return axios.get(`/api/verify/${action.payload.input}`)
    return axios.get(url)
    .then(response => response.data)
    .catch((error) => { throw error; });
}