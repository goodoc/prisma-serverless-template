## 굿닥 서버 템플릿입니다.

# 기술 스택
1. Lambda(Serverless)
2. Prisma & Nexus
3. GraphQL

# 로컬 개발서버 실행방법
1. Serverless 설치
2. .env / .env.development 생성
   * .env
    ```
    DATABASE_URL=mysql://root:1234@localhost:3306/template-example
    ENV=development
    ```


   * .env.development
    ```
    DATABASE_URL=mysql://root:1234@localhost:3306/template-example
    ENV=development
    ```
3. ```yarn & npm install```
4. ```yarn migrate:dev```
5. ```yarn generate```
6. ```yarn dev```

# 배포
1. 서버리스 배포 credentials 설정
  ```
  serverless config credentials --provider aws --key AWS_ACCESS_KEY_ID  --secret AWS_SECRET_ACCESS_KEY
  ```

2. serverless.ts / serverless.staging.ts 수정
   * service.name / provider.deploymentBucket.name 수정

3. 2에서 설정한 provider.deploymentBucket.name 과 같은 이름의 s3버킷 생성
   * 람다 리전과 s3리전이 같아야함.

4. 배포할 스테이지에 맞는 .env파일 생성
   * staging: .env.staging
   * production: .env.production
   * 환경변수는 람다 - 구성 - 환경변수 에서도 자유롭게 수정 가능하다.

5. yarn deploy:stg / yarn deploy:prd
   * 스테이지 이름 및 배포설정파일 이름 수정시, package.json의 스크립트 수정



