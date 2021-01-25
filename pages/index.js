import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'

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
        <Widget>
          <Widget.Header>
            <h1>
              The Legend of Zelda
          </h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Toffee I love pudding marzipan. I love croissant jujubes topping tart bear claw carrot cake tart. I love oat cake croissant cupcake chocolate cake tootsie roll bear claw icing tootsie roll.
          </p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>
              The Legend of Zelda
            </h1>
            <p>
              Toffee I love pudding marzipan. I love croissant jujubes topping tart bear claw carrot cake tart.
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizzContainer>
      <GitHubCorner projectUrl="https://github.com/JessikaFujimura" />
    </QuizBackground>
  )
}
