import axios, { AxiosError } from 'axios';
import * as https from 'https';
import { AUTHENTICATOR, CHECKOUT } from '../shared/enums/azampay.enum';
import { sanitizeErrorResponse } from '../shared/helpers/error.helper';
import {
  AzamPayInstance,
  AzamPayToken,
  ErrorResponse,
  PartnersResponse,
  PostCheckOutInterface,
  BankCheckout,
  CheckoutResponse,
  Disburse,
  DisburseResponse,
  MnoCheckout,
  NameLookup,
  NameLookupResponse,
  PostCheckOut,
  RequestOptions,
  TokenPayload,
  TransactionStatus,
  TransactionStatusResponse,
} from '../shared/interfaces/base.interface';

https.globalAgent.options.rejectUnauthorized = false;

/**
 * @class Azam Pay request instance.
 */
export class AzamPay {
  constructor(private instance?: AzamPayInstance) {}

  private headers = {
    'Content-Type': 'application/json',
  };

  /**
   * @method getToken A static method for getting token
   * @param payload Azam Pay request payload
   * @returns Access Token and Expiry time
   */

  static getToken = async (
    payload: TokenPayload
  ): Promise<AzamPayToken | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          AUTHENTICATOR[payload.env ?? 'SANDBOX']
        }/AppRegistration/GenerateToken`,
        {
          appName: payload.appName,
          clientId: payload.clientId,
          clientSecret: payload.clientSecret,
        }
      );
      return { ...data, success: true, statusCode: 200 } as AzamPayToken;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  /**
   * @method bankCheckout
   * @param payload BankCheckout Bank checkout and make payment to requested provider.
   * @param options Request options for any additional options or independent request methods.
   * @returns CheckoutResponse or ErrorResponse
   */

  bankCheckout = async (
    payload: BankCheckout,
    options?: RequestOptions
  ): Promise<CheckoutResponse | ErrorResponse> => {
    return await this.getBankCheckout(payload, options);
  };

  /**
   * @method mnoCheckout
   * @param payload BankCheckout Bank checkout and make payment to requested provider.
   * @param options Request options for any additional options or independent request methods.
   * @returns CheckoutResponse or ErrorResponse
   */

  mnoCheckout = async (
    payload: MnoCheckout,
    options?: RequestOptions
  ): Promise<CheckoutResponse | ErrorResponse> => {
    return await this.getMnoCheckout(payload, options);
  };

  /**
   * @method postCheckout
   * @param payload Post checkout payload.
   * @param options Request options for any additional options or independent request methods.
   * @returns string or ErrorResponse
   */
  postCheckout = async (
    payload: PostCheckOut,
    options?: RequestOptions
  ): Promise<PostCheckOutInterface | ErrorResponse> => {
    return await this.getPostCheckout(payload, options);
  };

  /**
   * @method disburse
   * @param payload Disburse payload.
   * @param options Request options for any additional options or independent request methods.
   * @returns DisburseResponse or ErrorResponse
   */
  disburse = async (
    payload: Disburse,
    options?: RequestOptions
  ): Promise<DisburseResponse | ErrorResponse> => {
    return this.getDisbursement(payload, options);
  };

  /**
   * @method partners. A method used to retrieve payment partners from Azam Pay
   * @returns PartnersResponse
   */

  partners = async (
    options?: RequestOptions
  ): Promise<PartnersResponse | ErrorResponse> => {
    return await this.getPartners(options);
  };

  /**
   * @method nameLookup This API is used to lookup the name associated with a bank account or Mobile Money account.
   * @param payload NameLookup payload.
   * @param options Request options for any additional options or independent request methods.
   * @returns NameLookupResponse or ErrorResponse
   */

  nameLookup = async (
    payload: NameLookup,
    options?: RequestOptions
  ): Promise<NameLookupResponse | ErrorResponse> => {
    return await this.getNameLookup(payload, options);
  };

  /**
   * @method disburse This method allows for the transfer of money from other countries to Tanzania. It requires the authorization token generated above, passed as a header in the request. The request should also contain details of the source, destination, and transfer details. Additionally, the request can include an external reference ID and remarks.
   * @param payload Disburse payload.
   * @param options Request options for any additional options or independent request methods.
   * @returns DisburseResponse or ErrorResponse
   */
  transactionStatus = async (
    payload: TransactionStatus,
    options?: RequestOptions
  ): Promise<TransactionStatusResponse | ErrorResponse> => {
    return await this.getStatus(payload, options);
  };

  private getStatus = async (
    payload: TransactionStatus,
    options?: RequestOptions
  ): Promise<TransactionStatusResponse | ErrorResponse> => {
    try {
      const { data } = await axios.get(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/azampay/gettransactionstatus?pgReferenceId=${
          payload.reference
        }&bankName=${payload.bankName}`,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
          },
        }
      );
      return {
        ...data,
        success: true,
        statusCode: 200,
      } as TransactionStatusResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getPartners = async (
    options?: RequestOptions
  ): Promise<PartnersResponse | ErrorResponse> => {
    try {
      const { data } = await axios.get(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/api/v1/Partner/GetPaymentPartners`,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
          },
        }
      );
      return { partners: data, success: true } as PartnersResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  private getNameLookup = async (
    payload: NameLookup,
    options?: RequestOptions
  ): Promise<NameLookupResponse | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/azampay/namelookup`,
        payload,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
          },
        }
      );
      return { ...data, success: true, statusCode: 200 } as NameLookupResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getDisbursement = async (
    payload: Disburse,
    options?: RequestOptions
  ): Promise<DisburseResponse | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/azampay/createtransfer`,
        payload,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
          },
        }
      );
      return { ...data, success: true, statusCode: 200 } as DisburseResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  private getBankCheckout = async (
    payload: BankCheckout,
    options?: RequestOptions
  ): Promise<CheckoutResponse | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/azampay/bank/checkout`,
        payload,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
            'X-API-Key': this.instance?.apiKey ?? options?.apiKey,
          },
        }
      );
      return { ...data, success: true, statusCode: 200 } as CheckoutResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getMnoCheckout = async (
    payload: MnoCheckout,
    options?: RequestOptions
  ): Promise<CheckoutResponse | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/azampay/mno/checkout`,
        payload,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${
              this.instance?.accessToken ?? options?.accessToken ?? ''
            }`,
            'X-API-Key': this.instance?.apiKey ?? options?.apiKey,
          },
        }
      );
      return { ...data, success: true, statusCode: 200 } as CheckoutResponse;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  private getPostCheckout = async (
    payload: PostCheckOut,
    options?: RequestOptions
  ): Promise<PostCheckOutInterface | ErrorResponse> => {
    try {
      const { data } = await axios.post(
        `${
          CHECKOUT[this.instance?.env ?? options?.env ?? 'SANDBOX']
        }/api/v1/Partner/PostCheckout`,
        payload
      );
      return { data, success: true } as PostCheckOutInterface;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
}
