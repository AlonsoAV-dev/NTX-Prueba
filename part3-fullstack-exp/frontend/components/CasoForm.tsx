'use client';

import { useState } from 'react';
import styles from './CasoForm.module.css';

type CasoFormProps = {
    onSubmit: (caso: { nombre: string; descripcion: string; estado: string }) => void;
};

export default function CasoForm({ onSubmit }: CasoFormProps) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Abierto');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!nombre || !descripcion) {
            alert('Por favor completa todos los campos');
            return;
        }

        onSubmit({ nombre, descripcion, estado });

        setNombre('');
        setDescripcion('');
        setEstado('Abierto');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>Nombre del caso:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={styles.input}
                    placeholder="Ej: Caso 123"
                    required
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Descripción:</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className={styles.textarea}
                    placeholder="Describe el caso..."
                    rows={3}
                    required
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Estado:</label>
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className={styles.input}
                >
                    <option value="Abierto">Abierto</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Cerrado">Cerrado</option>
                </select>
            </div>

            <button type="submit" className={styles.button}>
                Crear Caso
            </button>
        </form>
    );
}
