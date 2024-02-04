import styles from './NewProject.module.css';
import ProjectForm from '../Project/ProjectForm';
import { useNavigate } from 'react-router-dom';

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    project.cost = 0;
    project.services = [];
    fetch(`http://localhost:5000/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const state = { message: 'Projeto criado com sucesso!' };
        navigate('/projects', { state });
      })
      .catch((error) => console.log('ERRO: ', error));
  }
  return (
    <div className={styles.NewProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
