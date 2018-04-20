/**
 * Created by araam on 9/3/17.
 */
import axios from 'axios';
import constants from '../constants';

class BirdApiService {
  // similar to disp
  // static instance (url = 'http://localhost:9001/api/ps/birds') {
  //   console.log('in BirdApiService, instance');
  //   return axios.create('http://localhost:9001/api/ps/birds', {});
  // }

  // static post (url, data, headers) {
  //   console.log('in BirdApiService, post');
  //   return this.instance().post(url, data, headers);
  // }
  //
  // static get (path, headers, url) {
  //   console.log('in BirdApiService, get');
  //   return this.instance().get(this.instance(url).defaults.baseURL + path, headers);
  // }

  // similar to rp
  static getAllBirds () {
    console.log('in BirdApiService, getAllBirds');
    return axios.get('http://localhost:9001/api/ps/birds', {});
  }

  static saveBirdToDB (data) {
    console.log('in BirdApiService.saveBirdToDB, bird=' + JSON.stringify(data.bird));

    axios.post('http://localhost:9001/api/ps/birds', data.bird)
      .then(function (response) { console.log('in BirdApiService.saveBirdToDB, response = ' + JSON.stringify(response)); })
      .catch(function (error) { console.log( 'in BirdApiService.saveBirdToDB, error = ' + JSON.stringify(error)); });
  }
  /*
   to add a bird in postman,
   Post:
   http://localhost:9001/api/ps/birds
   header:
   Content-Type: application/json
   body:
   {
   "species": "Sanderling",
   "image": "Sanderling-Vyn_081103_0167.jpg",
   "sound": "210A.mp3"
   }
   * */
}

export default BirdApiService;
