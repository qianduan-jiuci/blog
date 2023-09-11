# refusing-to-merge-unrelated-histories

如果 git merge 合并的时候出现 refusing to merge unrelated histories 的错误，原因是两个仓库不同而导致的，需要在后面加上`--allow-unrelated-histories`进行允许合并，即可解决问题
```bash
git pull origin master –allow-unrelated-histories
```
如果还不能解决问题，就把本地的remote删除，重新git remote add添加远程仓库，再按上面的方法来，问题解决。