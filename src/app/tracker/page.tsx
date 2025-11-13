'use client'

import { useState, useEffect } from 'react'
import TokenBalance from '../components/TokenBalance'
import PendingRewards from '../components/PendingRewards'
import {ConnectButton} from "@rainbow-me/rainbowkit"
import { getContractAddresses, saveContractAddresses } from '@/config/contracts'

export default function TrackerPage() {
    // Load persisted wallet address
    const [wallet, setWallet] = useState<string>(() =>
        typeof window !== 'undefined' ? localStorage.getItem('wallet') ?? '' : ''
    )

    // Load contract addresses from config
    const [tokenContract, setTokenContract] = useState<string>(() => {
        if (typeof window === 'undefined') return ''
        return getContractAddresses().token
    })

    const [miningContract, setMiningContract] = useState<string>(() => {
        if (typeof window === 'undefined') return ''
        return getContractAddresses().mining
    })

    // Persist changes back to localStorage
    useEffect(() => {
        localStorage.setItem('wallet', wallet)
    }, [wallet])

    useEffect(() => {
        saveContractAddresses({ token: tokenContract as `0x${string}` | '' })
    }, [tokenContract])

    useEffect(() => {
        saveContractAddresses({ mining: miningContract as `0x${string}` | '' })
    }, [miningContract])

    return (
        <main className="max-w-md mx-auto space-y-4 p-4">
            <h1 className="text-2xl font-bold">Token & Rewards Tracker</h1>

            <input
                type="text"
                placeholder="Wallet address (0x...)"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                placeholder="ERC-20 contract address (0x...)"
                value={tokenContract}
                onChange={(e) => setTokenContract(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Mining contract address (0x...)"
                value={miningContract}
                onChange={(e) => setMiningContract(e.target.value)}
                className="w-full p-2 border rounded"
            />

            {wallet && tokenContract && (
                <TokenBalance
                    address={wallet as `0x${string}`}
                    tokenAddress={tokenContract as `0x${string}`}
                />
            )}

            {wallet && miningContract && (
                <PendingRewards
                    wallet={wallet as `0x${string}`}
                    contractAddress={miningContract as `0x${string}`}
                />
            )}
            <ConnectButton/>
        </main>
    )
}
