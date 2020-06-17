import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Repository #${repositories.length + 1}`,
      url: 'https://github.com/brunowxd1/mod_2_react',
      techs: ['JavaScript', 'React', 'ReactJS']
    });

    const repo = res.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const updtRepo = repositories.filter(rep => rep.id !== id);

    setRepositories(updtRepo);
  }

  return (
    <div>
      <ul data-testid='repository-list'>

        {repositories.map(rep =>
           <li key={rep.id}>
             {rep.title}
             <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
           </li>
        )}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
