import styles from '../app/casos/casos.module.css';

type HeaderProps = {
    onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
    return (
        <div className={styles.header}>
            <h1>Gestión de Casos</h1>
            <button onClick={onLogout} className={styles.logoutButton}>
                Cerrar Sesión
            </button>
        </div>
    );
}
