'use client'

import React, { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import {miningContractABI} from "@/app/abi/minigContractABI";

interface PendingRewardsProps {
    wallet: `0x${string}`
    contractAddress: `0x${string}`
}

export default function PendingRewards({
                                           wallet,
                                           contractAddress,
                                       }: PendingRewardsProps) {
    // 1) Hydration guard
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    // 2) Always call the hook, but nothing renders until mounted
    const { data, isLoading, isError, refetch } = useReadContract({
        address: contractAddress,
        abi: miningContractABI,
        functionName: 'pendingRewards',
        args: [wallet],
    })

    // 3) Don’t render on server
    if (!mounted) return null

    if (isLoading) return <div>Loading pending rewards…</div>
    if (isError)   return <div>Error loading rewards</div>
    if (data === undefined) return null

    // 4) Format BigInt result (assuming 18 decimals)
    const rewards = Number(data as bigint) / 1e18

    return (
        <div className="text-center space-y-1 mt-4">
            <div className="text-lg">
                Pending Rewards:{' '}
                <span className="font-mono">{rewards.toFixed(4)}</span>
            </div>
            <div className="text-sm text-gray-500">
                Contract: <span className="font-mono">{contractAddress}</span>
            </div>
            <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-1 border rounded hover:bg-gray-100"
            >
                Refresh Rewards
            </button>
        </div>
    )
}
