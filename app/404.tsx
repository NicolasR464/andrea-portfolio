'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function NotFoundContent() {
    const searchParams = useSearchParams()
    return (
        <div>
            <p>404 not found</p>
        </div>
    )
}

export default function NotFound() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotFoundContent />
        </Suspense>
    )
}
