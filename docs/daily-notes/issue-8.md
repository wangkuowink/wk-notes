### 切换到开发分支

  :::tip 原文地址
  [Git 不保留Vben提交记录更新Vben模板 | GitHub](https://github.com/wild2life/daily-notes/issues/8)
  :::
  `git checkout feature`

### 更新vben
`git fetch vben`
`git remote add vben https://github.com/vbenjs/vue-vben-admin.git`

### 合并vben
`git merge --squash vben/main --allow-unrelated-histories`
>通常情况下，Git 会阻止合并完全没有共同祖先的两个分支，因为这样做可能会导致复杂的冲突或不一致的历史。
这时就可以使用 --allow-unrelated-histories 选项来强制进行合并。

### 保留 Vben 模板的其他文件
`git checkout --theirs .`
### 保留本地版本的文件
`git checkout --ours  apps/web-antd`
>如果想手动解决冲突`git reset apps/web-antd`
### 提交
```git add .
git commit -m "chore: update vben" --no-verify
git push origin feature
```

