'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { casosApi } from '../../lib/api';
import { getToken, removeToken } from '../../lib/auth';
import CasoForm from '../../components/CasoForm';
import CasosTable from '../../components/CasosTable';
import Header from '../../components/Header';
import Alert from '../../components/Alert';
import styles from './casos.module.css';

type Caso = {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
};

export default function CasosPage() {
    const [casos, setCasos] = useState<Caso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    // Carga la lista de casos desde el backend
    const fetchCasos = async () => {
        const token = getToken();

        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const data = await casosApi.getAll(token);
            setCasos(data);
        } catch (err) {
            setError('Error al cargar casos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCasos();
    }, []);

    // Crea un nuevo caso y actualiza la lista
    const handleCrearCaso = async (caso: Omit<Caso, 'id'>) => {
        const token = getToken();
        if (!token) return;

        try {
            await casosApi.create(token, caso);
            setSuccess('Caso creado correctamente');
            fetchCasos();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al crear caso');
        }
    };

    // Elimina un caso después de confirmar con el usuario
    const handleEliminar = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este caso?')) return;

        const token = getToken();
        if (!token) return;

        try {
            await casosApi.delete(token, id);
            setSuccess('Caso eliminado correctamente');
            fetchCasos();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al eliminar caso');
        }
    };

    // Cierra sesión y redirige al login
    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    return (
        <div className={styles.container}>
            <Header onLogout={handleLogout} />

            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

            <div className={styles.content}>
                <div className={styles.formSection}>
                    <h2>Crear Nuevo Caso</h2>
                    <CasoForm onSubmit={handleCrearCaso} />
                </div>

                <div className={styles.tableSection}>
                    <h2>Lista de Casos</h2>
                    <CasosTable casos={casos} onDelete={handleEliminar} />
                </div>
            </div>
        </div>
    );
}
