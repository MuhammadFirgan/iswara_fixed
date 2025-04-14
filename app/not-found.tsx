import Link from 'next/link'
 
export default function NotFound({title}: { title: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-center">
            <h1 className="text-9xl text-primary">404</h1>
            <p className="text-lg">{title}</p>
            <Link href="/" className="text-primary text-sm">Kembali ke beranda</Link>
        </div>
    </div>
  )
}