# API definitions

## Logging In

### LoginRequest
```js
{
    username: string,
    sessionKey?: string
}
```
The sessionKey is optional and must be included if the client wishes to continue with it's current session.

### LoginResponse
```js
{
    username: string,
    sessionKey: string,
    success: boolean
}
```
