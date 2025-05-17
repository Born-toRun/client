import { LOGIN_PROVIDER } from './constants';

export type LOGIN_PROVIDER_TYPE =
  (typeof LOGIN_PROVIDER)[keyof typeof LOGIN_PROVIDER];
