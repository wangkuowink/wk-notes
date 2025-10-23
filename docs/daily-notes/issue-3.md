# 使用 URLSearchParams 解析 URL 的查询字符串

  :::tip 原文地址
  [使用 URLSearchParams 解析 URL 的查询字符串 | GitHub](https://github.com/wild2life/daily-notes/issues/3)
  :::
  
`URLSearchParams` 接口定义了一些实用的方法来处理 `URL` 的查询字符串

## 语法和使用

```js
// const url = 'https://github.com/search?o=desc&q=URLSearchParams&s=stars&type=Repositories'
const url = 'o=desc&q=URLSearchParams&s=stars&type=Repositories'

// 实例化
const searchParams = new URLSearchParams(url)

// toString 返回搜索参数组成的字符串并进行编码
searchParams.toString() // o=desc&q=URLSearchParams&s=stars&type=Repositories

// 获取指定搜索参数的第一个值
searchParams.get('q') // "URLSearchParams"
searchParams.get('maomao') // null

// 获取指定搜索参数的所有值，返回是一个数组。
searchParams.getAll('type') // ["Repositories"]
searchParams.getAll('maomao') // []

// 判断是否存在指定的搜索参数
searchParams.has('q') // true
searchParams.has('maomao') // false

// 插入一个新搜索参数，添加相同 key 不会替换之前的
searchParams.append('year', '1996')
searchParams.append('year', '1996')
searchParams.toString() // "o=desc&q=URLSearchParams&s=stars&type=Repositories&year=1996&year=1996"

// 设置和搜索参数相关联的值，如果之前存在将会删除
searchParams.set('name', 'maomao')
searchParams.get('name') // "maomao"
searchParams.set('name', 'maomao1996')
searchParams.get('name') // "maomao1996"

// 删除指定名称的所有搜索参数
searchParams.delete('year')
searchParams.toString() // "o=desc&q=URLSearchParams&s=stars&type=Repositories"

// 将键/值对进行排序并返回 undefined 排序顺序是根据键的 Unicode
searchParams.set('a', '1')
searchParams.toString() // "o=desc&q=URLSearchParams&s=stars&type=Repositories&a=1"
searchParams.sort()
searchParams.toString() // "a=1&o=desc&q=URLSearchParams&s=stars&type=Repositories"

// 返回一个 iterator，遍历器允许遍历对象中包含的所有键
for (const key of searchParams.keys()) {
  console.log(key)
}

// 返回一个 iterator，遍历器允许遍历对象中包含的所有值
for (const value of searchParams.values()) {
  console.log(value)
}

// 返回一个 iterator，遍历器允许遍历对象中包含的所有值
for (const [key, value] of searchParams.entries()) {
  console.log(key, value)
}
```

### 冷知识

query 上的 `""` key

```js
const searchParams = new URLSearchParams('?=maomao')
searchParams.get('') // "maomao"
```

[MDN 详细介绍点这里](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

## 相关 polyfill

- [core-js](https://github.com/zloirock/core-js)

`core-js@2.x` 未包含 `URLSearchParams`

- [url-search-params-polyfill](https://github.com/jerrybendy/url-search-params-polyfill)