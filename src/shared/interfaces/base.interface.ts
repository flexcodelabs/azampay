import {
  CheckoutResponse,
  BankCheckout,
  MnoCheckout,
  RequestOptions,
  PostCheckOut,
  DisburseResponse,
  Disburse,
  TransactionStatusResponse,
  TransactionStatus,
  NameLookup,
  NameLookupResponse,
} from './instance.interface';

/**
 * @interface TokenResponse Token request response with bankCheckout and mnoCheckout.
 */
export interface TokenResponse {
  /**
   * @interface TOKENDETAILS Token request response with access token and expiry time.
   */
  data?: TOKENDETAILS;

  /**
   * @string This is the status message of checkout request.
   */
  message: unknown;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @number Response Http Status code.
   */
  statusCode: number;

  /**
   * @method bankCheckout A method to initiate a Bank checkout with Azam Pay.
   */
  bankCheckout?: (
    payload: BankCheckout,
    options?: RequestOptions
  ) => Promise<CheckoutResponse>;

  /**
   * @method mnoCheckout A method to initiate MNO checkout with Azam Pay.
   */
  mnoCheckout?: (
    payload: MnoCheckout,
    options?: RequestOptions
  ) => Promise<CheckoutResponse>;

  /**
   * @method postCheckout A method to initiate post checkout with Azam Pay.
   */
  postCheckout?: (
    payload: PostCheckOut,
    options?: RequestOptions
  ) => Promise<string>;

  /**
   * @method disburse A method used to lookup the name associated with a bank account or Mobile Money account.
   */

  disburse?: (
    payload: Disburse,
    options?: RequestOptions
  ) => Promise<DisburseResponse>;

  /**
   * @method transactionStatus Allows you to retrieve the status of a disbursement transaction made through AzamPay.
   */

  transactionStatus?: (
    payload: TransactionStatus,
    options?: RequestOptions
  ) => Promise<TransactionStatusResponse>;

  /**
   * @method nameLookup Is used to lookup the name associated with a bank account or Mobile Money account.
   */

  nameLookup?: (
    payload: NameLookup,
    options?: RequestOptions
  ) => Promise<NameLookupResponse>;
}

/**
 * @interface AzamPayToken Token request response with access token details and status code.
 */
export interface AzamPayToken {
  /**
   * @interface TOKENDETAILS Token request response with access token and expiry time.
   */
  data: TOKENDETAILS;

  /**
   * @string Response message.
   */
  message: string;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @number Response Http Status code.
   */
  statusCode: number;
}

/**
 * @interface TOKENDETAILS Token request response with access token and expiry time.
 */
export interface TOKENDETAILS {
  /**
   * @string Azam Pay access token.
   */
  accessToken: string;

  /**
   * @string Azam Pay access token expire time.
   */
  expire: string;
}

/**
 * @interface ErrorResponse Response when an error occurred while doing a request to Azam Pay APIs
 */

export interface ErrorResponse {
  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @string Response message.
   */
  message: string;

  /**
   * @string Response code.
   */
  code: string;

  /**
   * @number Response Http Status code.
   */
  statusCode: number;

  /**
   * @Object Additional response object.
   */
  [key: string]: unknown;

  data?: TOKENDETAILS;
  bankCheckout?: (
    payload: BankCheckout,
    options?: RequestOptions
  ) => Promise<CheckoutResponse>;
  mnoCheckout?: (
    payload: MnoCheckout,
    options?: RequestOptions
  ) => Promise<CheckoutResponse>;

  postCheckout?: (
    payload: PostCheckOut,
    options?: RequestOptions
  ) => Promise<string>;

  disburse?: (
    payload: Disburse,
    options?: RequestOptions
  ) => Promise<DisburseResponse>;

  transactionStatus?: (
    payload: TransactionStatus,
    options?: RequestOptions
  ) => Promise<TransactionStatusResponse>;

  nameLookup?: (
    payload: NameLookup,
    options?: RequestOptions
  ) => Promise<NameLookupResponse>;
  transactionId?: string;
}
export interface AzamPayErrors {
  [key: string]: unknown;
}

/**
 * @interface AzamPayInstance An optional Azam Pay interface for initiating the request instance.
 */
export interface AzamPayInstance {
  /**
   * @string Azam Pay access token.
   */
  accessToken?: string;

  /**
   * @string AzamPayInstance Azam Pay API key given as token in the settings page.
   */
  apiKey?: string;

  /**
   * @string AzamPayInstance Azam Pay environment. Either SANDBOX | LIVE the default is SANDBOX.
   */
  env?: 'LIVE' | 'SANDBOX';
}

/**
 * @method PostCallback request payload
 */
export interface PostCallback {
  /**
   * @string This is the application name.
   */
  appName: string;

  /**
   * @string Client id is unique id for identify client.
   */
  clientId: string;

  /**
   * @string <uuid> Unique id for validate vendor.
   */
  vendorId: string;

  /**
   * @string Language code for transalate the application.
   */
  language: string;

  /**
   * @string Currency code that will convert amount into specific currency format.
   */
  currency: string;

  /**
   * @string 30 charecters long unique string.
   */
  externalId: string;

  /**
   * @string URL which the request is being originated.
   */
  requestOrigin: string;

  /**
   * @string URL that you want to redirected to at transaction failure.
   */
  redirectFailURL: string;

  /**
   * @string URL that you want to redirected to at transaction success.
   */
  redirectSuccessURL: string;
  /**
   * @string Name of vendor.
   */
  vendorName: string;
  /**
   * @string This is amount that will be charged from the given account.
   */
  amount: string;
  /**
   * @object Shoping cart with multiple item
   */
  cart: Cart;
}

/**
 * @object Shoping cart with multiple item
 */
export interface Cart {
  /**
   * @string An array of vendor items.
   */
  items: Item[];
}

export interface Item {
  /**
   * @string Vendor Item name.
   */
  name: string;
}

/**
 * @interface PostCheckOutInterface Response for post checkout
 */

export interface PostCheckOutInterface {
  /**
   * @string This is the status message of checkout request.
   */
  message: unknown;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @uknown Generic response for post checkout
   */
  [key: string]: unknown;
}
