'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { useKeypress } from '@/utils/hooks/use-keypress'

type ConfirmationProps = {
    title: string
    message: string
    onConfirm: () => void
}

export const Confirmation = ({ title, message, onConfirm }: ConfirmationProps) => {
    const overlay = useOverlay()

    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-gray-500">{message}</div>
            </div>

            <Button className="w-full text-red-500" onClick={onConfirm}>
                Confirm
            </Button>

            <Button className="w-full" onClick={() => overlay.close()}>
                Cancel
            </Button>
        </div>
    )
}
