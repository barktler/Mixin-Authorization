# Mixin-Authorization

[![Build Status](https://travis-ci.com/barktler/Mixin-Authorization.svg?branch=main)](https://travis-ci.com/barktler/Mixin-Authorization)
[![codecov](https://codecov.io/gh/barktler/Mixin-Authorization/branch/main/graph/badge.svg)](https://codecov.io/gh/barktler/Mixin-Authorization)
[![npm version](https://badge.fury.io/js/%40barktler%2Fmixin-authorization.svg)](https://www.npmjs.com/package/@barktler/mixin-authorization)
[![downloads](https://img.shields.io/npm/dm/@barktler/mixin-authorization.svg)](https://www.npmjs.com/package/@barktler/mixin-authorization)

:fireworks: Authorization Mixin for Barktler

## Install

```sh
yarn add @barktler/mixin-authorization
# Or
npm install @barktler/mixin-authorization --save
```

## Bearer Authorization

```ts
import { createBearerAuthorizationMixin } from "@barktler/mixin-authorization";
import { YourAPI } from "somewhere";

const api: YourAPI = new YourAPI();
api.useMixin(createBearerAuthorizationMixin({
    getTokenFunction: async () => getYourToken(),
}));
```

## Basic Authorization

```ts
import { createBasicAuthorizationMixin } from "@barktler/mixin-authorization";
import { YourAPI } from "somewhere";

const api: YourAPI = new YourAPI();
api.useMixin(createBasicAuthorizationMixin({
    getTokenFunction: async () => getYourToken(),
    base64: true, // default true, false for not encode
}));
```

## Documents

See [Barktler Documents](//barktler.com).
