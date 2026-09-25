import { useState } from "react";
import { Link } from "react-router-dom";
import { degrauNames, exercises } from "../../content/course.js";
import { getPassedExercises } from "../../services/session-state.js";

export function ExercisesPage() {
  const [filter, setFilter] = useState(0);
  const passed = getPassedExercises();
  const list = exercises.filter((item) => !filter || item.step === filter);
  return <section className="exercise-view"><div className="section-heading"><div><span className="eyebrow">Escreva a sua solução</span><h2>Exercícios da trilha</h2><p>Do primeiro printf às funções. Cada desafio tem dica, entrada de exemplo e testes para comparar a saída.</p></div><span className="counter">{passed.size}/{exercises.length} com testes aprovados nesta visita</span></div><div className="exercise-filters" role="group" aria-label="Escolher degrau">{[0, 1, 2, 3, 4, 5].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item ? `Degrau ${item}` : "Todos"}</button>)}</div><div className="exercise-grid">{list.map((item) => <article className="exercise-card" key={item.id}><div className="exercise-meta">{degrauNames[item.step]}{passed.has(item.id) ? " · ✓ Testes aprovados" : ""}</div><h3>{item.title}</h3><p>{item.statement}</p><Link className="action" to={`/laboratorio/?exercicio=${item.id}`}>Resolver em C →</Link></article>)}</div></section>;
}
