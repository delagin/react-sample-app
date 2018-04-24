export interface IForgotPasswordState {
  sending: boolean;
  error?: string;
  isSent?: boolean;
  successMessage?: string;
}
