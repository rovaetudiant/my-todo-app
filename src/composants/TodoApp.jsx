import React, { useState } from 'react';
import './TodoApp.css'; 

function TodoApp() {
  const [taches, setTaches] = useState([]);
  const [texteSaisi, setTexteSaisi] = useState('');

  
  const handleAjouter = () => {
    if (texteSaisi.trim() !== '') {
      
      const nouvelleTache = {
        id: Date.now(), 
        texte: texteSaisi,
        estFaite: false 
      };
      setTaches([...taches, nouvelleTache]); 
      setTexteSaisi(''); 
    }
  };

 
  const handleToggleTache = (idTache) => {
    const tachesModifiees = taches.map(tache => {
      if (tache.id === idTache) {
        return { ...tache, estFaite: !tache.estFaite }; 
      }
      return tache;
    });
    setTaches(tachesModifiees);
  };

  const handleSupprimer = (idTache) => {
    const nouvellesTaches = taches.filter(tache => tache.id !== idTache);
    setTaches(nouvellesTaches);
  };

  
  const tachesRestantes = taches.filter(tache => !tache.estFaite).length;

  return (
    <div className="todo-container">
      <h2>Ma Todo App</h2>
      
      <div className="todo-input-section">
        <input 
          type="text" 
          value={texteSaisi} 
          onChange={(e) => setTexteSaisi(e.target.value)} 
          placeholder="Ajouter une tâche..."
          className="todo-input"
        />
        <button onClick={handleAjouter} className="btn-ajouter">
          Ajouter
        </button>
      </div>

      <ul className="todo-list">
        {taches.map((tache) => (
          <li key={tache.id} className="todo-item">
            <div className="todo-item-left">
             
              <input 
                type="checkbox" 
                checked={tache.estFaite}
                onChange={() => handleToggleTache(tache.id)}
                className="todo-checkbox"
              />
             
              <span className={`todo-text ${tache.estFaite ? 'barre' : ''}`}>
                {tache.texte}
              </span>
            </div>
            <button 
              onClick={() => handleSupprimer(tache.id)} 
              className="btn-supprimer"
            >
              Supprimer
            </button>
          </li>

        ))}
      </ul>


      <div className="todo-footer">
        {taches.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : (
          <p>Il vous reste <strong>{tachesRestantes}</strong> tâche(s) sur {taches.length}.</p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;