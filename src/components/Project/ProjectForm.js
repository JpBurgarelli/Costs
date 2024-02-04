import styles from './ProjectForm.module.css';
import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';
import { useEffect, useState } from 'react';

function ProjectForm({ handleSubmit, projectData, btnText }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch(`http://localhost:5000/categories`, {
      method: 'GET',
      headers: {
        'Contente-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((eror) => console.log(eror));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleonChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <div>
      <form onSubmit={submit} className={styles.formulario}>
        <Input
          type="text"
          text="Nome do Projeto"
          name="name"
          placeholder="Insira o nome do projeto"
          value={project.name ? project.name : ''}
          handleOnChange={handleonChange}
        />
        <Input
          type="number"
          text="Orcamento do Projeto"
          name="budget"
          placeholder="Insira o orcamento total"
          handleOnChange={handleonChange}
          value={project.budget ? project.budget : ''}
        />
        <Select
          name="category_id"
          text="Selecione a categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={project.category ? project.category.id : ''}
        />
        <SubmitButton text={btnText} />
      </form>
    </div>
  );
}

export default ProjectForm;
