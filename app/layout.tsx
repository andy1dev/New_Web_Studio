import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'SPTECH Studio Web | Desarrollo de Software en Cuenca',
  description: 'Transformamos desafíos en activos digitales. Estrategia, diseño y desarrollo a medida en Cuenca, Ecuador.',
  keywords: 'desarrollo web, software, Cuenca, Ecuador, frontend, backend, ecommerce, ERP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-dark-950 text-white antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  )
}