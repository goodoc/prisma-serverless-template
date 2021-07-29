type Env = 'production' | 'development'

type EnvVariables = {
  ENV: Env,
}

const envVariables: EnvVariables = {
  ENV: process.env.ENV as Env,
}

export default envVariables