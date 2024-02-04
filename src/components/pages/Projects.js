import Message from '../Layouts/Message';

import { useLocation } from 'react-router-dom';

import styles from './Projects.module.css';

import Container from '../Layouts/Container';

import LinkButton from '../Layouts/LinkButton';

import ProjectCard from '../Project/ProjectCard';

import { useState, useEffect } from 'react';

import Loading from '../Layouts/Loading';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation();
  let message = '';
  if (location.state) {
    message = location.state.message;
  }
  //setTimeOut serve, unica e exclusivamente, para mostrar o loader
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((dataJson) => {
          console.log(dataJson);
          setProjects(dataJson);
          console.log(dataJson, 'pepino');
          setRemoveLoading(true);
        })
        .catch((err) => console.error('ERROR:', err));
    }, 3000);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage('Projeto removido com sucesso! ');
      })
      .catch((error) => console.log(`Seu erro: ${error}`));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/Newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={
                project.category
                  ? project.category.name
                  : 'Categoria não definida'
              }
              handleRemove={removeProject}
            />
          ))}

        {!removeLoading && <Loading />}

        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
