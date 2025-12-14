@echo off
chcp 65001 >nul
title CRM Alinhatta - Servidor Local
color 0A

echo.
echo ================================================
echo   CRM ALINHATTA - Servidor Local
echo ================================================
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python não encontrado!
    echo.
    echo Por favor, instale o Python 3:
    echo https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo [OK] Python detectado
echo.
echo Iniciando servidor...
echo.
echo ================================================
echo.

python server.py

