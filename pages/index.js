import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Container from '../src/components/Container';
import ExtraContainer from '../src/components/ExtraContainer';

function getYouTubeId(youtubeURL) {
  return youtubeURL
    .replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
}

function VideoCard({ videoTitle, videoURL, categoryColor }) {
  const image = `https://img.youtube.com/vi/${getYouTubeId(videoURL)}/hqdefault.jpg`;
  return (
    <Container.Video
      url={image}
      href={videoURL}
      target="_blank"
      style={{ borderColor: categoryColor || 'red' }}
      title={videoTitle}
    />
  );
}

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          OtávioQuiz - Caverna do Dragão
          {db.title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Informe seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Bora Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={name ? `/quiz/${projectName}___${githubUser}` : ``}
                      id={name ? `` : `disabled`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0'},
            hidden: { opacity: 0, x: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>

      <ExtraContainer>
        <Container
          as={motion.section}
          transition={{ delay: 0.75, duration: 0.75 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Container.Header>
            <h1>Assista a todos os episódios!</h1>
          </Container.Header>
          <VideoCard 
            videoTitle={`Caverna do Dragão Todos os Episódios Completos Dublado HD`}
            videoURL={`https://www.youtube.com/watch?v=5fLMmDxrEUQ&t=148s&ab_channel=EngenheiroDelmedVeras`}
            categoryColor={db.theme.colors.primary}
          />
        </Container>

        <Container
          as={motion.section}
          transition={{ delay: 1, duration: 0.75 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Container.Header>
            <h1>Leia o último episódio!</h1>
          </Container.Header>
          <Container.Content>
            <ul>
              <li>
                <Container.Topic
                  as={Link}
                  href={`http://complexogeek.com/2013/08/20/o-verdadeiro-final-de-a-caverna-do-dragao-em-quadrinhos/`}
                >
                  Requiem: O último episódio da Caverna do Dragão!
                </Container.Topic>
              </li>
            </ul>
          </Container.Content>
        </Container>
      </ExtraContainer>

      <GitHubCorner projectUrl="https://github.com/OtavioPinheiro" />
    </QuizBackground>
  );
}
