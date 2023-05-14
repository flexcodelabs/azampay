import dotenv from 'dotenv';
dotenv.config();
import azampay from '../src';
import {
  ErrorResponse,
  TokenResponse,
} from '../src/shared/interfaces/base.interface';
import {
  BankCheckout,
  MnoCheckout,
  DisburseConstant,
  PostCheckout,
} from './constants/instance.constants';
jest.setTimeout(300000);

/**
 * Azampay response for token request. The response can either be of type TokenResponse or ErrorResponse
 */
let results: TokenResponse | ErrorResponse;

describe('Get Token Success', () => {
  it('Should return a token', async () => {
    results = await azampay.getToken({
      env: 'SANDBOX',
      clientId: process.env.CLIENTID ?? '',
      appName: process.env.NAME ?? '',
      clientSecret: process.env.SECRET ?? '',
      apiKey: process.env.TOKEN ?? '',
    });
    expect(results.success).toBe(true);
  });
});

describe('Checkout from Token Response', () => {
  it('Should perform MNO checkout', async () => {
    const mno = results.mnoCheckout
      ? await results?.mnoCheckout(MnoCheckout)
      : undefined;
    expect(mno).toBeDefined();
    expect(mno?.success).toBe(true);
    expect(mno?.transactionId).toBeDefined();
  });

  it('Should perform Bank checkout', async () => {
    const bank = results.bankCheckout
      ? await results?.bankCheckout(BankCheckout)
      : undefined;

    expect(bank).toBeDefined();
    expect(bank?.msg).toBeDefined();
  });

  it('Should get transaction status ', async () => {
    const transactionStatus = results.transactionStatus
      ? await results?.transactionStatus({
          bankName: 'NMB',
          reference: 'db67aa0e67284b9d84fb9389874e7dad',
        })
      : undefined;
    expect(transactionStatus).toBeDefined();
    expect(transactionStatus?.message).toBeDefined();
    expect(transactionStatus?.success).toBe(false);
  });

  it('Should lookup a name', async () => {
    const transactionStatus = results.nameLookup
      ? await results?.nameLookup({
          bankName: 'string',
          accountNumber: 'string',
        })
      : undefined;
    expect(transactionStatus).toBeDefined();
    expect(transactionStatus?.message).toBeDefined();
    expect(transactionStatus?.success).toBe(false);
  });

  it('Should do disbursement', async () => {
    const disbursement = results.disburse
      ? await results?.disburse(DisburseConstant)
      : undefined;
    expect(disbursement).toBeDefined();
    expect(disbursement?.message).toBe('Not Found');
    expect(disbursement?.success).toBe(false);
  });

  it('Should do a post checkout', async () => {
    const checkout = results.postCheckout
      ? await results?.postCheckout(PostCheckout)
      : undefined;
    expect(checkout).toBeDefined();
    expect(checkout).toBeDefined();
  });
});

describe('Checkout from Instance', () => {
  it('Should perform Bank checkout', async () => {
    const instance = new azampay.instance({
      accessToken: results.data?.accessToken,
      apiKey: process.env.TOKEN ?? '',
    });
    const bank = await instance.bankCheckout(BankCheckout);
    expect(bank).toBeDefined();
    expect(bank?.msg).toBeDefined();
  });
});

describe('Get Token Fail', () => {
  it('Should return a token', async () => {
    results = await azampay.getToken({
      env: 'SANDBOX',
      clientId: '',
      appName: '',
      clientSecret: '',
      apiKey: '',
    });
    expect(results.success).toBe(false);
    expect(results.statusCode).toBe(400);
    expect(results.mnoCheckout).toBeUndefined();
  });
});
