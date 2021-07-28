import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'prisma-lambda-template',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    deploymentBucket: { name: 'prisma-lambda-template-stg' },
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'ap-northeast-2'
  },
  functions: {
    graphql: {
      handler: 'handler.graphql',
      events: [
        {
          http: {
            method: 'get',
            path: 'graphql',
            cors: true
          },
        },
        {
          http: {
            method: 'post',
            path: 'graphql',
            cors: true
          },
        }
      ]
    }
  },
  package: {
    patterns: ['!node_modules/.prisma/client/query-engine-*', 'node_modules/.prisma/client/query-engine-rhel-*']
  }
}

module.exports = serverlessConfiguration;
