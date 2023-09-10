# 第四章：泛型
## 什么是泛型
```tsx
    function dump(args: string): string {
        return args
    }

    dump('九辞');

    function dumpBoolean(args: boolean): boolean {
        return args;
    }

    dumpBoolean(true)
```
二者做的事情是一样的，这样要完成复用这肯定是不行的。需要借助泛型
什么是泛型 - 宽泛的类型 
目的： 为了很好的复用，对传入的参数不进行判断。但类型又不能是any
```tsx
function dump<T>(args: T): T {
  return args
}

let jc = dump('九辞'); // 根据传入的参数进行返回相应的类型
```
泛型可以理解为类型的参数，如果没有指定类型的参数，他会自动推断相应的类型
```tsx
    function dump<T>(args: T): T {
        return args
    }

    let jc = dump<string>('九辞');
```
这个T相当与一个变量，动态接收类型
## 泛型的继承
T里面是没有任何类型约束的 
```tsx
type T = {}
// 如果想让他有类型约束，需要进行泛型的继承： <T extends t>
```
```tsx
type t = { length: number }; // T现在没有任何类型约束，如果想让他有类型，就可以使用继承
function getLength<T extends string | string[]>(args:T):number {
  return args.length
}

function getLength<T extends t>(args:T):number {
  return args.length
}

console.log(getLength<string[]>(['123', '23k4', 'sjd']));
```
```tsx
type t = { length: number }; 
function getLength<T extends t>(args:T[]):number {
        return args.length
    }

// 这个时候已经确定了T是个数组类型，泛型T指的数组元素的类型
console.log(getLength<string>(['123', '23k4', 'sjd']));
```
## 在类中使用泛型
需求，在类中完成对数组和字符串的管理
场景： 在集合中统一进行管理某些内容(评论, 点赞数量)

集合： 对数据的管理，用数组来管理
局限性很大： 只能管理统一类型的数据，如果想要管理另外一种数据类型的数据，只能重新写一遍
解决办法:  使用泛型`<T>`  
存储字符串数据，使用对象数据
```tsx
type UserType = {
    name: string,
    age: number
}
const jc:UserType = {name: '九辞',age: 18}
const hd: UserType = {name: '后盾人',age: 20}
class Collections<User> {
    data: User[] = []
    public push(...items: User[]):void {
        this.data.push(...items)
    }
    public getLength(): number{
        return this.data.length
    }
}
// 集合中存储数字类型
const collectionNumber = new Collections<number>()
collectionNumber.push(1,2,3,4,5)
// 集合中存储字符串类型
const collectionString = new Collections<string>()
collectionString.push('九辞','jiuci.com')
// 集合中存储用户类型
const collectionUser = new Collections<UserType>()
collectionUser.push(jc,hd)
console.log(collectionUser.getLength());
```
## 构造函数中使用泛型
```tsx
    interface UserInterface {
        name: string,
        age: number
    }
    class User<T> {
        public constructor(private _user: T){}
        public getUser(): T {
            return this._user
        }
    }

    const jc = new User<UserInterface>({name: '九辞',age: 18})
    console.log(jc.getUser().age);
```
## 接口中使用泛型和泛型的多类型定义
多类型定义： <A, B, C>
```tsx
    interface ArticleInterface<B,C> {
        title: string,
        isLock: B,
        comments: C[]
    }
    type CommentsType = {
        author: string,
        content: string
    }

    const article:ArticleInterface<boolean, CommentsType> = {
        title: '后盾人网站，https://www.baidu.com',
        isLock: true,
        comments: [{author: '九辞',content: '这是一个评论'}]
    }
```
```typescript
interface ArticleInterface<B,C> {
        title: string,
        isLock: B
        comments: C[]
    }
    interface CommentsInterface {
        author: string
    }
    class Article<T> {
        private data: T[] = []
        public add(args: T): void {
            this.data.push(args)
        }
        public getData():T[] {
            return this.data
        }
    }


    let article = new Article<ArticleInterface<boolean,CommentsInterface>>()
    article.add({
        title: '中国式现代化',
        isLock: true,
        comments: [{author: '后盾人'}]
    })


    article.add({
        title: '接口中使用多个泛型',
        isLock: true,
        comments: [{author: '湘军大叔'}]
    })


    article.add({
        title: 'generics在类中的使用',
        isLock: true,
        comments: [{author: '九辞'}]
    })
    
    console.log(article.getData())
```
