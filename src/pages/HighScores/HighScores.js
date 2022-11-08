import useAllHighScores from "../../hooks/useAllHighScores";
import styled from "styled-components";
import bgImg from "../../assets/background.png";
import { useState } from "react";
import useEditHighScore from "../../hooks/useEditHighScore";
import { redirect } from "react-router-dom";

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
  width: 275px;
  opacity: .75;
  transition: all ease-in-out 300ms;
  display: flex;
  
  p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ButtonsContainer = styled.div`
align-items: center;
flex: 1;
align-content: center;
`;

const Header = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`;

const LeaderBoardData = styled.div`
background-color: purple;
border-radius: 4px;
padding: 0.5rem 0.5rem;
width: 275px;
transition: all ease-in-out 300ms;
display: flex;
margin-bottom: 10px;
margin-left: 15px;
`

const DeleteButton = styled.button`
  color: #fff;
  background-color: red;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  outline: none;
  border: none;
  margin-top: 2.5px;
  float: right;

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
border: none;
align-self: center;
margin-top: 2.5px;

&:hover {
  cursor: pointer;
}
`;

const LeaderBoardWrapper = styled.div`
margin-bottom: 10px;
`;

const Username = styled.p`
font-weight: bold;
`
const KillsContainer = styled.div`
margin-right: 80px;
width: 80px;
`
const Kills = styled.p`
font-weight: bold;
text-align: center;
color: red
`

const Score = styled.p`
font-weight: bold;
color: white;
display: inline;
background-color: blue;
border-radius: 8px;
padding-left: 10px;
padding-right: 10px;
`

const ScoreContainer = styled.div`
flex: 1;
justify-content: right;
`
const FormWrapper = styled.div`
display: flex;
flex-direction: column;
`
const SubmitButton = styled.button`
color: dark-green;
background-color: lime;
border-radius: 4px;
padding: 0.5rem 0.5rem;
outline: none;
border: none;
align-self: center;
margin-top: 2.5px;

&:hover {
  cursor: pointer;
}
`
const SubmitButtonWrapper = styled.div`
display: flex;
justify-content: center;
`


export default function HighScores() {
  // text input handles
  const [userId, setUserId] = useState('');
  const [userScore, setUserScore] = useState(0)
  const [userName, setUserName] = useState('')
  const [userKills, setUserKills] = useState(0)
  // object destructuring
  const { allScores, deleteScore, isDeleting, setAllScores } = useAllHighScores();
  const { editScore, isEditing, setIsEditing } = useEditHighScore();
  // handling submit

  async function submitEdit(score, name, kills, id) {
    try {
      id = userId
      score = userScore
      name = userName
      kills = userKills
      editScore(score, name, kills, id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    window.location.reload();

    // 👇️ access input values here
    console.log('score 👉️', userScore);
    console.log('name 👉️', userName);
    console.log('kills 👉️', userKills);

    // clear all input values in the form
    setUserScore(0)
    setUserId('')
    setUserKills(0)
    setUserName('')


    submitEdit()
    setIsEditing(false)
  };
  return (
    <PageWrapper>
      <Header>Space Shooter Scores</Header>
      {isEditing === false ?
      <LeaderBoardData>
        <p style={{ margin: 0, 
          marginLeft: 10, 
          fontWeight: "bold", 
          color: 'white' }}>
          name
        </p>
        <p style={{ 
          margin: 0, 
          width: 81, 
          textAlign: 'center', 
          fontWeight: "bold", 
          color: "red" }}>
          kills
        </p>
        <p style={{
          margin: 0, 
          marginLeft: 88, 
          color: 'white', 
          fontWeight: 'bold',
          display: 'inline',
        }}>
          score
        </p>
      </LeaderBoardData> : null}
      {allScores.map((score, i) => (
        <LeaderBoardWrapper>
              <div style={{display: 'flex',}}>
          <ButtonsContainer>

            <DeleteButton
              onClick={() => {
                console.log("hit delete");
                deleteScore(score._id);
              }}
            >
              {isDeleting === true ? "Deleting.." : "Delete"}
            </DeleteButton>

          </ButtonsContainer>

          <ScoreWrapper key={i}>
            <Username>

              {score.name}

            </Username>
            <KillsContainer>
              <Kills>

                {score.kills}

              </Kills>
            </KillsContainer>
            <ScoreContainer>

              <Score>

                {score.score}

              </Score>

            </ScoreContainer>

          </ScoreWrapper>

          <ButtonsContainer>

            <EditButton onClick={() => {
              console.log('hit edit')
              const id = score._id
              setAllScores(allScores.filter((score) => score._id === id));
              setIsEditing(true)
              // default the values
              setUserId(score._id)
              setUserScore(score.score)
              setUserName(score.name)
              setUserKills(score.kills)
            }}>
              Edit
            </EditButton>
           
          </ButtonsContainer>
          </div>
 {isEditing === true ?
              <form onSubmit={handleSubmit}>
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
                <input
                  id="user_score"
                  name="user_score"
                  type="number"
                  onChange={event => setUserScore(event.target.value)}
                  value={userScore}
                />
                <SubmitButtonWrapper>
                <SubmitButton type='submit'> Done </SubmitButton>
                </SubmitButtonWrapper>
              </form> : null}
        </LeaderBoardWrapper>

      ))}
    </PageWrapper>
  );
}
