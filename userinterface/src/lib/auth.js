import { useSignMessage, useAccount } from 'wagmi';
import supabase from './supabase';
import { jwtDecode } from 'jwt-decode';
import useWalletStore from './useWalletStore';



export const useWalletAuth = () => {
  const { signMessageAsync } = useSignMessage();
  const { address: accountAddress } = useAccount();

  async function login(walletAddress) {
    const address = walletAddress?.toLowerCase() || accountAddress?.toLowerCase();
    try {
      console.log('Attempting to login with address:', address);
      if (!address) {
        throw new Error('No wallet connected');
      }
      const message = `Sign to authenticate with Lottery App: ${address}`;
      const signature = await signMessageAsync({ message });
      const response = await fetch('/api/generate-jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address, signature, message }),
      });
      const { email, email_otp, action_link, error } = await response.json();
      if (error) throw new Error(error);

      if (!email_otp) {
        throw new Error("Missing email_otp from server. (Edge Function returned action_link instead)");
      }

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: email_otp,
        type: 'magiclink',
      });
      if (verifyError) throw verifyError;


      const access_token = data.session.access_token;
      const refresh_token = data.session.refresh_token;

      // Decode JWT to extract custom_role (same as before)
      const decodedToken = jwtDecode(access_token);
      const customRole = decodedToken?.user_metadata?.custom_role || 'player';
      const isAdmin = customRole === 'admin';

      // Update Zustand store (same as before)
      useWalletStore.getState().setWallet({
        isConnected: true,
        isAdmin,
        address,
        accessToken: access_token,
        refreshToken: refresh_token,
      });


      return access_token;

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return { login, logout, supabase };
};