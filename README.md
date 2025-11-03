# Flida SDK

## Установка

### NPM
```
npx jsr add @flida/web-sdk
```

### PNPM
```
pnpm i jsr:@flida/web-sdk
```

### YARN
```
yarn add jsr:@flida/web-sdk
```

## Пример
```ts
import { FlidaSDK, SDKMode } from '@flida/web-sdk'

const sdk = new FlidaSDK({
  clientId: '<client_id_from_console>',
  redirectUri: '<redirect_uri_from_console>',
  scope: ['e-mail-address', 'openid'],
  mode: SDKMode.POPUP,
  mock: {
    api: 'https://mock-api.server.com'
  }
})

button.addEventListener("click", () => {
  // При успешном входе вернет code & state
  sdk.authorize().then((response) => {})
})
```
Флоу после успешного входа:
```ts
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
