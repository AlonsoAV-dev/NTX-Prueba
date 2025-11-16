// Obtiene el token JWT de las cookies
export function getToken() {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
}

// Guarda el token JWT en una cookie
export function setToken(token: string) {
    document.cookie = `token=${token}; path=/; max-age=7200`;
}

// Elimina el token de las cookies (logout)
export function removeToken() {
    document.cookie = 'token=; path=/; max-age=0';
}
