## Personal Prettier Configuration.

> [!NOTE]
> This configuration includes two built-in plugins: one for sorting HTML attributes and another for organizing TypeScript import statements.<br>
> I believe formatting tools should assist good coding practices rather than compensate for careless ones.<br>
> Plugins serve only as auxiliary tools!

### USED

```sh
pnpm add -D @naiheyoung/prettier
```

#### `.prettierrc`

```plain
"@naiheyoung/prettier"
```

#### `.prettierrc.mjs`

```ts
import n from '@naiheyoung/prettier'

export default n
```

### Command Syntax Supported

> Inspired by [`eslint-plugin-command`](https://eslint-plugin-command.antfu.me)

- [x] toarrow / tofun

### Example Output

```vue
<template>
  <div a b c @click>something.</div>
</template>

<script setup lang="ts">
import type xxx from 'xxx'
import xxxx from 'xxx'
import { a, b, c, _ } from 'xxx'
</script>
```

see more [`plugin.test.ts`](https://github.com/naiheyoung/prettier-config/blob/main/__tests__/plugin.test.ts)

### Default Rules

```ts
{
  html: {
    lang: 0
  },
  meta: {
    charset: 0,
    name: 1,
    content: 2
  },
  link: {
    rel: 0,
    href: 1,
    type: 2
  },
  script: {
    type: 0,
    setup: 0,
    src: 1,
    lang: 1
  },
  svg: {
    xmlns: 0,
    width: 1,
    height: 2
  },
  other: {
    id: 0,
    ':id': 0,
    ref: 1,
    ':ref': 1,
    style: 2,
    ':style': 2,
    class: 3,
    ':class': 3,
    ':': 4
  }
}
```

> Ideally, the configuration would accept a custom object.<br>
> However, Prettier plugins don't currently support parameters of type `object` or `function`, so this is the current limitation.<br>
> Perhaps this will change in the future :man_shrugging:.
