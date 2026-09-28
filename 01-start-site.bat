@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

title HURI 网站启动工具
echo ========================================
echo   HURI 人机共生校园项目网站
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 当前电脑没有安装 Node.js。
  echo 请访问 https://nodejs.org/ 安装长期支持版后重试。
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [错误] 没有找到 npm，请重新安装 Node.js 长期支持版。
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo [1/3] 首次运行，正在安装网站依赖，请保持网络连接...
  call npm install
  if errorlevel 1 (
    echo.
    echo [错误] 依赖安装失败，请检查网络后重新运行本文件。
    pause
    exit /b 1
  )
) else (
  echo [1/3] 网站依赖已经安装。
)

powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:5173/' -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } }; exit 1" >nul 2>nul
if not errorlevel 1 goto open_site

echo [2/3] 正在启动本地网站服务器...
start "HURI Website Server" cmd /k "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

echo [3/3] 正在等待网站准备完成...
for /L %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:5173/' -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } }; exit 1" >nul 2>nul
  if not errorlevel 1 goto open_site
  timeout /t 1 /nobreak >nul
)

echo.
echo [错误] 网站服务器在30秒内没有成功启动。
echo 请查看 HURI Website Server 窗口中的错误信息。
pause
exit /b 1

:open_site
echo 网站已经启动，正在打开浏览器...
start "" "http://127.0.0.1:5173/"
echo.
echo 如果浏览器没有自动打开，请访问：
echo http://127.0.0.1:5173/
timeout /t 3 /nobreak >nul
exit /b 0
