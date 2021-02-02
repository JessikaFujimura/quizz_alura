/* eslint-disable react/prop-types */
import React from 'react';
// import db from '../../../db.json';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativeForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${results.filter((x) => x).length} questões:`}
        </p>
        <ul>
          {results.map((i, index) => (
            <li>
              {`#${index} - Pergunta: `}
              {i === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const [select, setSelect] = React.useState(undefined);
  const isCorret = select === question.answer;
  const hasAlternativeSelected = select === undefined;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`${questionIndex + 1} pergunta de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <img
        src={question.image}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        alt="Descrição"
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          addResult(isCorret);
          setIsQuestionSubmited(true);
          setTimeout(() => {
            onSubmit();
            setIsQuestionSubmited(false);
            setSelect(undefined);
          }, 1 * 1000);
        }}
        >
          {question.alternatives.map((i, index) => {
            const alternativeStatus = isCorret ? 'SUCCESS' : 'ERROR';
            const isSelected = select === index;
            return (
              <Widget.Topic
                as="label"
                htmlFor={i}
                key={i}
                data-selected ={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  name={questionId}
                  type="radio"
                  id={i}
                  value={i}
                  onChange={() => setSelect(index)}
                />
                {i}
              </Widget.Topic>
            )
          })}
          {isQuestionSubmited && isCorret && <p>Você acertou! </p>}
          {isQuestionSubmited && !isCorret && <p>Que pena, você errou esta pergunta.</p>}
          <Button type="submit" disabled={hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setscreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const [results, setResults] = React.useState([]);

  function addResult(result) {
    return setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => { setscreenState(screenStates.QUIZ); }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setscreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
