/**
 * @interface TokenPayload Request payload for token.
 */
export interface TokenPayload {
  /**
   * @string It will be the name of application.
   */
  appName: string;

  /**
   * @string It will be the client id generated during application registration.
   */
  clientId: string;

  /**
   * @string It will be the secret key generated during application registration.
   */
  clientSecret: string;

  /**
   * @string Azam Pay API key given as token in the settings page.
   */
  apiKey: string;

  /**
   * @string [SANDBOX | LIVE] Azam Pay environment.
   */
  env?: 'SANDBOX' | 'LIVE';
}

/**
 * @interface BankCheckout Bank checkout and make payment to requested provider.
 */
export interface BankCheckout {
  /**
   * @string This is amount that will be charged from the given account.
   */
  amount: string;

  /**
   * @string Code of currency
   */
  currencyCode: 'TZS' | string;

  /**
   * @string This is the account number/MSISDN that consumer will provide. The amount will be deducted from this account.
   */
  merchantAccountNumber: string;

  /**
   * @string Mobile number
   */
  merchantMobileNumber: string;

  /**
   * @string Nullable consumer name.
   */
  merchantName?: string | null;

  /**
   * @string One time password
   */
  otp: string;

  /**
   * @string [CRDB | NMB] BankProvider.
   */
  provider: 'CRDB' | 'NMB' | string;

  /**
   * @string This id belongs to the calling application. Maximum Allowed length for this field is 128 ascii characters.
   */
  referenceId: string;

  /**
   * @Object This is additional JSON data that calling application can provide. This is optional.
   */
  additionalProperties?: Record<string, unknown> | null;
}

/**
 * @interface MnoCheckout Mobile Money Operator checkout and make payment to requested provider.
 */
export interface MnoCheckout {
  /**
   * @string This is the account number/MSISDN that consumer will provide. The amount will be deducted from this account.
   */
  accountNumber: string;

  /**
   *@string This is amount that will be charged from the given account.
   */
  amount: string;

  /**
   * @string This is the transaciton currency. Current support values are only (TZS)
   */
  currency: string;

  /**
   * @string This id belongs to the calling application. Maximum Allowed length for this field is 128 ascii characters
   */
  externalId: string;

  /**
   * @string ['Airtel' | 'Tigo' | 'Halopesa' | 'Azampesa' | 'Mpesa'] MNO Provider.
   */
  provider: 'Airtel' | 'Tigo' | 'Halopesa' | 'Azampesa' | 'Mpesa' | string;

  /**
   * @object This is additional JSON data that calling application can provide. This is optional.
   */
  additionalProperties?: Record<string, unknown> | null;
}

/**
 * @interface CheckoutResponse Response for both BankCheckout and MnoCheckout
 */
export interface CheckoutResponse {
  /**
   * @string Each successfull transaction will be given a valid transaction id.
   */
  transactionId: string;

  /**
   * @string This is the status message of checkout request.
   */
  msg: string;

  /**
   * @string This is the status message of checkout request.
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
 * Request options for request method
 */
export interface RequestOptions {
  /**
   * Token from Azampay app registration
   */
  apiKey?: string;

  /**
   * Access token from Azampay got on request
   */
  accessToken?: string;

  /**
   * Azampay environment
   */
  env?: 'LIVE' | 'SANDBOX';
}

/**
 * @interface PostCheckOut Request interface
 */
export interface PostCheckOut {
  /**
   * @string It will be the name of application.
   */
  appName: string;

  /**
   * @string Client id is unique id for identify client
   */
  clientId: string;

  /**
   * @string [uuid] Unique id for validate vendor
   */
  vendorId: string;

  /**
   * @string Language code for transalate the application
   */
  language: string;

  /**
   *@string Currency code that will convert amount into specific currency format
   */
  currency: string;

  /**
   * @string 30 charecters long unique string
   */
  externalId: string;

  /**
   * @string The URL where the request is originating
   */
  requestOrigin: string;

  /**
   * @string  URL that you want to redirected to at transaction failure
   */
  redirectFailURL: string;

  /**
   * @string URL that you want to redirected to at transaction success
   */
  redirectSuccessURL: string;

  /**
   * @string Name of vendor
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

export interface Disburse {
  /**
   * @object Contains information about the source account.
   */
  source: Source;

  /**
   *@object Contains information about the destination account.
   */
  destination: Destination;

  /**
   *@object Contains information about the transfer.
   */
  transferDetails: TransferDetails;

  /**
   * @string An external reference ID to track the transaction.
   */
  externalReferenceId: string;

  /**
   * @string Any remarks to be included with the transaction.
   */
  remarks: string;
}

/**
 * @interface Source Account Details
 */
export interface Source {
  /**
   * @string Country code
   */
  countryCode: string;

  /**
   * @string Source account full name
   */
  fullName: string;

  /**
   * @string Source account bank name
   */
  bankName: string;

  /**
   * @string Source account account number
   */
  accountNumber: string;

  /**
   * @string Source account currency
   */
  currency: string;
}

/**
 * @interface Destination Account Details
 */
export interface Destination {
  /**
   * @string Country code
   */
  countryCode: string;

  /**
   * @string Destination account full name
   */
  fullName: string;

  /**
   * @string Destination account bank name
   */
  bankName: string;

  /**
   * @string Destination account account number
   */
  accountNumber: string;

  /**
   * @string Destination account currency
   */
  currency: string;
}

/**
 * @interface TransferDetails
 */
export interface TransferDetails {
  /**
   * @string Transfer type
   */
  type: string;

  /**
   * @number Transfer amount
   */
  amount: number;

  /**
   * @string Transfer date
   */
  date: string;
}

/**
 * @interface DisburseResponse Response for disbursement
 */

export interface DisburseResponse {
  /**
   * @string A string containing the status of the transaction.
   */
  data: string;

  /**
   * @string A string containing a human-readable message describing the response.
   */
  message: string;

  /**
   * @boolean A boolean indicating whether the request was successful or not.
   */
  success: boolean;

  /**
   * @number Http status code for the request
   */
  statusCode: number;
}

/**
 * @interface NameLookup An interface for looking up account name
 */
export interface NameLookup {
  /**
   * @string Bank name or Mobile Money name associated with the account.
   */
  bankName: string;

  /**
   * @string Bank account number or Mobile Money number.
   */
  accountNumber: string;
}

/**
 * @interface NameLookupResponse An interface used to lookup the name associated with a bank account or Mobile Money account.
 */
export interface NameLookupResponse {
  /**
   * @string Name associated with the account.
   */
  name: string;

  /**
   * @string A brief description of the response status.
   */
  message: string;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @string Account number.
   */
  accountNumber: string;

  /**
   * @string Bank name or Mobile Money name associated with the account.
   */
  bankName: string;

  /**
   * @number Response Http Status code.
   */
  statusCode: number;
}

/**
 * @interface TransactionStatusResponse This API allows you to retrieve the status of a disbursement transaction made through AzamPay.
 */
export interface TransactionStatusResponse {
  /**
   * @string A string containing the status of the transaction.
   */
  data: string;

  /**
   * @string A string containing a human-readable message describing the response.
   */
  message: string;

  /**
   * @boolean A boolean indicating whether the request was successful or not.
   */
  success: boolean;

  /**
   * @number An integer indicating the status code of the response.
   */
  statusCode: number;
}

/**
 * @interface TransactionStatus Interface for status method that allows you to retrieve the status of a disbursement transaction made through AzamPay.
 */
export interface TransactionStatus {
  /**
   *@string The transaction ID you received when making the disbursement request.
   */
  reference: string;

  /**
   * @string The name of the mobile network operator (MNO) you used to make the disbursement request.
   */
  bankName: string;
}

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
  ) => Promise<PostCheckOutInterface>;

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

  /**
   * @method partners A method to retrieve payment partner
   */

  partners: (
    options?: RequestOptions
  ) => Promise<PartnersResponse | ErrorResponse>;
}

/**
 * @interface Partners Payment partners
 */
export interface Partners {
  /**
   * @string Payment Partner logo URL
   */
  logoUrl: string;

  /***
   * @string Name of the payment partner e.g (Azampesa, Airtel, Halopesa, Tigopesa, vodacom)
   */
  partnerName: string;

  /**
   * @string Provider enum value e.g (airtel=2, tigo=3, halopesa=4, azampesa=5, Mpesa=10)
   */
  provider: number;

  /**
   * @string Name of the vendor
   */
  vendorName: string;

  /**
   * @string Unique id for payment vendor
   */
  paymentVendorId: string;

  /**
   * @string Unique id for payment partner
   */
  paymentPartnerId: string;

  /**
   * @string Currency code that will convert amount into specific currency format
   */
  currency: string;
}

/**
 * @interface PartnersResponse
 */
export interface PartnersResponse {
  /**
   * @number Response Http Status code.
   */
  statusCode: number;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @interface Partners An array of payment partners
   */
  partners: Partners[];
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
  code?: string;

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

  partners?: (options?: RequestOptions) => Promise<PartnersResponse[]>;
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
  data: string;

  /**
   * @boolean A boolean value indicating if the request was successful or not.
   */
  success: boolean;

  /**
   * @number Response Http Status code.
   */
  statusCode: number;

  /**
   * @uknown Generic response for post checkout
   */
  [key: string]: unknown;
}
