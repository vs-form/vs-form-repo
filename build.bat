@ECHO OFF
CLS
set curpath=%cd%

cd %curpath%
call npm i

for %%f in (
            packages\vs-form
            packages\vs-form\docs
            packages\vs-general
            packages\vs-design
            apps\vs-app
            components\vs-lab
            components\vs-number-format
            components\vs-react-select
            components\vs-text-mask
            components\vs-ui-pickers) do (
  ECHO[
  ECHO %%f
  ECHO =======
  cd %curpath%\%%f
  call npm i
  call npm run link-packages
  call npm run compile
)

cd %curpath%\apps\vs-app
start call npm start

PAUSE