# NODEJS AZAMPAY SDK

AzamPay NodeJs SDK to help you easily and seamlessly integrate with Azampay APIs.

## Table of Contents

1. [Installations](#installation-and-use)
2. [Use](#use) <br>
   2.1 [Get Token](#get-token) <br>
   2.2 [Bank Checkout](#bank-checkout) <br>
   2.3 [Mno Checkout](#mno-checkout) <br>
   2.4 [Disbursement](#disbursement) <br>
   2.5 [Name Lookup](#name-lookup) <br>
   2.6 [Transaction Status](#transaction-status) <br>
   2.7 [Post Checkout](#post-checkout) <br>
   2.7 [Payment Partners](#payment-partners)

<br>

# Installation and Use

From terminal in the root directory of your project, run

```sh

npm i azampay

```

<br>

# Use

<details>
<summary>ES6 Import</summary>

```JS

import azampay from 'azampay'

```

</details>

<details>
<summary>Module Require</summary>

```JS

const azampay = require('azampay').default

```

</details>

- The `import` or `require` from `azampay` package exports two properties.

  1.  `getToken` method that is used to retrieve access token from Azam Pay
  2.  `instance` a class that can be used or extended to add functionalities to the `azampay` package

## Get Token

`Requirement Definition`

| Property     | Description                                                          | Type   | Required |
| ------------ | -------------------------------------------------------------------- | ------ | -------- |
| env          | Enum: SANDBOX \| LIVE. Azampay environment. Default SANDBOX          | String | [ ]      |
| clientId     | It will be the client id generated during application registration.  | String | [x]      |
| appName      | It will be the name of application.                                  | String | [x]      |
| clientSecret | It will be the secret key generated during application registration. | String | [x]      |
| apiKey       | Azam Pay API key given as token in the settings page.                | String | [x]      |

`Request Payload`

```JSON

{
  "env": "string",
  "clientId": "string",
  "appName": "string",
  "clientSecret": "string",
  "apiKey": "string",
}

```

`Request Method`

```JS

const token = await azampay.getToken(payload);

```

`Response`

If successful, the response will be of type [TokenResponse](#token-response) or [ErrorResponse](#error-response)

```JS

{
  data: { accessToken: string; expire: string };
  success: boolean;
  message: string;
  code: string | number;
  statusCode: number;
  bankCheckout: (
    payload: BankCheckout,
    options: RequestOptions
  ) => Promise<CheckoutResponse>;

  mnoCheckout: (
    payload: MnoCheckout,
    options: RequestOptions
  ) => Promise<CheckoutResponse>;

  postCheckout: (
    payload: PostCheckOut,
    options: RequestOptions
  ) => Promise<PostCheckOutInterface>;

  disburse: (
    payload: Disburse,
    options: RequestOptions
  ) => Promise<DisburseResponse>;

  transactionStatus: (
    payload: TransactionStatus,
    options: RequestOptions
  ) => Promise<TransactionStatusResponse>;

  nameLookup: (
    payload: NameLookup,
    options: RequestOptions
  ) => Promise<NameLookupResponse>;
}

```

`Response Definition`

| Property          | Description                                                                              | Type             |
| ----------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| data              | Azam Pay respnse with access token and expire time                                       | Object           |
| success           | A `true` boolean value indicating that the request was successfull                       | Boolean          |
| message           | Response message                                                                         | String           |
| code              | Response code.                                                                           | Number \| String |
| statusCode        | Response Http Status code. Possibly `200` or `201`                                       | Number           |
| bankCheckout      | A method to initiate a Bank checkout with Azam Pay.                                      | Method           |
| mnoCheckout       | A method to initiate MNO checkout with Azam Pay.                                         | Method           |
| disburse          | A method used to lookup the name associated with a bank account or Mobile Money account  | Method           |
| transactionStatus | A method used to retrieve the status of a disbursement transaction made through AzamPay. | Method           |
| nameLookup        | A method used to lookup the name associated with a bank account or Mobile Money account. | Method           |

<br>

# Bank Checkout

Initiating a bank checkout, we can use two methods, one from the token results method and the other from the Azam Pay instance exported from the azampay package.

Bank checkout method takes two arguments, the first with the request payload for Azam Pay bank checkout and second is [optional with additional options](#request-options).

`Request Payload`

```JS

{

  amount: string;
  currencyCode: string;
  merchantAccountNumber: string;
  merchantMobileNumber: string;
  merchantName?: string | null;
  otp: string;
  provider: 'CRDB' | 'NMB' |
  referenceId: string;
  additionalProperties?: Record<string, unknown> | null;
}

```

1. `Request Payload Definition`

| Property              | Definition                                                                                                 | Type   |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| amount                | This is amount that will be charged from the given account.                                                | String |
| currencyCode          | Code of currency                                                                                           | String |
| merchantAccountNumber | This is the account number/MSISDN that consumer will provide. The amount will be deducted from this.       | String |
| merchantMobileNumber  | Mobile number                                                                                              | String |
| merchantName          | Nullable consumer name.                                                                                    | String |
| otp                   | One time password                                                                                          | String |
| provider              | Enum: CRDB \| NMB BankProvider.                                                                            | String |
| referenceId           | This id belongs to the calling application. Maximum Allowed length for this field is 128 ascii characters. | String |
| additionaProperties   | This is additional JSON data that calling application can provide. This is optional.                       | Object |

2. `Request Options Definition`

- These are optional if you use the method from the response in [getToken](#get-token) otherwise mandatory if using the instance and the options were not passed during instantiation.

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.bankCheckout(payload, options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.bankCheckout(payload, options)

```

</details>

`Response`

```JS
{
  transactionId: string,
  message: string,
  succcess: true
}

```

#

NB: Every response has a `success` property denoting whether the request was successful or not and if it wasn't, the response will be of type [Error Response](#error-response)

<br>

## MNO Checkout

For request method explanation, refer to [Bank Checkout](#bank-checkout)'s explanation.

1. `Request Payload Definition`

| Property            | Definition                                                                                                   | Type   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| amount              | This is amount that will be charged from the given account.                                                  | String |
| currencyCode        | Code of currency                                                                                             | String |
| accountNumber       | This is the account number/MSISDN that consumer will provide. The amount will be deducted from this account. | String |
| provider            | Enum: Airtel \| Tigo \| Halopesa \| Azampesa \| Mpesa.                                                       | String |
| externalId          | This id belongs to the calling application. Maximum Allowed length for this field is 128 ascii characters.   | String |
| additionaProperties | This is additional JSON data that calling application can provide. This is optional.                         | Object |

```JS

{
  accountNumber: string;
  amount: string;
  currency: string;
  externalId: string;
  provider: 'Airtel' | 'Tigo' | 'Halopesa' | 'Azampesa' | 'Mpesa' | string;
  additionalProperties?: Record<string, unknown> | null;
}

```

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.mnoCheckout(payload, options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.mnoCheckout(payload, options)

```

</details>

`Response`
The response is the same as the [Bank Checkout](#bank-checkout)'s

<br>

## Disbursement

This method allows for the transfer of money from other countries to Tanzania. It requires the authorization token generated above, passed as a header in the request. The request should also contain details of the source, destination, and transfer details. Additionally, the request can include an external reference ID and remarks.

This method takes two arguments, mandatory payload and the other optional options as explained in [Bank Checkout](#bank-checkout)

`Payload`

```JS

{
  source: Source;
  destination: Destination;
  transferDetails: TransferDetails;
  externalReferenceId: string;
  remarks: string;
}

```

| Property            | Description                                         | Type                             |
| ------------------- | --------------------------------------------------- | -------------------------------- |
| source              | Contains information about the source account.      | [Object](#source-or-destination) |
| destination         | Contains information about the destination account. | [Object](#source-or-destination) |
| transferDetails     | Contains information about the transfer.            | [Object](#transfer-details)      |
| externalReferenceId | An external reference ID to track the transaction.  | String                           |
| remarks             | Any remarks to be included with the transaction.    | String                           |

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.disburse(payload, options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.disburse(payload, options)

```

</details>

`Response`

```JS

{
  data: string;
  message: string;
  success: boolean;
  statusCode: number;
}

```

`Description`

| Property   | Description                                                           | Type    |
| ---------- | --------------------------------------------------------------------- | ------- |
| data       | A string containing the status of the transaction.                    | String  |
| message    | A string containing a human-readable message describing the response. | String  |
| success    | A boolean indicating whether the request was successful or not.       | Boolean |
| statusCode | An integer indicating the status code of the response.                | Number  |

<br>

## Name Lookup

This method is used to lookup the name associated with a bank account or Mobile Money account.

This method takes two arguments, mandatory payload and the other optional options as explained in [Bank Checkout](#bank-checkout)

`Payload`

```JS

{
  bankName: string;
  accountNumber: string;
}

```

`Description`

| Property      | Description                                                 | Type   |
| ------------- | ----------------------------------------------------------- | ------ |
| bankName      | Bank name or Mobile Money name associated with the account. | String |
| accountNumber | Bank account number or Mobile Money number.                 | String |

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.nameLookup(payload, options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.nameLookup(payload, options)

```

</details>

`Response`

```JS

{
  name: string;
  message: string;
  success: boolean;
  accountNumber: string;
  bankName: string;
}

```

`Description`

| Property      | Description                                                      | Type    |
| ------------- | ---------------------------------------------------------------- | ------- |
| bankName      | Bank name or Mobile Money name associated with the account.      | String  |
| accountNumber | Bank account number or Mobile Money number.                      | String  |
| name          | Name associated with the account.                                | String  |
| message       | A brief description of the response status.                      | String  |
| success       | A boolean value indicating if the request was successful or not. | Boolean |

<br>

## Transaction Status

This method allows you to retrieve the status of a disbursement transaction made through AzamPay.
This method takes two arguments, mandatory payload and the other optional options as explained in [Bank Checkout](#bank-checkout)

`Payload`

```JS

{
  reference: string;
  bankName: string;
}

```

`Description`

| Property  | Description                                                                              | Type   |
| --------- | ---------------------------------------------------------------------------------------- | ------ |
| reference | The transaction ID you received when making the disbursement request.                    | String |
| bankName  | The name of the mobile network operator (MNO) you used to make the disbursement request. | String |

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.transactionStatus(payload, options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.transactionStatus(payload, options)

```

</details>

`Response`

| Property   | Description                                                           | Type    |
| ---------- | --------------------------------------------------------------------- | ------- |
| data       | A string containing the status of the transaction.                    | String  |
| message    | A string containing a human-readable message describing the response. | String  |
| success    | A boolean indicating whether the request was successful or not.       | Boolean |
| statusCode | An integer indicating the status code of the response.                | Number  |

<br>

## Post Checkout

For this post request, send all params that are mentioned below to this end point.

This end point will respond back with the URL of your payments. Merchant Application can open this url in a new window to continue with the checkout process of the transaction

<br>

`Payload`

```JS

{
  appName: string;
  clientId: string;
  vendorId: string;
  language: string;
  currency: string;
  externalId: string;
  requestOrigin: string;
  redirectFailURL: string;
  redirectSuccessURL: string;
  vendorName: string;
  amount: string;
  cart: Cart;
}

```

`Description`

| Property           | Description                                                 | Type   |
| ------------------ | ----------------------------------------------------------- | ------ |
| amount             | This is amount that will be charged from the given account. | String |
| appName            | This is the application name.                               | String |
| cart               | Shoping cart with multiple item.                            | Object |
| clientId           | Client id is unique id for identify client.                 | String |
| externalId         | 30 charecters long unique string.                           | String |
| language           | Language code for transalate the application.               | String |
| redirectFailURL    | URL that you want to redirected to at transaction failure.  | String |
| redirectSuccessURL | URL that you want to redirected to at transaction success.  | String |
| requestOrigin      | URL which the request is being originated.                  | String |
| vendorId           | Unique id for validate vendor.                              | String |
| vendorName         | Name of vendor.                                             | String |

`Response`

This returns a success boolean property indicating whether the operation was successful or not and a data string

```JS

{
  data: string
  success: boolean;
  [key: string]: unknown;
}

```

<br>

## Payment Partners

This method will return the registered partners of the provided merchant

This method takes optional options argument as explained in [Bank Checkout](#bank-checkout)

`Method`

<details>
<summary>Request from Token Response</summary>

```JS

await token.partners(options)

```

</details>

<details>
<summary>Request from Instance</summary>

```JS

const instance = new azampay.instance({accessToken: token.data.accessToken,apiKey: 'YOUR API KEY'})
await instance.partners(options)

```

</details>

`Response`

```JS
{
  success: boolean;
  partners: Partners[];
}

```

`Description`

| Property | Description                                                      | Type               |
| -------- | ---------------------------------------------------------------- | ------------------ |
| success  | A boolean value indicating if the request was successful or not. | Boolean            |
| partners | An array of payment partners.                                    | [Array](#partners) |

<br>

## Partners

| Property         | Description                                                                     | Type   |
| ---------------- | ------------------------------------------------------------------------------- | ------ |
| currency         | Currency code that will convert amount into specific currency format            | String |
| logoUrl          | Payment Partner logo URL                                                        | String |
| partnerName      | Name of the payment partner e.g (Azampesa, Airtel, Halopesa, Tigopesa, vodacom) | String |
| paymentPartnerId | Unique id for payment partner                                                   | String |
| paymentVendorId  | Unique id for payment vendor                                                    | String |
| provider         | Provider enum value e.g (airtel=2, tigo=3, halopesa=4, azampesa=5, Mpesa=10)    | String |
| vendorName       | Name of vendor                                                                  | String |

# Request Options

```JS

{
  apiKey: string;
  accessToken: string;
  env: 'LIVE' | 'SANDBOX';
}

```

<br>

# Source or Destination

`Payload`

```JS
 {
  countryCode: string;
  fullName: string;
  bankName: string;
  accountNumber: string;
  currency: string;
}
```

`Description`

| Property      | Description                                 | Type   |
| ------------- | ------------------------------------------- | ------ |
| countryCode   | Country / Destination code                  | String |
| fullName      | Source / Destination account full name      | String |
| bankName      | Source / Destination account bank name      | String |
| accountNumber | Source / Destination account account number | String |
| currency      | Source / Destination account currency       | String |

<br>

# Transfer Details

`Payload`

```JS

 {
  type: string;
  amount: number;
  date: string;
}

```

`Description`

| Property | Description     | Type   |
| -------- | --------------- | ------ |
| type     | Transfer type   | String |
| amount   | Transfer amount | String |
| date     | Transfer date   | String |

<br>

# Error Response

```JS

{

  success: boolean;
  message: string;
  code: string  | number;
  statusCode: number;
}

```

`Property Definition`

| Property   | Description                                                              | Type             |
| ---------- | ------------------------------------------------------------------------ | ---------------- |
| success    | A `false` boolean value indicating that the request was not successfull. | Boolean          |
| message    | Error message                                                            | String           |
| code       | Error code                                                               | Number \| String |
| statusCode | Error Http Status code                                                   | Number           |

<br>

### Developed and Maintained with ❤️ at [Flexcode Labs](https://flexcodelabs.com)
