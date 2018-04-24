import { AxmitWebSocket, SERVICE_SIGNALS } from '@common/core/services';

export interface IClientInfo {
  enabled: boolean;
  onboardingNeeded: boolean;
}

const CLEARING_WS_URI = String(process.env.CLEARING_WS_URI || '');

let socketInitiated: boolean;

export const initializeSocket = async () => {
  await AxmitWebSocket.init(AxmitWebSocket.buildUrl(CLEARING_WS_URI));

  socketInitiated = true;

  AxmitWebSocket.on(SERVICE_SIGNALS.SESSION_ERROR, () => socketInitiated = false);
  AxmitWebSocket.on(SERVICE_SIGNALS.SESSION_EXPIRED, () => socketInitiated = false);
};

export const clientGetInfo = async (): Promise<IClientInfo> => {
  if (!socketInitiated) {
    await initializeSocket();
  }

  return AxmitWebSocket.invoke<IClientInfo>(
    'client_control',
    'client_user_enabled',
  );
};
