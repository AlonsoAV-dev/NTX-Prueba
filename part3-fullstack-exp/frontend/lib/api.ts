const API_URL = 'http://localhost:4000';

export const casosApi = {
    // Obtiene todos los casos desde el backend
    async getAll(token: string) {
        const response = await fetch(`${API_URL}/casos`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar casos');
        }

        return response.json();
    },

    // Crea un nuevo caso en el backend
    async create(token: string, caso: { nombre: string; descripcion: string; estado: string }) {
        const response = await fetch(`${API_URL}/casos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(caso),
        });

        if (!response.ok) {
            throw new Error('Error al crear caso');
        }

        return response.json();
    },

    // Elimina un caso por su ID
    async delete(token: string, id: number) {
        const response = await fetch(`${API_URL}/casos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar caso');
        }

        return response.json();
    },
};

export const authApi = {
    // Realiza el login y retorna el token JWT
    async login(username: string, password: string) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        return data;
    },
};
