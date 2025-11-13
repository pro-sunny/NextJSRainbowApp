/**
 * Contract addresses configuration
 *
 * Store all smart contract addresses here for easy management and updates.
 * You can override these at runtime if needed (e.g., for testing different contracts).
 */

export interface ContractAddresses {
  token: `0x${string}` | ''
  mining: `0x${string}` | ''
  staking: `0x${string}` | ''
}

/**
 * Default contract addresses
 * Update these with your deployed contract addresses
 */
export const defaultContractAddresses: ContractAddresses = {
  // ERC-20 Token Contract
  token: '',

  // Mining Contract
  mining: '',

  // Staking Contract (placeholder for future use)
  staking: '',
}

/**
 * Get contract addresses from localStorage or use defaults
 * This allows users to override contract addresses via the UI
 */
export function getContractAddresses(): ContractAddresses {
  if (typeof window === 'undefined') {
    return defaultContractAddresses
  }

  return {
    token: (localStorage.getItem('tokenContract') || defaultContractAddresses.token) as `0x${string}` | '',
    mining: (localStorage.getItem('miningContract') || defaultContractAddresses.mining) as `0x${string}` | '',
    staking: (localStorage.getItem('stakingContract') || defaultContractAddresses.staking) as `0x${string}` | '',
  }
}

/**
 * Save contract addresses to localStorage
 */
export function saveContractAddresses(addresses: Partial<ContractAddresses>): void {
  if (typeof window === 'undefined') return

  if (addresses.token !== undefined) {
    localStorage.setItem('tokenContract', addresses.token)
  }
  if (addresses.mining !== undefined) {
    localStorage.setItem('miningContract', addresses.mining)
  }
  if (addresses.staking !== undefined) {
    localStorage.setItem('stakingContract', addresses.staking)
  }
}
