import {
  ErrorResponse,
  TokenResponse,
  TokenPayload,
} from '../shared/interfaces/base.interface';
import { AzamPay } from './azampay';

/**
 * @method getToken. Token request method
 * @param payload
 * @returns TokenResponse
 */
export const getToken = async (
  payload: TokenPayload
): Promise<TokenResponse | ErrorResponse> => {
  const token = await AzamPay.getToken(payload);
  if (token.success) {
    const azamPay = new AzamPay({
      accessToken: token.data?.accessToken,
      apiKey: payload?.apiKey,
      env: payload.env,
    });
    return {
      ...token,
      bankCheckout: azamPay.bankCheckout,
      mnoCheckout: azamPay.mnoCheckout,
      postCheckout: azamPay.postCheckout,
      disburse: azamPay.disburse,
      transactionStatus: azamPay.transactionStatus,
      nameLookup: azamPay.nameLookup,
      partners: azamPay.partners,
    } as TokenResponse;
  }
  return token as TokenResponse;
};

/**
 * @class Azam Pay request instance.
 */
export const instance = AzamPay;
