'use client'

import { useState, useEffect } from 'react'
import TokenBalance from '../components/TokenBalance'
import PendingRewards from '../components/PendingRewards'
import {ConnectButton} from "@rainbow-me/rainbowkit";

export default function TrackerPage() {
    // Load persisted wallet address
    const [wallet, setWallet] = useState<string>(() =>
        typeof window !== 'undefined'
            ? localStorage.getItem('wallet') ?? process.env.NEXT_PUBLIC_DEFAULT_WALLET_ADDRESS ?? ''
            : ''
    )
    // Load persisted ERC-20 token contract address
    const [tokenContract, setTokenContract] = useState<string>(() =>
        typeof window !== 'undefined'
            ? localStorage.getItem('tokenContract') ?? process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ?? ''
            : ''
    )
    // Load persisted mining contract address
    const [miningContract, setMiningContract] = useState<string>(() =>
        typeof window !== 'undefined'
            ? localStorage.getItem('miningContract') ?? process.env.NEXT_PUBLIC_MINING_CONTRACT_ADDRESS ?? ''
            : ''
    )

    // Persist changes back to localStorage
    useEffect(() => {
        localStorage.setItem('wallet', wallet)
    }, [wallet])
    useEffect(() => {
        localStorage.setItem('tokenContract', tokenContract)
    }, [tokenContract])
    useEffect(() => {
        localStorage.setItem('miningContract', miningContract)
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
