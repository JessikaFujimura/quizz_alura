import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizzContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 25px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizzContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>
              {db.title}
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              {db.description}
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuário"
                type="text"
                placeholder="Diz ai seu nome"
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" disabled={name.length === ''}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>
              Quizzes da galera
            </h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [project, gitHubUser] = link.replace(/https:\/\//g, '')
                  .replace('.vercel.app/', '')
                  .split('.');
                return (
                  <li>
                    <Widget.Topic href={`quiz/${project}___${gitHubUser}`} rel="noreferrer">{`${gitHubUser}/${project}`}</Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizzContainer>
      <GitHubCorner projectUrl="https://github.com/JessikaFujimura" />
    </QuizBackground>
  );
}
