'use client'

import React, {useEffect, useState} from 'react'
import { useGame } from '../context/GameContext'

export default function Progress() {
    const { coins, coinsPerClick } = useGame()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="text-center space-y-2">
            <div className="text-2xl">Coins: <span className="font-mono">{coins}</span></div>
            <div className="text-lg">Per Click: <span className="font-mono">{coinsPerClick}</span></div>
        </div>
    )
}