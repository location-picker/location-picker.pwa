import { Coordinates } from '@/utils/types'

type ConverterResultDdProps = {
    coordinates: Coordinates
}

export const ConverterResultDd = ({ coordinates }: ConverterResultDdProps) => {
    return (
        <div>
            <strong>DD: </strong>
            <span>{`${coordinates.lat.toFixed(7)}, ${coordinates.lng.toFixed(7)}`} </span>
        </div>
    )
}
