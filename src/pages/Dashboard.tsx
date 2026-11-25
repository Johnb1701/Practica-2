import link from 'react-router-dom';
import type {Dashboard} from '../api';

export default function Dashboard({item, linkToDetail = false}: Dashboard) {
    const content = (
        <>
        <h2 className="text-lg font-bold">Dashboard</h2>
        <p>Nombre: {item.name}</p>
        <p>Disciplina: {item.discipline}</p>
        <p>Fecha: {item.date}</p>
        <p>Vacantes: {item.vacancies}</p>

        </>
    );
    const ClassName = 'p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-300';

    return linkToDetail ? (
        <link to={`/dashboard/${item.name}`} className={ClassName}>
            {content}
            </link>
    ) : (
        <div className={ClassName}> {content}</div> );
    }