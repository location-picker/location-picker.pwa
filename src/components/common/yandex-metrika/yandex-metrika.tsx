'use client'

import { useEffect } from 'react'

type YandexMetrikaInitOptions = {
    accurateTrackBounce: boolean
    clickmap: boolean
    trackLinks: boolean
    webvisor: boolean
}

type YandexMetrikaFunction = {
    (counterId: number, method: 'init', options: YandexMetrikaInitOptions): void
    a?: unknown[][]
    l?: number
}

declare global {
    interface Window {
        ym?: YandexMetrikaFunction
    }
}

const COUNTER_ID = 107066871
const SCRIPT_SRC = 'https://mc.yandex.ru/metrika/tag.js'

export default function YandexMetrika() {
    useEffect(() => {
        if (window.ym) {
            return
        }

        const ym: YandexMetrikaFunction = (...args) => {
            ym.a ??= []
            ym.a.push(args)
        }

        ym.l = Date.now()
        window.ym = ym

        const script = document.createElement('script')

        script.async = true
        script.src = SCRIPT_SRC

        const firstScript = document.getElementsByTagName('script')[0]

        if (firstScript?.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript)
        } else {
            document.head.append(script)
        }

        window.ym(COUNTER_ID, 'init', {
            accurateTrackBounce: true,
            clickmap: true,
            trackLinks: true,
            webvisor: true,
        })
    }, [])

    return null
}
