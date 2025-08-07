
import { useWatchContractEvent } from 'wagmi'
import { readContract,waitForTransactionReceipt } from 'wagmi/actions';
import useWalletStore from './useWalletStore';
import supabase from './supabase';
import { handleRaffleCreated, useRegisterUpkeep } from './eventHandlers';
import { RAFFLE_FACTORY_ADDRESS, RAFFLE_FACTORY_ABI, RAFFLE_ABI } from './contractData';
import { wagmiConfig } from './wagmiConfig';

const RaffleEventListener = () => {
    const { accessToken, isAdmin } = useWalletStore();

    // Listen for RaffleCreated event
    useWatchContractEvent({
        address: RAFFLE_FACTORY_ADDRESS,
        abi: RAFFLE_FACTORY_ABI,
        eventName: 'RaffleCreated',
        onLogs: async (logs) =>  {

            const log = logs[0]
            const { args } = log
            const { raffleId, raffleAddress, name } = args;

            console.log('RaffleCreated:', { raffleId, raffleAddress, name });

            // Handle raffle creation (update Zustand and Supabase)
            await handleRaffleCreated(raffleId, raffleAddress, name, accessToken);

            const { data: entranceFee } = readContract(wagmiConfig,{
                address: raffleAddress,
                abi: RAFFLE_ABI,
                functionName: 'getEntranceFee',
            });

            const { data: timeInterval } = readContract(wagmiConfig,{
                address: raffleAddress,
                abi: RAFFLE_ABI,
                functionName: 'getTimeInterval',
            });

            // Update Supabase with additional data
            if (accessToken && timeRemaining !== undefined && raffleState !== undefined && totalEntries !== undefined) {
                const { error } = await supabase
                    .from('raffles')
                    .update({
                        time_interval: timeInterval,
                        ticket_price: entranceFee,

                    })
                    .eq('raffle_id', raffleId.toString());
                if (error) {
                    console.error('Failed to update raffle details:', error);
                }
            }

            // Register upkeep for admins
            if (isAdmin) {
                const txHash = useRegisterUpkeep(raffleId, name);
                if (txhash) {

                    await waitForTransactionReceipt(wagmiConfig, { hash: txHash })

                }
            }
        },
    });

    return null; // Headless component
};

export default RaffleEventListener;