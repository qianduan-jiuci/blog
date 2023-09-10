import{_ as s,o as a,c as e,Q as p}from"./chunks/framework.7204edfa.js";const t="/blog/assets/1.bd791012.png",n="/blog/assets/2.729a72ce.png",l="/blog/assets/3.c16053b3.png",o="/blog/assets/4.39dd6bc3.png",i="/blog/assets/5.a012525d.png",c="/blog/assets/6.6aaa78b9.png",r="/blog/assets/7.fa51e3e4.png",g="/blog/assets/8.a0e90161.png",h="/blog/assets/9.dfb23965.png",d="/blog/assets/10.eb365e44.png",b="/blog/assets/11.f70863d0.png",u="/blog/assets/12.2d34ad8d.png",y="/blog/assets/13.36a709c3.png",E="/blog/assets/14.dacef65c.png",m="/blog/assets/15.59698046.png",v="/blog/assets/16.f0c90fcf.png",S=JSON.parse('{"title":"项目托管","description":"","frontmatter":{},"headers":[],"relativePath":"lessons/git/github托管项目.md","filePath":"lessons/git/github托管项目.md","lastUpdated":1694323098000}'),k={name:"lessons/git/github托管项目.md"},_=p('<h1 id="项目托管" tabindex="-1">项目托管 <a class="header-anchor" href="#项目托管" aria-label="Permalink to &quot;项目托管&quot;">​</a></h1><h2 id="国内外的项目托管平台介绍-以及在github中创建项目" tabindex="-1">国内外的项目托管平台介绍，以及在github中创建项目 <a class="header-anchor" href="#国内外的项目托管平台介绍-以及在github中创建项目" aria-label="Permalink to &quot;国内外的项目托管平台介绍，以及在github中创建项目&quot;">​</a></h2><p>github是世界上最大的项目托管平台，很多著名的项目都在github上托管，使用git进行管理 既然github这么厉害，为什么还要有国内托管平台，这就要说到github的缺陷 在github上托管开源项目是免费的，但是要是再github上托管私有项目或者特定人群能看的项目是要收费的 国内的项目托管平台对于私有项目确实免费的 对于功能上来说，国内外不是完全一样的，有些功能只能github上使用</p><h2 id="github上创建项目" tabindex="-1">github上创建项目 <a class="header-anchor" href="#github上创建项目" aria-label="Permalink to &quot;github上创建项目&quot;">​</a></h2><p>如果勾选相关的内容的话，github会帮咱们进行一次初始化的提交，如果没有勾选内容的话，github仓库就是空的，需要手动提交一次内容 <img src="'+t+'" alt="image.png"> 我们可以使用ssh或者https来建立与github的连接，建议使用ssh(不用输入账号和密码)，当然使用https，输入账号密码，也不费事</p><h2 id="使用ssh和github远程服务器进行无密码连接" tabindex="-1">使用ssh和github远程服务器进行无密码连接 <a class="header-anchor" href="#使用ssh和github远程服务器进行无密码连接" aria-label="Permalink to &quot;使用ssh和github远程服务器进行无密码连接&quot;">​</a></h2><p>需要生成一个ssh的密钥 如何判断是否生成密钥： 进入用户家目录,查看有没有.ssh目录，如果没有需要生成密钥 <img src="'+n+'" alt="image.png"> 生成密钥：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ssh</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keygen </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t rsa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ssh</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keygen </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t rsa</span></span></code></pre></div><p>一直按回车，直至结束</p><ol><li>进入.ssh/id_rsa文件，这是我们的公钥</li></ol><p><img src="'+l+'" alt="image.png"></p><ol start="2"><li>复制公钥到github -&gt; settings -&gt; SSH and GPG keys</li></ol><p><img src="'+o+'" alt="image.png"> 配置完是这样子 <img src="'+i+'" alt="image.png"> 这样我们就可以使用ssh密钥免密码连接 <img src="'+c+'" alt="image.png"> 将其克隆下来 git clone <img src="'+r+`" alt="image.png"> 常见问题描述： 有时候会发现，明明步骤一样，但就是连接不上，尤其是重新生成一个key的时候 可以进入到用户家目录，重新执行ssh-keygen.exe</p><h2 id="本地版本库主动使用remote与远程github进行连接" tabindex="-1">本地版本库主动使用remote与远程github进行连接 <a class="header-anchor" href="#本地版本库主动使用remote与远程github进行连接" aria-label="Permalink to &quot;本地版本库主动使用remote与远程github进行连接&quot;">​</a></h2><p>这种方式适合本地写好了一部分代码，可以主动的进行连接 上面我们所说的都是从github远程服务器克隆下来的，这时候github服务器扮演的是主角 本地如何与github进行连接</p><p>1.创建本地仓库，并进行初次提交</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git init </span></span>
<span class="line"><span style="color:#E1E4E8;">subl </span><span style="color:#79B8FF;">REMAD</span><span style="color:#E1E4E8;">.md</span></span>
<span class="line"><span style="color:#E1E4E8;">git commit </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">&#39;first commit&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git init </span></span>
<span class="line"><span style="color:#24292E;">subl </span><span style="color:#005CC5;">REMAD</span><span style="color:#24292E;">.md</span></span>
<span class="line"><span style="color:#24292E;">git commit </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#032F62;">&#39;first commit&#39;</span></span></code></pre></div><p>2.添加远程仓库</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git remote add origin git@github.com:leeMarcus26</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jiuci.git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git remote add origin git@github.com:leeMarcus26</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jiuci.git</span></span></code></pre></div><p><a href="mailto:git@github.com" target="_blank" rel="noreferrer">git@github.com</a>:leeMarcus26/jiuci.git: github上面的ssh 移除与远程仓库的连接</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git remote remove origin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git remote remove origin</span></span></code></pre></div><p>3.查看远程仓库</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git remote </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">v</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git remote </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">v</span></span></code></pre></div><p>4.推送数据到远程仓库的master分支</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git push </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u origin master</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git push </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u origin master</span></span></code></pre></div><p><img src="`+g+'" alt="image.png"></p><h2 id="本地分支与远程分支同步" tabindex="-1">本地分支与远程分支同步 <a class="header-anchor" href="#本地分支与远程分支同步" aria-label="Permalink to &quot;本地分支与远程分支同步&quot;">​</a></h2><p>当我们在本地新创建一个分支的时候，我们在这个分支上写了很多内容，当这一块的功能全部开发完毕的时候，使用git push 进行提交到远程，git push会将该分支的内容，提交到远程相对应的分支上，这时候，如果远程仓库没有当前的这个分支，会报错 <img src="'+h+`" alt="image.png"> 这时候已经给了我们提示信息</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git push </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">upsteam origin bbs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git push </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">upsteam origin bbs</span></span></code></pre></div><h2 id="新员工参与项目开发时分支使用" tabindex="-1">新员工参与项目开发时分支使用 <a class="header-anchor" href="#新员工参与项目开发时分支使用" aria-label="Permalink to &quot;新员工参与项目开发时分支使用&quot;">​</a></h2><p>新员工入职之后，老板安排新员工进入正在开发的小组中工作，这时候远程仓库中已经有了一些前辈们的代码，作为新员工，如何将我需要工作的分支检索到本地？ 第一步： 拷贝代码到本地</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git clone git@github.com:leeMarcus26</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lihaorun.git bbsSpace </span><span style="color:#6A737D;">// 克隆到bbsSpace目录</span></span>
<span class="line"><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">git clone git@github.com:leeMarcus26</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lihaorun.git  </span><span style="color:#6A737D;">//克隆到lihaorun目录</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git clone git@github.com:leeMarcus26</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lihaorun.git bbsSpace </span><span style="color:#6A737D;">// 克隆到bbsSpace目录</span></span>
<span class="line"><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">git clone git@github.com:leeMarcus26</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lihaorun.git  </span><span style="color:#6A737D;">//克隆到lihaorun目录</span></span></code></pre></div><p>第二步: 进入到仓库文件夹</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd bbsSpace</span></span>
<span class="line"><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">cd lihaorun</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd bbsSpace</span></span>
<span class="line"><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">cd lihaorun</span></span></code></pre></div><p>第三步： 查看本地分支(目前只有一个master分支)和远程仓库分支</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git branch </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">a</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git branch </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">a</span></span></code></pre></div><p>第四步： 拉取远程仓库的分支到我本地的分支</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git pull origin </span><span style="color:#B392F0;">bbs</span><span style="color:#E1E4E8;">:bbs</span></span>
<span class="line"><span style="color:#6A737D;">// 拉取远程的bbs分支到我本地的bbs分支</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git pull origin </span><span style="color:#6F42C1;">bbs</span><span style="color:#24292E;">:bbs</span></span>
<span class="line"><span style="color:#6A737D;">// 拉取远程的bbs分支到我本地的bbs分支</span></span></code></pre></div><p>第五步：修改玩代码之后，提交的时候发现，报错： 本地没有和远程建立联系</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git push </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">set</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">upstream origin bbs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git push </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">set</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">upstream origin bbs</span></span></code></pre></div><p>第六步： 正常提交代码</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git push</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git push</span></span></code></pre></div><h2 id="远程分支的合并" tabindex="-1">远程分支的合并 <a class="header-anchor" href="#远程分支的合并" aria-label="Permalink to &quot;远程分支的合并&quot;">​</a></h2><p>某个分支的功能已经完全开发完毕，我们需要将远程分支进行合并，然后将原来的分支删除 和本地分支的合并一样，只不过添加了一个push</p><h2 id="远程分支的删除" tabindex="-1">远程分支的删除 <a class="header-anchor" href="#远程分支的删除" aria-label="Permalink to &quot;远程分支的删除&quot;">​</a></h2><p>git push origin --delete bbs 删除远程分支的bbs <img src="`+d+'" alt="image.png"> 远程分支都没了，本地分支也需要删除： git branch -d bbs <img src="'+b+'" alt="image.png"></p><h2 id="自动部署之流程分析与创建web站点" tabindex="-1">自动部署之流程分析与创建web站点 <a class="header-anchor" href="#自动部署之流程分析与创建web站点" aria-label="Permalink to &quot;自动部署之流程分析与创建web站点&quot;">​</a></h2><p>流程： <img src="'+u+'" alt="image.png"> 目的： 部署网站的那个服务器叫做web服务器，我们希望web服务器能自动拉取github上的最新代码 思路： 我们在向GitHub上推送代码的时候会触发github的一个钩子，github就会触发web服务器的一个文件，这文件执行git pull 步骤： 第一步： GitHub： 进入到项目的setting中设置WebHooks <img src="'+y+'" alt="image.png"> 需要添加一个web服务器的地址在Payload URL上 创建站点： <img src="'+E+'" alt="image.png"> 如果在宝塔上创建的web站点，进入到www目录，进入wwwroot目录，里面的内容就是存放的站点 查看这点站点文件夹的详细信息可以发现，有两个隐藏文件，其中一个是.user.ini文件和.htaccess <img src="'+m+'" alt="image.png"> 我们需要把github的代码拉到这个站点，但是这个站点目前有内容，当我们克隆下来的时候，如果这个文件夹有内容，我们是克隆不下来的，这时候，我们可以把这个站点改一个名字</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mv hdxj.houdunren.com hdxj.houdunren.com666</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mv hdxj.houdunren.com hdxj.houdunren.com666</span></span></code></pre></div><p>这时候我们现在可以克隆下来,使用https克隆</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git clone </span><span style="color:#B392F0;">https</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//github.com/leeMarcus26/lihaorun.git hdxj.houdunren.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git clone </span><span style="color:#6F42C1;">https</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//github.com/leeMarcus26/lihaorun.git hdxj.houdunren.com</span></span></code></pre></div><p>注意： 克隆下来的文件名必须和站点名称一样才行，比如我现在创建的站点是hdxj.houdunren.com 克隆下来的代码也是hdxj.huodunren.com</p><h2 id="自动部署之github代码自动推送事件到web服务器部署完成" tabindex="-1">自动部署之github代码自动推送事件到WEB服务器部署完成 <a class="header-anchor" href="#自动部署之github代码自动推送事件到web服务器部署完成" aria-label="Permalink to &quot;自动部署之github代码自动推送事件到WEB服务器部署完成&quot;">​</a></h2><p>上面来说，我们的web服务器上已经有github远程仓库的代码了 ，现在有两件事需要做 第一： 添加web服务器地址，也就是当向github推送代码的时候触发的钩子，会请求web服务器的一个文件，这个文件的地址，要添加到钩子上 <img src="'+v+'" alt="image.png"> 这个webhook.php就是服务器上的一个文件，github钩子会请求这个文件，由这个文件进行git pull 第二： 编写这个文件</p>',54),x=[_];function C(f,A,D,F,q,w){return a(),e("div",null,x)}const j=s(k,[["render",C]]);export{S as __pageData,j as default};
