import{_ as e,h as r,o as a,a9 as t}from"./chunks/framework.DrXHgEgV.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"daily-notes/issue-11.md","filePath":"daily-notes/issue-11.md","lastUpdated":1761189984000}'),n={name:"daily-notes/issue-11.md"},o=t(`<h2 id="📘-vitepress-使用经验分享-多语言-部署实践" tabindex="-1">📘 VitePress 使用经验分享（多语言 &amp; 部署实践） <a class="header-anchor" href="#📘-vitepress-使用经验分享-多语言-部署实践" aria-label="Permalink to &quot;📘 VitePress 使用经验分享（多语言 &amp; 部署实践）&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/wangkuowink/daily-notes/issues/11" target="_blank" rel="noreferrer">📘 VitePress 使用经验分享（多语言 &amp; 部署实践） | GitHub</a></p></div><blockquote><p>适用于：文档站点 / 产品文档 / 内部知识库<br> 技术栈：VitePress + Nginx / Apache<br> 场景：多语言、cleanUrls、子路径部署、独立页面（隐私政策等）</p></blockquote><hr><h2 id="_1️⃣-核心配置" tabindex="-1">1️⃣ 核心配置 <a class="header-anchor" href="#_1️⃣-核心配置" aria-label="Permalink to &quot;1️⃣ 核心配置&quot;">​</a></h2><pre><code>import { defineConfig } from &#39;vitepress&#39;

const isProduction =
  process.argv.includes(&#39;build&#39;) ||
  process.env.NODE_ENV === &#39;production&#39;

export default defineConfig({
    locales: {
        root: {},
        en: {},
    },
    base: isProduction ? &#39;/your-project/&#39; : &#39;/&#39;,
    cleanUrls: true,
    markdown: {
        lineNumbers: true,
    },
})
</code></pre><hr><h2 id="_2️⃣-多语言配置-sidebar-隔离" tabindex="-1">2️⃣ 多语言配置（Sidebar 隔离） <a class="header-anchor" href="#_2️⃣-多语言配置-sidebar-隔离" aria-label="Permalink to &quot;2️⃣ 多语言配置（Sidebar 隔离）&quot;">​</a></h2><pre><code>export default defineConfig({
    locales: {
        root: {
            label: &#39;简体中文&#39;,
            lang: &#39;zh-CN&#39;,
            themeConfig: {
                sidebar: {
                    &#39;/guide/zh-CN/&#39;: [
                        {
                            text: &#39;使用指南&#39;,
                            items: [
                                { text: &#39;快速开始&#39;, link: &#39;/guide/zh-CN/getting-started&#39; },
                            ],
                        },
                    ],
                },
            },
        },
        en: {
            label: &#39;English&#39;,
            lang: &#39;en-US&#39;,
            link: &#39;/guide/en/&#39;,
            themeConfig: {
                sidebar: {
                    &#39;/guide/en/&#39;: [
                        {
                            text: &#39;User Guide&#39;,
                            items: [
                                { text: &#39;Getting Started&#39;, link: &#39;/guide/en/getting-started&#39; },
                            ],
                        },
                    ],
                },
            },
        },
    },
})
</code></pre><p>📁 推荐目录结构：</p><pre><code>docs/
├── guide/
│   ├── zh-CN/
│   └── en/
├── legal/          # 无侧边栏独立页面
│   ├── zh-CN/
│   └── en/
└── .vitepress/
</code></pre><hr><h2 id="_3️⃣-cleanurls-nginx-部署" tabindex="-1">3️⃣ cleanUrls + Nginx 部署 <a class="header-anchor" href="#_3️⃣-cleanurls-nginx-部署" aria-label="Permalink to &quot;3️⃣ cleanUrls + Nginx 部署&quot;">​</a></h2><h3 id="根路径部署" tabindex="-1">根路径部署 <a class="header-anchor" href="#根路径部署" aria-label="Permalink to &quot;根路径部署&quot;">​</a></h3><pre><code>location / {
    try_files $uri $uri.html $uri/ =404;
}
</code></pre><h3 id="子路径部署-base-your-project" tabindex="-1">子路径部署（base = /your-project/） <a class="header-anchor" href="#子路径部署-base-your-project" aria-label="Permalink to &quot;子路径部署（base = /your-project/）&quot;">​</a></h3><pre><code>location /your-project/ {
    alias /path/to/dist/;
    index index.html;
    try_files $uri $uri.html $uri/ /your-project/index.html;
}
</code></pre><p>⚠️ cleanUrls 必须配合 <code>try_files $uri.html</code></p><hr><h2 id="_4️⃣-https-生产必备" tabindex="-1">4️⃣ HTTPS（生产必备） <a class="header-anchor" href="#_4️⃣-https-生产必备" aria-label="Permalink to &quot;4️⃣ HTTPS（生产必备）&quot;">​</a></h2><pre><code>server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
}
</code></pre><hr><h2 id="_5️⃣-自定义主题-layout" tabindex="-1">5️⃣ 自定义主题 &amp; Layout <a class="header-anchor" href="#_5️⃣-自定义主题-layout" aria-label="Permalink to &quot;5️⃣ 自定义主题 &amp; Layout&quot;">​</a></h2><pre><code>import DefaultTheme from &#39;vitepress/theme&#39;
import Layout from &#39;./Layout.vue&#39;

export default {
    extends: DefaultTheme,
    Layout,
}
</code></pre><p>支持注入：</p><ul><li>sidebar-top</li><li>nav-bar-title-after</li><li>footer-before</li></ul><hr><h2 id="_6️⃣-独立页面-隐私政策-服务条款" tabindex="-1">6️⃣ 独立页面（隐私政策 / 服务条款） <a class="header-anchor" href="#_6️⃣-独立页面-隐私政策-服务条款" aria-label="Permalink to &quot;6️⃣ 独立页面（隐私政策 / 服务条款）&quot;">​</a></h2><h3 id="layout-判断逻辑" tabindex="-1">Layout 判断逻辑 <a class="header-anchor" href="#layout-判断逻辑" aria-label="Permalink to &quot;Layout 判断逻辑&quot;">​</a></h3><pre><code>const isStandalonePage = computed(() =&gt; {
    return (
        page.value.relativePath.startsWith(&#39;legal/&#39;) ||
        frontmatter.value.layout === &#39;standalone&#39;
    )
})
</code></pre><h3 id="frontmatter-用法" tabindex="-1">Frontmatter 用法 <a class="header-anchor" href="#frontmatter-用法" aria-label="Permalink to &quot;Frontmatter 用法&quot;">​</a></h3><pre><code>---
layout: standalone
---

# 隐私政策
</code></pre><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ul><li>iframe 嵌入第三方系统</li><li>外部直链（无导航 / 无侧边栏）</li><li>合规页面（Privacy / Terms）</li></ul><hr><h2 id="_7️⃣-markdown-编辑与转换工具" tabindex="-1">7️⃣ Markdown 编辑与转换工具 <a class="header-anchor" href="#_7️⃣-markdown-编辑与转换工具" aria-label="Permalink to &quot;7️⃣ Markdown 编辑与转换工具&quot;">​</a></h2><h3 id="在线编辑器" tabindex="-1">在线编辑器 <a class="header-anchor" href="#在线编辑器" aria-label="Permalink to &quot;在线编辑器&quot;">​</a></h3><ul><li><strong>NotepadOne Markdown Editor</strong> - 免费，实时预览<br><a href="https://notepadone.com/tools/markdown-editor" target="_blank" rel="noreferrer">https://notepadone.com/tools/markdown-editor</a></li><li><strong>Markdown Live Preview</strong> - 简洁，实时预览<br><a href="https://markdownlivepreview.com/" target="_blank" rel="noreferrer">https://markdownlivepreview.com/</a></li><li><strong>StackEdit</strong> - 功能强大，支持导出 PDF/HTML<br><a href="https://stackedit.io/app#" target="_blank" rel="noreferrer">https://stackedit.io/app#</a></li></ul><h3 id="飞书文档转-markdown" tabindex="-1">飞书文档转 Markdown <a class="header-anchor" href="#飞书文档转-markdown" aria-label="Permalink to &quot;飞书文档转 Markdown&quot;">​</a></h3><ul><li><strong>Cloud Document Converter</strong> - Chrome 扩展，可导出 Markdown<br><a href="https://chromewebstore.google.com/detail/cloud-document-converter/ehkomhhcinhikfddnmklbloahaakploh?hl=en" target="_blank" rel="noreferrer">https://chromewebstore.google.com/detail/cloud-document-converter/ehkomhhcinhikfddnmklbloahaakploh?hl=en</a></li><li><strong>Feishu Doc Exporter</strong> - Chrome 扩展，快速导出 Markdown<br><a href="https://chromewebstore.google.com/detail/feishu-doc-exporter/binjgfnbkdfeknemgcidljibfjkjmcjp" target="_blank" rel="noreferrer">https://chromewebstore.google.com/detail/feishu-doc-exporter/binjgfnbkdfeknemgcidljibfjkjmcjp</a></li></ul><hr><h2 id="_8️⃣-经验总结" tabindex="-1">8️⃣ 经验总结 <a class="header-anchor" href="#_8️⃣-经验总结" aria-label="Permalink to &quot;8️⃣ 经验总结&quot;">​</a></h2><ul><li>cleanUrls + 子路径部署 = <strong>必须配 Nginx try_files</strong></li><li>多语言 sidebar 一定要 <strong>按路径隔离</strong></li><li>独立页面建议走 <strong>Layout + frontmatter</strong></li><li>VitePress 非常适合： <ul><li>产品文档</li><li>内部知识库</li><li>合规页托管</li></ul></li></ul><hr><h2 id="🔗-references" tabindex="-1">🔗 References <a class="header-anchor" href="#🔗-references" aria-label="Permalink to &quot;🔗 References&quot;">​</a></h2><ul><li><a href="https://vitepress.dev/" target="_blank" rel="noreferrer">https://vitepress.dev/</a></li><li><a href="https://github.com/vuejs/vitepress" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress</a></li></ul>`,46),i=[o];function l(s,d,h,c,u,p){return a(),r("div",null,i)}const f=e(n,[["render",l]]);export{b as __pageData,f as default};
