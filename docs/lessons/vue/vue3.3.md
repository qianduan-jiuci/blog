# vue3.3新特性

vue升级到vue3.3， 以下依赖项需要指定最低支持版本
- volar / vue-tsc@^1.6.4
- vite@^4.3.5
- @vitejs/plugin-vue@^4.2.0
- vue-loader@^17.1.0 (if using webpack or vue-cli) 

## `<script setup>`和TypeScript 的使用改进

### 更多宏的导入和更多复杂类型支持

#### 宏的类型支持从外部直接导入使用


`在vue3.2中，defineProps和defineEmits的类型只允许在当前文件定义，不允许从外部直接导入， vue3.3完善了这部分`

下面的代码在vue3.3以前的版本中会抛出异常，但现在可以正常使用
```vue
<script setup lang="ts">
import type { Props } from './foo'
defineProps<Props>()
</script>
```

而且，还支持更加复杂的类型，如：

```vue
<script setup lang="ts">
import type { Props } from './foo'
defineProps<Props & {
  additionalProp?: string
}>()
</script>
```

请注意，复杂类型支持是基于 AST 的，因此不是 100% 全面的。一些需要实际类型分析的复杂类型，例如不支持条件类型。您可以对单个 props 的类型使用条件类型，但不能对整个 props 对象使用条件类型。


```vue
<script setup lang="ts">
import type { Props } from './foo'
// will throw a compiler error
defineProps<Props extends object ? Props : {}>()
</script>
```


#### 泛型组件

使用 `<script setup>` 的组件现在可以通过 generic 属性接受泛型类型参数：
```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

generic 的值与 TypeScript 中 <...> 之间的参数列表完全相同。例如，您可以使用多个参数、扩展约束、默认类型和引用导入类型：

```vue
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

此功能以前需要显式选择加入，但现在在最新版本的 volar / vue-tsc 中默认启用。

泛型支持下的`defineComponent`


#### 更符合人体工程学的`defineEmits`
以前，`defineEmits`的类型参数仅支持调用签名语法：
```ts
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()
```
该类型与emit的返回类型相匹配，但有点冗长并且写起来很困难。 3.3 引入了一种更符合人体工程学的用类型`defineEmits`的方式：

```ts
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
// foo, bar是自定义事件的名称， 后面的具体的参数列表
```
在类型文字中，键是事件名称，值是指定附加参数的数组类型。尽管不是必需的，但您可以使用带标签的元组元素来实现明确性，如上面的示例所示。目前仍然支持调用签名语法

#### 带有类型提示的插槽`defineSlots`
新的defineSlots宏可用于声明预期的插槽及其各自的预期插槽道具：
```vue
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
</script>
<template>
  <slot name="default" :msg="'1334'"></slot>
  <slot name="name" :id="234234" />
</template>
```

DefineSlots() 仅接受类型参数，不接受运行时参数。类型参数应该是类型文字，其中属性键是槽名称，值是槽函数。函数的第一个参数是插槽期望接收的道具（具名插槽），其类型将用于模板中的插槽道具（<slot></slot>）。 DefineSlots 的返回值与 useSlots 返回的插槽对象相同。

目前的一些局限性： 
- volar / vue-tsc 中尚未实现所需的插槽检查
- 插槽函数返回类型目前被忽略，可以是任何类型(any)，但我们将来可能会利用它来检查槽内容

## 实验性的内容

很多东西都是先在VueUse，VueMacros使用一段时间后merge进core。有时间再记录


### defineProps解构仍然保持响应式
```vue
<script setup>
import { watchEffect } from 'vue'

const { msg = 'hello' } = defineProps(['msg'])

watchEffect(() => {
  // accessing `msg` in watchers and computed getters
  // tracks it as a dependency, just like accessing `props.msg`
  console.log(`msg is: ${msg}`)
})
</script>

<template>{{ msg }}</template>
```

### defineModel

该功能还未发布到正式版，不能直接使用
vite中添加以下配置：
```ts
// vite.config.js
export default {
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    })
  ]
}
```
vue-cli中添加以下配置：
```ts
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          defineModel: true
        }
      })
  }
}
```

以前，对于支持与 v-model 双向绑定的组件，它需要 (1) 声明一个 prop 并 (2) 在打算更新 prop 时发出相应的 update:propName 事件：

```vue

<!-- before 封装input组件， 不能在组件内部使用v-model，需要使用原始形式-->
<!-- Comp -->

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{
  "update:modelValue": [value: string];
}>();
const onInput = (e: any) => {
  emits("update:modelValue", e.target.value);
};
</script>
<template>
  <input type="text" :value="props.modelValue" @input="onInput" />
</template>

<!-- Parent -->

<script>
import { ref } from "vue";
import Comp from "./components/Comp.vue";
const input = ref<string>("input");
const onInput = (value: string) => {
  input.value = value;
};
</script>
<template>
  <Comp :model-value="input" @update:ModelValue="onInput"></Comp> 
</template>
```

这个功能简化了 props和emits的过程，直接使用defineModel声明，模板中使用v-model

```vue
<!-- after 使用defineModel简化操作--> 
<!-- Comp -->
<script setup>
const modelValue = defineModel()

</script>

<template>
  <input v-model="modelValue">
</template>

<!-- Parent -->
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'

const msg = ref('')
</script>
<template>
  <Comp v-model="msg">
</template>
```

Details: [RFC#503](https://github.com/vuejs/rfcs/discussions/503)



### defineOptions

新的defineOptions宏允许直接在`<script setup>`中声明组件选项，而不需要单独的`<script>`块

`vue3.2`

```vue
<!-- before -->
<script setup lang="ts">
......
</script>
<script>
export default {
  inheritAttrs: false,
  name: 'Comp',

}
</script>
```

`vue3.3`

```vue
<!-- after -->
<script setup lang="ts">
defineOptions({ 
  inheritAttrs: false, 
  name: 'Comp', 
})
</script>
```

### toRef 和 toValue 提供更好的 Getter 支持

`toRef` 已得到增强，支持将值/getters/现有引用规范化为引用

```js
// equivalent to ref(1)
toRef(1)
// creates a readonly ref that calls the getter on .value access
toRef(() => props.foo) // 只读，不能通过.value进行修改
// returns existing refs as-is
toRef(existingRef)
```

toRef原来就有，现在做了一个对于getter的增强，tovalue原来没有，3.3新出的

思考？为什么要对toRef支持一个getter
在之前，响应式丢失是一个很头疼的问题，比如使用defineProps接受外部传递的值，需要拿到defineProps对象的属性值
```vue
<script setup lang="ts">
const props = defineProps(['msg'])
useXXX(props.msg); //这样会丢失数据的响应式，通常使用下面的方法解决
useXXX(toRef(props, "msg")); //保证响应式的不丢失
function useXXX(msg: any) {
  console.log(msg)
}
</script>
```


### JSX支持

目前，Vue 的类型自动注册全局 JSX 类型。这可能会导致与其他需要 JSX 类型推断的库一起使用的冲突，特别是 React。

从 3.3 开始，Vue 支持通过 TypeScript 的 jsx ImportSource 选项指定 JSX 命名空间。这允许用户根据他们的用例选择全局或每个文件选择加入。

为了向后兼容，3.3 仍然全局注册 JSX 命名空间。我们计划在 3.4 中删除默认的全局注册。如果您将 TSX 与 Vue 结合使用，则应在升级到 3.3 后将显式 jsxImportSource 添加到 tsconfig.json 中，以避免在 3.4 中出现损坏。