'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { InstallPWAButton } from '@/components/features/common/install-pwa-button/install-pwa-button'
import { Button } from '@/components/ui/button'

export const Landing = () => {
    const router = useRouter()

    return (
        <div className="flex min-h-screen items-center justify-between gap-x-15 bg-white px-16">
            <div className="hidden w-1/2 justify-end md:flex">
                <Image src="/images/about/full-screen.jpg" alt="Location Picker" width={400} height={667} />
            </div>

            <section className="space-y-6 text-center md:w-1/2 md:text-left">
                <h1 className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                    Location Picker
                </h1>
                <p className="text-lg text-gray-700 md:text-xl">
                    Search, store, and share locations instantly. Save your spots in a flash and open them anytime in{' '}
                    <strong>Google Maps</strong>, <strong>Waze</strong>, <strong>Apple Maps</strong>, or{' '}
                    <strong>Yandex.Maps</strong>.
                </p>

                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <InstallPWAButton width={162} height={48} />
                    <Button
                        className="rounded-lg bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                        onClick={() => router.push('/app')}
                    >
                        Launch in Browser
                    </Button>
                </div>
            </section>
        </div>
    )
}
