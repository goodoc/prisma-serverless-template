import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import Prisma from './safePrisma';

export interface HeraHeadersInterface extends IncomingHttpHeaders {
  'x-api-token': string,
  'x-api-refreshtoken': string,
  'x-api-key': string,
  'x-device-type'?: string
  'x-device-version'?: string
  'x-device-uuid'?: string
  'x-device-id'?: string
  'x-device-pid'?: string
  'x-api-hospitalid'?: string
  'Content-Type': 'application/json',
}

// Nexus가 TypeGen하는데 필요한 타입이므로 얘는 건드리면 안됨.
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Context {
  prisma: PrismaClient;
  headers: HeraHeadersInterface;
  operationName: string;
}

export const createContext = async ({ req }: { req: Request }) => {
  const headers = req?.headers;
  const operationName = req?.body?.operationName;
  const prisma = Prisma.getInstance();

  return {
    prisma,
    headers,
    operationName,
  };
};

