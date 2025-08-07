import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    base,
    sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Next App Route RainbowKit demo',
    projectId: 'PROJECT_ID',
    chains: [
        base,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: true,
});