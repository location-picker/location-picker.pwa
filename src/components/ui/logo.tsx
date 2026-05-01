import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" className="text-xl font-extrabold whitespace-nowrap uppercase">
            My <span className="text-orange-500">Saved</span> Places
        </Link>
    )
}
