@echo off
echo ========================================================
echo   Starting Aura Artisan Cafe & Roastery (PHP Server)
echo ========================================================
echo.

set PHP_EXE=C:\xampp\php\php.exe

if not exist "%PHP_EXE%" (
    set PHP_EXE=php
)

echo Using PHP: %PHP_EXE%
echo Opening browser at http://localhost:8000
echo Press Ctrl+C in this window to stop the server anytime.
echo.

start http://localhost:8000
"%PHP_EXE%" -S localhost:8000
pause
