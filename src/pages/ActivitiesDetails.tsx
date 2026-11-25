import {useEffect, useState} from "react";
import {api, apiError} from "../api";
import type {ActivityDetails, Page} from "../api";
import Dashboard from "./Dashboard";
import Pagination from "../components/Pagination";

const PageSize = 5;



export default function Activities() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<Page<ActivityDetails> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get<Page<ActivityDetails>>(`/api/activities?page=${page}&size=${PageSize}`)
            .then(response => {
                setData(response.data);
                setError('');
            })
            .catch(err => setError(apiError(err).message))
            .finally(() => setLoading(false));
    }, [page]);


    const changePage = (newPage: number) => {
        setLoading(true);
        setPage(newPage);
    };


    return (
        <section className='flex flex-col  gap-4'>
            <h1 className='text-2xl font-bold'>Actividades</h1>
            {loading && <p>Cargando...</p>}
            {!loading && error && <p className='text-red-600'>{error}</p>}
            {!loading && !error && data && (
                <>
                    {data.items.length === 0 ? (
                        <p>No hay actividades disponibles.</p>
                    ) : (
                            <div clasName = "grid gap-4 sm:gird-cols-2">
                                {data.items.map(activity => (
                                    <Dashboard
                                        key={activity.id} activity={activity} linkToDetail/>
                                ))}
                            </div>
                            )}
                            <Pagination page =={data.page} totalPages={data.totalPages} onPageChange={changePage}/>
                </>
            )}
        </section>
    );
}