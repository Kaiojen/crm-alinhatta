@echo off
chcp 65001 >nul
title CRM Alinhatta - Verificação do Sistema
color 0B

echo.
echo ================================================
echo   CRM ALINHATTA - Verificação do Sistema
echo ================================================
echo.

REM Verificar se Python está instalado
echo [1/3] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python não encontrado!
    echo.
    echo Por favor, instale o Python 3:
    echo https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
) else (
    python --version
    echo [OK] Python detectado
)

echo.
echo [2/3] Verificando arquivos necessários...

if not exist "index.html" (
    echo [ERRO] Arquivo index.html não encontrado!
    pause
    exit /b 1
) else (
    echo [OK] index.html encontrado
)

if not exist "alinhatta-crm.tsx" (
    echo [ERRO] Arquivo alinhatta-crm.tsx não encontrado!
    pause
    exit /b 1
) else (
    echo [OK] alinhatta-crm.tsx encontrado
)

if not exist "server.py" (
    echo [ERRO] Arquivo server.py não encontrado!
    pause
    exit /b 1
) else (
    echo [OK] server.py encontrado
)

echo.
echo [3/3] Verificando porta 8000...
netstat -an | find "8000" >nul 2>&1
if errorlevel 1 (
    echo [OK] Porta 8000 disponível
) else (
    echo [AVISO] Porta 8000 já está em uso!
    echo         Você pode precisar fechar outro servidor.
)

echo.
echo ================================================
echo   ✓ Sistema verificado com sucesso!
echo ================================================
echo.
echo Próximos passos:
echo 1. Execute START_SERVER.bat para iniciar o servidor
echo 2. Acesse http://localhost:8000 no navegador
echo.
pause

