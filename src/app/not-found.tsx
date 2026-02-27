import { BugIcon } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="wrapper flex min-h-full w-full shrink items-center justify-center">
            <div className="flex flex-col gap-y-8 text-center">
                <BugIcon size={128} className="m-auto" />
                <h1 className="text-2xl font-bold">Страница не найдена</h1>
                <p>
                    Возможно, она была перемещена,
                    <br />
                    или вы&nbsp;просто неверно указали адрес страницы.
                </p>
            </div>
        </div>
    )
}
