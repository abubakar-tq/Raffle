import  supabase  from './supabase';
import useWalletStore from './useWalletStore';
import {writeContract} from 'wagmi/actions'
import { RAFFLE_FACTORY_ADDRESS, RAFFLE_FACTORY_ABI } from './contractData';
import { wagmiConfig } from './wagmiConfig';

// Handle RaffleCreated event
export async function handleRaffleCreated(raffleId, raffleAddress, name, accessToken) {
  try {
    // Store raffle address in Zustand
    useWalletStore.getState().addRaffleContract(raffleAddress);

    // Update Supabase raffles table
    if (accessToken) {
      const { error } = await supabase
        .from('raffles')
        .insert({
          raffle_id: raffleId,
          raffle_address: raffleAddress,
          name,
          is_open: true,
          last_opened_at: new Date().toISOString(),
          total_balance: 0,
          total_entries: 0,
          chain:"Sepolia",

          time_interval: null, //updated later

          ticket_price: null, // updated later
        });
      if (error) {
        console.error('Failed to update raffles table:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error handling RaffleCreated:', error);
    throw error;
  }
}

// Hook to register upkeep (used by admins)
export async function useRegisterUpkeep(raffleId, name) {
  const { isAdmin } = useWalletStore();

  const txhash = await writeContract(wagmiConfig,{
    address: RAFFLE_FACTORY_ADDRESS,
    abi: RAFFLE_FACTORY_ABI,
    functionName: 'registerUpKeep',
    args: [raffleId, name],
    enabled: isAdmin && !!raffleId && !!name,
  });

  return txhash;
}