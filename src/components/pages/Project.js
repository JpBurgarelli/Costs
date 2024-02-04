import { parse, v4 as uuidv4 } from 'uuid';
import style from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Layouts/Loading';
import Container from '../Layouts/Container';
import ProjectForm from '../Project/ProjectForm';
import Message from '../Layouts/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCaard';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false); // Faz um toggle que troca textos
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((dataJson) => {
          setProject(dataJson);
          setServices(dataJson.services);
        })
        .catch((err) => console.log('ERRO: ', err));
    }, 3000);
  }, [id]);

  function editPost(project) {
    setMessage('');

    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((dataJson) => {
        setProject(dataJson);
        setShowProjectForm(false);
        setMessage('Projeto Atualizado!');
        setType('success');
        //message
      })
      .catch((err) => console.log('ERRO: ', err));
  }

  function createService(project) {
    setMessage('');

    const lastService = project.services[project.services.length - 1];
    console.log(lastService, 'ultimo'); //pega o ultimo servico que acabou de adicionar.

    lastService.id = uuidv4(); //fornece um id unico para o ultimo service, pois será preciso imprimir na tela e o React pede uma chave key.

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //maximun value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado! Verifique o valor do serviço.');
      setType('error');
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((dataJson) => {
        setShowProjectForm(false);
      })
      .catch((err) => console.log('ERRO: ', err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, cost) {
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id,
    );
    const projectUpdated = project;
    projectUpdated.services = servicesUpdate;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((dataJson) => {
        setProject(projectUpdated);
        setServices(servicesUpdate);
        setMessage('Serviço removido com sucesso!');
        setType('success');
      })
      .catch((err) => console.log('ERRO: ', err));
  }

  return (
    <>
      {project.name ? (
        <div className={style.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={style.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={style.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : ' Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={style.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orcamento: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={style.project_info}>
                  <ProjectForm
                    btnText="Concluir Edição"
                    projectData={project}
                    handleSubmit={editPost}
                  />
                </div>
              )}
            </div>
            <div className={style.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={style.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={style.project_info}></div>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar um Servico"
                  projectData={project}
                />
              )}
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados. </p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
