'use client'

import React from 'react'
import Progress from '../components/Progress'
import Clicker from '../components/Clicker'

export default function GamePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8">
            <h2 className="text-4xl font-bold">Incremental Clicker Game</h2>
            <Progress />
            <Clicker />
        </main>
    )
}