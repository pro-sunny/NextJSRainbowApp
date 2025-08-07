'use client'
import React, { useState, useEffect } from 'react'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'

interface TokenBalanceProps {
    address: `0x${string}`
    tokenAddress: `0x${string}`
}

export default function TokenBalance({
                                         address,
                                         tokenAddress,
                                     }: TokenBalanceProps) {
    // 1) Hydration guard
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // 2) Define contracts only after mount
    const contracts = mounted
        ? [
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [address],
            },
            { address: tokenAddress, abi: erc20Abi, functionName: 'decimals' },
            { address: tokenAddress, abi: erc20Abi, functionName: 'symbol' },
        ]
        : []

    // 3) Always call hook, but with empty list pre-hydration
    const results = useReadContracts({
        allowFailure: false,
        contracts,
    })

    // 4) Still return nothing until after mount
    if (!mounted) return null

    const { data, isError, isLoading, refetch } = results

    if (isLoading) return <div>Loading balance…</div>
    if (isError)   return <div>Error loading balance</div>
    if (!data || data.length < 3) return null

    const [rawBalance, decimals, symbol] = data
    const formatted =
        typeof rawBalance === 'bigint' && typeof decimals === 'number'
            ? Number(rawBalance) / 10 ** decimals
            : 0

    return (
        <div className="text-center space-y-1">
            <div>
                <span className="font-mono text-xl">{formatted.toFixed(4)}</span>{' '}
                <span className="text-lg">{symbol as string}</span>
            </div>
            <div className="text-sm text-gray-500">
                Contract: <span className="font-mono">{tokenAddress}</span>
            </div>
            <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-1 border rounded hover:bg-gray-100"
            >
                Refresh
            </button>
        </div>
    )
}
