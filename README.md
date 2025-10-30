# Flida SDK

## Установка

### NPM
```
npx jsr add @flida/sdk
```

### PNPM
```
pnpm i jsr:@flida/sdk
```

### YARN
```
yarn add jsr:@flida/sdk
```

## Пример
```ts
import {SDK} from '@flida/sdk'

const sdk = new SDK({
  clientId: '<client_id_from_console>',
  redirectUri: '<redirect_uri_from_console>',
  scope: ['e-mail-address', 'openid'],
})

button.addEventListener("click", () => {
  sdk.authorize() // Переадресация
})
```
Флоу после успешного входа:
```ts
// https://example.com?code=<random>&state=<random>

// Обмен code & state на токены:
const tokenResponse = await sdk.exchangeCode(code, state) // Вернет объект с токенами
saveToYourStorage(tokenResponse)

// Обновление токена:
const refreshToken = getFromYourStorage('refresh_token')
const tokenResponse = await sdk.refreshToken(refreshToken)

// Получение информации об аккаунте:
const accessToken = getFromYourStorage('access_token')
const getUserInfo = await sdk.getUser(accessToken)
```
