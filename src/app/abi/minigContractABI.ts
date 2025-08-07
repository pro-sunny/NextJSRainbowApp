export const miningContractABI = [
    {
        type: 'function',
        name: 'pendingRewards',
        stateMutability: 'view',
        inputs: [{ name: 'player', type: 'address' }],
        outputs: [{ type: 'uint256' }],
    },
] as const