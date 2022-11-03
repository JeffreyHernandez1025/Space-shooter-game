import useAllHighScores from "../../hooks/useAllHighScores";
import styled from "styled-components";
import bgImg from "../../assets/background.png";
import { useState } from "react";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${bgImg});
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto 100%;
  /*adjust s value for speed*/
  animation: animatedBackground 500s linear infinite;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const ScoreWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  text-align: center;
  width: 275px;
  height: 70px;
  margin-bottom: 50px;
  opacity: 0.75;
  transition: all ease-in-out 300ms;
  
  p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Header = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: red;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  outline: none;
  border-color: red;
  border-style: solid;

  &:hover {
    cursor: pointer;
  }
`;
const EditButton = styled.button`
color: black;
background-color: grey;
border-radius: 4px;
padding: 0.5rem 0.5rem;
outline: none;
border-color: grey;
border-style: solid;
margin-left: 10px;

&:hover {
  cursor: pointer;
}
`;


export default function HighScores() {
  // text input handles
const [userId, setUserId] = useState('');
const [userScore, setUserScore] = useState(0)
const [userName, setUserName] = useState('')
const [userKills, setUserKills] = useState(0)
const [isEditing, setIsEditing] = useState(false)
const [status, setStatus] = useState('');
  // object destructuring
  const { allScores, deleteScore, isDeleting, editScore } = useAllHighScores();
  // handling submit

  
  async function submitEdit(score, name, kills, id){
   try{
    id = userId
    score = userScore
    name = userName
    kills = userKills
    editScore(score, name, kills, id)
   }catch(e){
    console.log(e)
   }
  }

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log('score 👉️', userScore);
    console.log('name 👉️', userName);
    console.log('kills 👉️', userKills);

    // clear all input values in the form
    setUserScore(0)
    setUserId('')
    setUserKills(0)

    setIsEditing(false)
    submitEdit()
  };
  return (
    <PageWrapper>
      <Header>Space Shooter Scores</Header>
      {allScores.map((score, i) => (
        <ScoreWrapper key={i}>
          <p style={{fontSize: 7}}>{score._id}</p>
          <p>{score.name}</p>
          <p>{score.score}</p>
          <p>{score.kills}</p>
          <DeleteButton
            onClick={() => {
              console.log("hit delete");
              deleteScore(score._id);
            }}
          >
            {isDeleting === true ? "Is Deleting" : "Delete"}
          </DeleteButton>
          <EditButton onClick={() => {
            console.log('hit edit') 
            setIsEditing(true)
            setUserId(score._id)
            setUserScore(score.score)
            setUserName(score.name)
            setUserKills(score.kills)
          }}> Edit </EditButton>
          {isEditing === true ? 
          <form onSubmit={handleSubmit}>
            <input 
            id="user_score"
            name="user_score"
            type="number"
            onChange={event => setUserScore(event.target.value)}
            value={userScore}
            />
            <input 
            id="user_Name"
            name="user_Name"
            type="text"
            onChange={event => setUserName(event.target.value)}
            value={userName}
            />
            <input 
            id="user_Kills"
            name="user_Kills"
            type="number"
            onChange={event => setUserKills(event.target.value)}
            value={userKills}
            />
            <button type='submit'> Done </button>
          </form> : null}
        </ScoreWrapper>
      ))}
      {status && status}
    </PageWrapper>
  );
}
