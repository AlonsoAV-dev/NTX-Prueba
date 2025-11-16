import styles from '../app/casos/casos.module.css';

type AlertProps = {
    type: 'error' | 'success';
    message: string;
};

export default function Alert({ type, message }: AlertProps) {
    const className = type === 'error' ? styles.errorBanner : styles.successBanner;

    return <div className={className}>{message}</div>;
}
