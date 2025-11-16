'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api';
import { setToken } from '../../lib/auth';
import styles from './login.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Maneja el envío del formulario de login
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authApi.login(username, password);
            setToken(data.token);
            router.push('/casos');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Iniciar Sesión</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="admin123"
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </button>
                </form>

                <p className={styles.hint}>
                    Usuario: <strong>admin</strong> / Contraseña: <strong>admin123</strong>
                </p>
            </div>
        </div>
    );
}
