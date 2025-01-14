import axios from "axios";
import { API_URL } from "../constants";

/**
 * Make api request for all the users' scores
 * @returns
 */
export default function editHighScore(score, name, kills, id) {
  const url = API_URL + "/update-score";
  const  data = {
    _id: id,
    score: score,
    name: name,
    kills: kills
  }
  console.log(data)
  return axios.put(url, 
   data
  )
}
