"use client";

import { useEffect, useState } from "react";
import styles from "./BooksList.module.css";

interface Author {
    name: string;
}

interface Book {
    id: number;
    title: string;
    authors: Author[];
}

export default function BooksList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("https://gutendex.com/books/?page=1");

            if (!res.ok) throw new Error("Error al obtener libros");
            const data = await res.json();

            if (!data.results) {
                throw new Error("Se produjo un error");
            }

            setBooks(data.results.slice(0, 10));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className={styles.loaderContainer}>
                <span className={styles.loadingText}>Cargando libros...</span>
            </div>
        );
        
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Libros</h2>

            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id} className={styles.row}>
                            <td>{index + 1}</td>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.authors?.[0]?.name || "Autor desconocido"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
