import { NextResponse } from 'next/server'

import { fetchReverseGeocodeAddress } from '../locationiq'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const lat = searchParams.get('lat')
        const lon = searchParams.get('lon')
        const locale = searchParams.get('locale') || searchParams.get('lang')

        if (!lat || !lon) {
            return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 })
        }

        const address = await fetchReverseGeocodeAddress(lat, lon, { locale })

        return NextResponse.json({ address })
    } catch (err) {
        console.error('Reverse geocoding error:', err)
        return NextResponse.json({ error: 'Unexpected error in reverse geocoding' }, { status: 500 })
    }
}
