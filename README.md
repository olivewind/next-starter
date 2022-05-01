# Next.js Starter

Out-of-the-box project template for [Next.js](https://nextjs.org/)

## Features
* Latest version of dependencies
  * Node ^16.x
  * Yarn ^1.22.x
  * React ^18.x
  * Next.js ^12.x
* Sending Http Request with [axios](https://github.com/axios/axios)
* Write stylesheet with [less](https://lesscss.org/)
* Build UI with [Arco Design](https://arco.design/), you can replace with other UI libraries（Antd、Material...） in minutes
* Sign and encrypt cookies with [iron-session](https://github.com/vvo/iron-session), you can  integration your backend api using JWT
* Proxy all backend api with [next-http-proxy-middleware](https://github.com/stegano/next-http-proxy-middleware)
* Logging with [winston](https://github.com/winstonjs/winston), rotating file each day
* Deploy with [docker](https://www.docker.com/) and [pm2](https://pm2.keymetrics.io/)
* Very simple, no complex dependencies


## Development

**Step 1. Clone source code and install dependencies** 

```bash
git clone git@github.com:olivewind/next-starter.git
cd next-starter
yarn
```
**Step 2. Set environment variables** 

```
# env.local
SESSION_PASSWORD=password-must-be-at-least-32-characters-long
COOKIE_NAME=NEXT_STARTER
BACKEND_API_URL=http://localhost:3001
```


**Step 3. Run in development mode** 
``` bash
yarn dev
```



## Deployment

```bash
docker build -t next-starter:tag -f Dockerfile .
docker run -p 3000:3000 next-starter:tag
```

or you can use [Vercel](https://vercel.com/) to deploy your app in seconds.