import styles from '../app/casos/casos.module.css';

type Caso = {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
};

type CasosTableProps = {
    casos: Caso[];
    onDelete: (id: number) => void;
};

export default function CasosTable({ casos, onDelete }: CasosTableProps) {
    const getBadgeClass = (estado: string) => {
        if (estado === 'Abierto') return styles.badgeAbierto;
        if (estado === 'En proceso') return styles.badgeProceso;
        return styles.badgeCerrado;
    };

    if (casos.length === 0) {
        return <p>No hay casos registrados</p>;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Nombre</th>
                    <th className={styles.th}>Descripción</th>
                    <th className={styles.th}>Estado</th>
                    <th className={styles.th}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {casos.map((caso) => (
                    <tr key={caso.id} className={styles.tr}>
                        <td className={styles.td}>{caso.id}</td>
                        <td className={styles.td}>{caso.nombre}</td>
                        <td className={styles.td}>{caso.descripcion}</td>
                        <td className={styles.td}>
                            <span className={`${styles.badge} ${getBadgeClass(caso.estado)}`}>
                                {caso.estado}
                            </span>
                        </td>
                        <td className={styles.td}>
                            <button
                                onClick={() => onDelete(caso.id)}
                                className={styles.deleteButton}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
