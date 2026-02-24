import { Metadata } from 'next'

import { LocationPicker } from '@/components/features/location-picker/location-picker'

// prettier-ignore
export const metadata: Metadata = {
    title: 'Location Picker - Store and Share Locations Easily',
    description: 'Location Picker is a free online tool to store, convert, and share locations by address or coordinates. Works with DD and DMS formats, and integrates with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
    keywords: [
        'location picker',
        'store locations',
        'share locations',
        'coordinates converter',
        'DD to DMS',
        'GPS tool',
        'maps integration',
    ],
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    appleWebApp: {
        title: 'Location Picker',
    },
    openGraph: {
        title: 'Location Picker - Store and Share Locations Easily',
        description: 'Location Picker is a free online tool to store, convert, and share locations by address or coordinates. Works with DD and DMS formats, and integrates with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Location Picker',
        images: [
            {
                url: '/og-image-home.png',
                width: 1200,
                height: 630,
                alt: 'Location Picker Tool Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Location Picker - Store and Share Locations Easily',
        description: 'Free online tool to store, convert, and share locations. Supports DD/DMS and Google Maps, Waze, Apple Maps, Yandex.Maps.',
        images: ['/og-image-home.png'],
    },
}

export default function HomePage() {
    return <LocationPicker />
}
