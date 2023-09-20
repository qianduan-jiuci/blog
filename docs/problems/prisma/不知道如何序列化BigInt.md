# Do not know how to serialize a BigInt

在main.ts中

```ts
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
```