import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'

const QuizzContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizzContainer>
        <QuizLogo></QuizLogo>
        <Widget>
          <Widget.Header>
            <h1>
              Comidas típicas
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              A programação desafiando seus conhecimentos em comidas típicas do Brasil. 
          </p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>
              Outros desafios
            </h1>
            <p>
              Em breve ...
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizzContainer>
      <GitHubCorner projectUrl="https://github.com/JessikaFujimura" />
    </QuizBackground>
  )
}
