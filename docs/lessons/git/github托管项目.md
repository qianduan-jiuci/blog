# 项目托管
## 国内外的项目托管平台介绍，以及在github中创建项目
github是世界上最大的项目托管平台，很多著名的项目都在github上托管，使用git进行管理
既然github这么厉害，为什么还要有国内托管平台，这就要说到github的缺陷
在github上托管开源项目是免费的，但是要是再github上托管私有项目或者特定人群能看的项目是要收费的
国内的项目托管平台对于私有项目确实免费的
对于功能上来说，国内外不是完全一样的，有些功能只能github上使用

## github上创建项目
如果勾选相关的内容的话，github会帮咱们进行一次初始化的提交，如果没有勾选内容的话，github仓库就是空的，需要手动提交一次内容
![image.png](/public/git/托管项目/1.png)
我们可以使用ssh或者https来建立与github的连接，建议使用ssh(不用输入账号和密码)，当然使用https，输入账号密码，也不费事

## 使用ssh和github远程服务器进行无密码连接
需要生成一个ssh的密钥
如何判断是否生成密钥： 进入用户家目录,查看有没有.ssh目录，如果没有需要生成密钥
![image.png](/public/git/托管项目/2.png)
生成密钥： 
```tsx
ssh-keygen -t rsa
```
一直按回车，直至结束

1. 进入.ssh/id_rsa文件，这是我们的公钥

![image.png](/public/git/托管项目/3.png)

2. 复制公钥到github -> settings -> SSH and GPG keys 

![image.png](/public/git/托管项目/4.png)
配置完是这样子
![image.png](/public/git/托管项目/5.png)
这样我们就可以使用ssh密钥免密码连接
![image.png](/public/git/托管项目/6.png)
将其克隆下来 git clone
![image.png](/public/git/托管项目/7.png)
常见问题描述： 有时候会发现，明明步骤一样，但就是连接不上，尤其是重新生成一个key的时候
可以进入到用户家目录，重新执行ssh-keygen.exe

## 本地版本库主动使用remote与远程github进行连接
这种方式适合本地写好了一部分代码，可以主动的进行连接
上面我们所说的都是从github远程服务器克隆下来的，这时候github服务器扮演的是主角
本地如何与github进行连接

1.创建本地仓库，并进行初次提交
```tsx
git init 
subl REMAD.md
git commit -m 'first commit'
```
2.添加远程仓库
```tsx
git remote add origin git@github.com:leeMarcus26/jiuci.git
```
git@github.com:leeMarcus26/jiuci.git: github上面的ssh
移除与远程仓库的连接
```tsx
git remote remove origin
```
3.查看远程仓库
```tsx
git remote -v
```
4.推送数据到远程仓库的master分支
```tsx
git push -u origin master
```
![image.png](/public/git/托管项目/8.png)
## 本地分支与远程分支同步
当我们在本地新创建一个分支的时候，我们在这个分支上写了很多内容，当这一块的功能全部开发完毕的时候，使用git push 进行提交到远程，git push会将该分支的内容，提交到远程相对应的分支上，这时候，如果远程仓库没有当前的这个分支，会报错
![image.png](/public/git/托管项目/9.png)
这时候已经给了我们提示信息
```tsx
git push --set-upsteam origin bbs
```
## 新员工参与项目开发时分支使用
新员工入职之后，老板安排新员工进入正在开发的小组中工作，这时候远程仓库中已经有了一些前辈们的代码，作为新员工，如何将我需要工作的分支检索到本地？ 
第一步： 拷贝代码到本地
```tsx
git clone git@github.com:leeMarcus26/lihaorun.git bbsSpace // 克隆到bbsSpace目录
||
git clone git@github.com:leeMarcus26/lihaorun.git  //克隆到lihaorun目录
```
第二步: 进入到仓库文件夹
```tsx
cd bbsSpace
||
cd lihaorun
```
第三步： 查看本地分支(目前只有一个master分支)和远程仓库分支 
```tsx
git branch -a
```
第四步： 拉取远程仓库的分支到我本地的分支
```tsx
git pull origin bbs:bbs
// 拉取远程的bbs分支到我本地的bbs分支
```
第五步：修改玩代码之后，提交的时候发现，报错： 本地没有和远程建立联系
```tsx
git push --set-upstream origin bbs
```
第六步： 正常提交代码
```tsx
git push
```
## 远程分支的合并
某个分支的功能已经完全开发完毕，我们需要将远程分支进行合并，然后将原来的分支删除
和本地分支的合并一样，只不过添加了一个push

## 远程分支的删除
git push origin  --delete bbs
删除远程分支的bbs
![image.png](/public/git/托管项目/10.png)
远程分支都没了，本地分支也需要删除： git branch -d bbs
![image.png](/public/git/托管项目/11.png)

## 自动部署之流程分析与创建web站点
流程： 
![image.png](/public/git/托管项目/12.png)
目的： 部署网站的那个服务器叫做web服务器，我们希望web服务器能自动拉取github上的最新代码
思路： 我们在向GitHub上推送代码的时候会触发github的一个钩子，github就会触发web服务器的一个文件，这文件执行git pull
步骤： 
第一步： 
GitHub： 进入到项目的setting中设置WebHooks 
![image.png](/public/git/托管项目/13.png)
需要添加一个web服务器的地址在Payload URL上
创建站点： 
![image.png](/public/git/托管项目/14.png)
如果在宝塔上创建的web站点，进入到www目录，进入wwwroot目录，里面的内容就是存放的站点
查看这点站点文件夹的详细信息可以发现，有两个隐藏文件，其中一个是.user.ini文件和.htaccess
![image.png](/public/git/托管项目/15.png)
我们需要把github的代码拉到这个站点，但是这个站点目前有内容，当我们克隆下来的时候，如果这个文件夹有内容，我们是克隆不下来的，这时候，我们可以把这个站点改一个名字
```tsx
mv hdxj.houdunren.com hdxj.houdunren.com666
```
  这时候我们现在可以克隆下来,使用https克隆
```tsx
git clone https://github.com/leeMarcus26/lihaorun.git hdxj.houdunren.com
```
注意： 克隆下来的文件名必须和站点名称一样才行，比如我现在创建的站点是hdxj.houdunren.com 克隆下来的代码也是hdxj.huodunren.com
## 自动部署之github代码自动推送事件到WEB服务器部署完成
上面来说，我们的web服务器上已经有github远程仓库的代码了 ，现在有两件事需要做
第一： 添加web服务器地址，也就是当向github推送代码的时候触发的钩子，会请求web服务器的一个文件，这个文件的地址，要添加到钩子上
![image.png](/public/git/托管项目/16.png)
这个webhook.php就是服务器上的一个文件，github钩子会请求这个文件，由这个文件进行git pull
第二： 编写这个文件

