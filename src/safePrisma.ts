/* eslint-disable @typescript-eslint/no-empty-function */
import { PrismaClient } from '@prisma/client';

type PrismaClients = {
  read: PrismaClient,
  write: PrismaClient
};
export default class SafePrisma {
  private static prismaClients: PrismaClients;

  private constructor() { }

  static getInstance(forRead = false) {
    if (!SafePrisma.prismaClients) {
      SafePrisma.initInstances();
    }
    if (!SafePrisma.prismaClients?.write) {
      SafePrisma.addWriteInstance();
    }
    if (forRead) {
      if (!SafePrisma.prismaClients?.read) {
        SafePrisma.addReadInstance();
      }
      return SafePrisma.prismaClients.read;
    }
    return SafePrisma.prismaClients.write;
  }

  static initInstances() {
    SafePrisma.prismaClients = {
      read: new PrismaClient({
        log: ['query'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL_RO || process.env.DATABASE_URL,
          },
        },
      }),
      write: new PrismaClient({
        log: ['query'],
      }),
    };
  }

  static addWriteInstance() {
    SafePrisma.prismaClients.write = new PrismaClient({
      log: ['query'],
    });
  }

  static addReadInstance() {
    SafePrisma.prismaClients.read = new PrismaClient({
      log: ['query'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL_RO || process.env.DATABASE_URL,
        },
      },
    });
  }
}
