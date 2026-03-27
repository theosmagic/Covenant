import { Magic } from './types';
import { Dispatch, SetStateAction } from 'react';
import { emitEvent } from './events';
import { setWorldState } from './worldState';

export type LoginMethod = 'EMAIL' | 'SMS' | 'SOCIAL' | 'FORM';

export const logout = async (setToken: Dispatch<SetStateAction<string>>, magic: Magic | null) => {
  if (await magic?.user.isLoggedIn()) {
    await magic?.user.logout();
  }
  localStorage.setItem('token', '');
  localStorage.setItem('user', '');
  setToken('');
  emitEvent('wallet-disconnected', 'user');
  setWorldState({ fren: null });
};

export const saveUserInfo = (token: string, loginMethod: LoginMethod, userAddress: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAuthLoading', 'false');
  localStorage.setItem('loginMethod', loginMethod);
  localStorage.setItem('user', userAddress);
  emitEvent('wallet-connected', 'user', { loginMethod, address: userAddress });
};
