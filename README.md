# HURI 人机共生校园项目网站

这是一个使用 React + Vite 制作的全英文人机共生主题网站，内容来自 Human-Centered Urban Robotics Initiative 项目资料。

## 一键启动网站

### 第一次使用前

电脑需要安装 Node.js 长期支持版：https://nodejs.org/

安装 Node.js 时保持默认选项即可。安装完成后，重新打开解压后的项目文件夹。

### 启动步骤

1. 将整个压缩包完整解压，不要直接在压缩包预览窗口中运行文件。
2. 双击 `01-start-site.bat`。
3. 第一次启动会自动安装网站依赖，通常需要几分钟，请保持网络连接。
4. 安装完成后会出现一个名为 `HURI Website Server` 的命令窗口。
5. 脚本确认网站启动成功后，会自动在默认浏览器打开 `http://localhost:5173/`。
6. 浏览网站期间请不要关闭服务器窗口。关闭该窗口后，本地网站会停止运行。

如果浏览器没有自动打开，可以手动访问：http://localhost:5173/

## 继续编辑网站

双击 `02-open-project.bat`：

- 已安装 Visual Studio Code：自动使用 VS Code 打开项目。
- 未安装 Visual Studio Code：自动打开项目文件夹。

主要文件：

- `src/App.jsx`：页面英文内容、导航、项目数据和交互逻辑。
- `src/styles.css`：布局、字体、颜色和响应式样式。
- `public/project-media/`：文档中提取的15张项目图片。
- `index.html`：网站标题和页面描述。

网站服务器运行时，保存代码后浏览器会自动刷新。

## 制作正式构建版本

在项目文件夹打开终端，依次运行：

```text
npm install
npm run build
```

构建完成的网站会生成在 `dist` 文件夹中。

## 运行要求

- Windows 10 或更高版本
- Node.js 长期支持版，安装时自带 npm
- 首次启动需要联网安装依赖
- 当前背景视频和在线字体在浏览时需要网络连接

## 常见问题

### 提示没有找到 Node.js 或 npm

前往 https://nodejs.org/ 安装长期支持版，安装后重新双击启动脚本。

### 依赖安装失败

检查网络连接，关闭脚本窗口，然后重新双击 `01-start-site.bat`。

### 5173端口已经被占用

关闭之前打开的 `HURI Website Server` 窗口，再重新运行启动脚本。

### 页面打开但背景视频没有显示

背景视频来自远程地址，请检查网络连接；其他文字和项目图片仍可正常显示。

