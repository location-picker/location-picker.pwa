'use client'

import { Coordinates } from '@/utils/types'

function toDMS(deg: number, isLat: boolean) {
    const absolute = Math.abs(deg)
    const degrees = Math.floor(absolute)
    const minutesFull = (absolute - degrees) * 60
    const minutes = Math.floor(minutesFull)
    const seconds = (minutesFull - minutes) * 60

    const direction = isLat ? (deg >= 0 ? 'N' : 'S') : deg >= 0 ? 'E' : 'W'

    return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`
}

type ConverterResultDmsProps = {
    coordinates: Coordinates
}

export const ConverterResultDms = ({ coordinates }: ConverterResultDmsProps) => {
    return (
        <div>
            <strong>DMS: </strong>
            <span>
                {toDMS(coordinates.lat, true)} {toDMS(coordinates.lng, false)}
            </span>
        </div>
    )
}
