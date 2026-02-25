'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

import { LocationPickerShareCopyButton } from './components/location-picker-share-copy-button'
import { LocationPickerShareOpenButton } from './components/location-picker-share-open-button'
import { LocationPickerShareSaveButton } from './components/location-picker-share-save-button'
import { LocationPickerShareShareButton } from './components/location-picker-share-share-button'

export const LocationPickerControls = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)
    const [isMobile, setIsMobile] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const [translateY, setTranslateY] = useState(0)
    const startY = useRef<number | null>(null)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    useEffect(() => {
        if (isSheetOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isSheetOpen])

    if (!lat || !lng) return null

    const navLink = NAVIGATORS.find(nav => nav.id === navigator)!.link(
        Number(parseFloat(lat).toFixed(6)),
        Number(parseFloat(lng).toFixed(6)),
    )

    const handleNavigatorClick = (id: Navigator) => {
        setNavigator(id)
        if (isMobile) setIsSheetOpen(true)
    }

    // ===== SWIPE LOGIC =====

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startY.current === null) return

        const diff = e.touches[0].clientY - startY.current

        if (diff > 0) {
            setTranslateY(diff)
        }
    }

    const handleTouchEnd = () => {
        if (translateY > 120) {
            setIsSheetOpen(false)
        }

        setTranslateY(0)
        startY.current = null
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex w-full flex-wrap items-center gap-2">
                    {NAVIGATORS.map(nav => {
                        const isActive = navigator === nav.id

                        return (
                            <div
                                key={nav.id}
                                onClick={() => handleNavigatorClick(nav.id)}
                                className={classNames(
                                    'flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border transition md:size-20 md:flex-none',
                                    !isMobile && navigator === nav.id
                                        ? 'border-orange-300 bg-orange-100'
                                        : 'border-transparent bg-orange-50',
                                )}
                            >
                                <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                                <div className="text-xs font-bold">{nav.name}</div>
                            </div>
                        )
                    })}
                </div>

                {!isMobile ? (
                    <div className="flex gap-2">
                        <LocationPickerShareOpenButton navLink={navLink} />
                        <LocationPickerShareCopyButton navLink={navLink} />
                        <LocationPickerShareShareButton navLink={navLink} />
                        <LocationPickerShareSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />
                    </div>
                ) : (
                    <div>
                        <LocationPickerShareSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />

                        {/* Backdrop */}
                        <div
                            onClick={() => setIsSheetOpen(false)}
                            className={classNames(
                                'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
                                isSheetOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
                            )}
                        />

                        {/* Sheet */}
                        <div
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                transform: `translateY(${isSheetOpen ? translateY : 1000}px)`,
                                transition: translateY === 0 ? 'transform 300ms ease' : 'none',
                            }}
                            className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl"
                        >
                            {/* Drag handle */}
                            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

                            <div className="flex flex-col">
                                {/* Navigator info */}
                                {(() => {
                                    const activeNav = NAVIGATORS.find(n => n.id === navigator)!
                                    return (
                                        <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4">
                                            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100">
                                                <Image
                                                    src={activeNav.icon}
                                                    width={24}
                                                    height={24}
                                                    alt={activeNav.name}
                                                />
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-semibold">{activeNav.name}</div>
                                                <div className="text-gray-500">Choose an action</div>
                                            </div>
                                        </div>
                                    )
                                })()}

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    <LocationPickerShareOpenButton navLink={navLink} />
                                    <LocationPickerShareCopyButton navLink={navLink} />
                                    <LocationPickerShareShareButton navLink={navLink} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
