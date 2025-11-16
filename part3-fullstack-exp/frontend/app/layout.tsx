export const metadata = {
    title: 'Gestión de Casos',
    description: 'Sistema de gestión de expedientes',
}

export default function RootLayout({
    children,
}: {
    children: any
}) {
    return (
        <html lang="es">
            <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
                {children}
            </body>
        </html>
    )
}
