import { useState } from "react";

import editHighScore from "../api/editHighScore";


/**
 * React hook that fetchs the data from server
 * @returns
 */
export default function useEditHighScore() {
  const [isEditing, setIsEditing] = useState(false)

  // makes api req to edit
  const editScore = async (score, name, kills, id) => {
    try{
    
      const response = await editHighScore(score, name, kills, id);
      console.log(response.data)
      console.log('success, score was edited')
      setIsEditing(false)
    }catch(e){
      console.log(e)
      setIsEditing(false)
    }
  }
  return {
    // put req
    editScore,
    isEditing,
    setIsEditing,
  };
}
