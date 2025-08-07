'use client'

import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'

export default function Clicker() {
    const { handleClick, handleUpgrade, coins, coinsPerClick } = useGame()
    const [mounted, setMounted] = useState(false)
    const upgradeCost = coinsPerClick * 10

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex flex-col items-center space-y-4">
            <button onClick={handleClick} className="px-8 py-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                Click me!
            </button>
            <button
                onClick={handleUpgrade}
                disabled={coins < upgradeCost}
                className={`px-8 py-3 rounded shadow ${
                    coins >= upgradeCost ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
            >
                Upgrade (+1 per click) — Cost: {upgradeCost}
            </button>
        </div>
    )
}
