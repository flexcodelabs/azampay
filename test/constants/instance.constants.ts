export const MnoCheckout = {
  accountNumber: '1292-123',
  amount: '2000',
  currency: 'TZS',
  externalId: '123',
  provider: 'Tigo',
  additionalProperties: null,
};
export const BankCheckout = {
  amount: '2000',
  currencyCode: 'TZS',
  merchantAccountNumber: '1292-123',
  merchantMobileNumber: '255123123123',
  merchantName: null,
  otp: '1234',
  provider: 'NMB',
  referenceId: '123321',
};

export const PostCheckout = {
  amount: '100',
  appName: 'AzampayApp',
  cart: { items: [{ name: 'Shoes' }] },
  clientId: '1292123',
  currency: 'TZS',
  externalId: 'EXT89772223',
  language: 'en',
  redirectFailURL: 'https://failure',
  redirectSuccessURL: 'https://success',
  requestOrigin: 'https://requestorigin.org',
  vendorId: '5',
  vendorName: 'Vendor 1',
};

export const DisburseConstant = {
  source: {
    countryCode: 'US',
    fullName: 'John Doe',
    bankName: 'Bank of America',
    accountNumber: '123456789',
    currency: 'USD',
  },
  destination: {
    countryCode: 'TZ',
    fullName: 'Jane Doe',
    bankName: 'Azania Bank',
    accountNumber: '987654321',
    currency: 'TZS',
  },
  transferDetails: {
    type: 'SWIFT',
    amount: 5000,
    date: '2022-01-01',
  },
  externalReferenceId: '123',
  remarks: 'Payment for goods',
};
