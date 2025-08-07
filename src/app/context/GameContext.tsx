'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const COINS_KEY = 'coins'
const CPC_KEY = 'coinsPerClick'

interface GameState {
    coins: number
    coinsPerClick: number
    handleClick: () => void
    handleUpgrade: () => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
    const [coins, setCoins] = useState<number>(() => {
        if (typeof window === 'undefined') return 0
        const stored = localStorage.getItem(COINS_KEY)
        return stored ? parseInt(stored, 10) : 0
    })
    const [coinsPerClick, setCoinsPerClick] = useState<number>(() => {
        if (typeof window === 'undefined') return 1
        const stored = localStorage.getItem(CPC_KEY)
        return stored ? parseInt(stored, 10) : 1
    })

    useEffect(() => {
        localStorage.setItem(COINS_KEY, coins.toString())
    }, [coins])

    useEffect(() => {
        localStorage.setItem(CPC_KEY, coinsPerClick.toString())
    }, [coinsPerClick])

    const handleClick = () => setCoins(prev => prev + coinsPerClick)

    const handleUpgrade = () => {
        const cost = coinsPerClick * 10
        if (coins >= cost) {
            setCoins(prev => prev - cost)
            setCoinsPerClick(prev => prev + 1)
        }
    }

    return (
        <GameContext.Provider value={{ coins, coinsPerClick, handleClick, handleUpgrade }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (!context) throw new Error('useGame must be used within GameProvider')
    return context
}
