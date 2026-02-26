export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
            <p className="text-sm text-gray-600">Loading ...</p>
        </div>
    )
}
