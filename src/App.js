import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api.js';

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio',
      url: 'https://github.com/murylocesar/Desafio-02--Conceitos-do-Node.js',
      techs: ['Node.js',
        'SQL'],
      likes: 0
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {

      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);

    });


  }
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repository =>

            <li id={repository.id}> {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          )
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
