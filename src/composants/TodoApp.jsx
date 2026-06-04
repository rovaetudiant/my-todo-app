import React, { useState } from 'react';
import './TodoApp.css'; 

function TodoApp() {
  const [taches, setTaches] = useState([]);
  const [texteSaisi, setTexteSaisi] = useState('');

  // 1. Fampiasana rehefa manampy asa vaovao
  const handleAjouter = () => {
    if (texteSaisi.trim() !== '') {
      // Ovaina ho Objet misy "id" sy "estFaite: false" ilay asa vaovao
      const nouvelleTache = {
        id: Date.now(), // Mba hahatonga ny id tsy hitovy mihitsy
        texte: texteSaisi,
        estFaite: false // False satria mbola tsy vita rehefa ampidirina vao voalohany
      };
      setTaches([...taches, nouvelleTache]); 
      setTexteSaisi(''); 
    }
  };

  // 2. Fampiasana rehefa manindry ilay carré (Checkbox)
  const handleToggleTache = (idTache) => {
    const tachesModifiees = taches.map(tache => {
      if (tache.id === idTache) {
        return { ...tache, estFaite: !tache.estFaite }; // Avadika ny sandany (true/false)
      }
      return tache;
    });
    setTaches(tachesModifiees);
  };

  // 3. Fampiasana rehefa mamafa asa
  const handleSupprimer = (idTache) => {
    const nouvellesTaches = taches.filter(tache => tache.id !== idTache);
    setTaches(nouvellesTaches);
  };

  // Hikajiana ny isan'ny asa mbola tsy vita
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
              {/* Ilay carré (Checkbox) */}
              <input 
                type="checkbox" 
                checked={tache.estFaite}
                onChange={() => handleToggleTache(tache.id)}
                className="todo-checkbox"
              />
              {/* Ny soratra: asiana class "barre" raha toa ka true ny estFaite */}
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

      {/* Ilay fampisehoana ny isan'ny asa eo ambany */}
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