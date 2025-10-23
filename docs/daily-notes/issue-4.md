# Git 修改历史 commits 中的用户名和邮箱

  :::tip 原文地址
  [Git 修改历史 commits 中的用户名和邮箱 | GitHub](https://github.com/wild2life/daily-notes/issues/4)
  :::
  
## 确认本地全局邮箱/用户名

```sh
git config (--global) user.name 
git config (--global) user.email 

```

## 批量修改历史记录中的信息
打开一个文本编辑器，粘贴下面代码。
然后把 OLD_EMAIL，CORRECT_NAME，CORRECT_EMAIL 改成自己的新旧邮箱用户名。

```sh
git filter-branch -f --env-filter '
OLD_EMAIL="原来的邮箱"
CORRECT_NAME="现在的名字"
CORRECT_EMAIL="现在的邮箱"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

回到 git bash 界面，复制粘贴上面的代码并按回车执行

> 如果上面的批量修改命令执行失败的话，执行一下这段命令：
```sh
git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch Rakefile' HEA
```

强制提交
`git push origin --force --all`

## Linux/Mac下可以写个脚本
根目录下创建`git-email.sh`

```sh
// 然后需要赋予执行权限：
chmod +x git-email.sh
// 执行一下这个 .sh 文件：
./git-email.sh
```
> 如果是在Windows环境下，在CMD窗口是无法直接执行 ./test.sh 的，
> 这时候可以通过 [GIT](https://www.git-scm.com/download/) 工具来运行
> 切到test.sh所在位置，在空白处，右键选择Git Bash Here，直接执行  ./test.sh 就行了