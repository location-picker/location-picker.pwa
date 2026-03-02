'use client'

import { useEffect, useState } from 'react'

import useSWRMutation from 'swr/mutation'

import { useToast } from '@/components/providers/toast-provider'
import { Coordinates } from '@/utils/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

type ConverterResultAddressProps = {
    coordinates: Coordinates
}

export const ConverterResultAddress = ({ coordinates }: ConverterResultAddressProps) => {
    const toast = useToast()

    const [address, setAddress] = useState<string | null>(null)
    const [lastCoords, setLastCoords] = useState<string | null>(null)

    const url = `/api/reverse-geocode?lat=${coordinates.lat}&lon=${coordinates.lng}`
    const { trigger, isMutating, error } = useSWRMutation(url, fetcher)

    const currentCoords = `${coordinates.lat},${coordinates.lng}`

    useEffect(() => {
        if (currentCoords !== lastCoords) {
            setAddress(null)
            setLastCoords(currentCoords)
        }
    }, [currentCoords, lastCoords])

    const handleClick = async () => {
        if (!url) return
        try {
            const result = await trigger()
            if (result?.address) {
                setAddress(result.address)
            }
        } catch {
            toast.error('Error', 'Failed to fetch address')
            setAddress(null)
        }
    }

    return (
        <div>
            {!address && (
                <>
                    {isMutating ? (
                        <div className="text-gray-500">Loading...</div>
                    ) : (
                        <div onClick={handleClick} className="cursor-pointer text-blue-500">
                            Get address
                        </div>
                    )}
                </>
            )}

            {error && <div className="text-red-500">Error fetching address</div>}

            {address && !isMutating && (
                <div>
                    <strong>Address: </strong>
                    <span>{address}</span>
                </div>
            )}
        </div>
    )
}
