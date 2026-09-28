@echo off
setlocal
cd /d "%~dp0"

where code >nul 2>nul
if not errorlevel 1 (
  code .
  exit /b 0
)

chcp 65001 >nul
echo 没有检测到 Visual Studio Code。
echo 将改为打开项目文件夹。
start "" explorer.exe "%~dp0"
