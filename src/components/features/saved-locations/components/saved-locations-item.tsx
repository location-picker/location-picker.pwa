'use client'

import { useRef, useState } from 'react'

import { TrashIcon } from 'lucide-react'

import Link from 'next/link'

import { deletePlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const toast = useToast()

    const [translateX, setTranslateX] = useState(0)
    const [isSwiped, setIsSwiped] = useState(false)

    const startX = useRef<number | null>(null)
    const swipeThreshold = 50

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this location?')
        if (!confirmDelete) return

        await deletePlace(place.id)
        onLoadPlaces()
        toast.success('Location deleted', 'The location has been successfully deleted.')
        setTranslateX(0)
        setIsSwiped(false)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startX.current === null) return
        const diff = e.touches[0].clientX - startX.current

        if (!isSwiped && diff < 0) {
            setTranslateX(Math.max(diff, -100))
        }

        if (isSwiped && diff > 0) {
            setTranslateX(Math.min(-100 + diff, 0))
        }
    }

    const handleTouchEnd = () => {
        if (!isSwiped && translateX < -swipeThreshold) {
            setTranslateX(-60)
            setIsSwiped(true)
        } else if (isSwiped && translateX > -swipeThreshold) {
            setTranslateX(0)
            setIsSwiped(false)
        } else if (!isSwiped) {
            setTranslateX(0)
        } else {
            setTranslateX(-60)
        }

        startX.current = null
    }

    const handleClickItem = () => {
        if (isSwiped) {
            setTranslateX(0)
            setIsSwiped(false)
        }
    }

    return (
        <li className="relative">
            <div className="absolute top-0 right-0 bottom-0 flex w-16 flex-col items-center justify-center gap-y-1 rounded-r-lg bg-red-400 text-xs font-semibold text-white">
                <TrashIcon size={20} color="white" className="cursor-pointer" onClick={handleDelete} />
                Delete
            </div>

            <div
                className="flex touch-pan-x items-center justify-between gap-x-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm transition-transform duration-200"
                style={{ transform: `translateX(${translateX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleClickItem}
            >
                <Link
                    href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`}
                    className="pointer-events-none font-bold"
                >
                    {place.name}
                </Link>
            </div>
        </li>
    )
}
