# Regenere le CV (PDF) et l'image de partage a partir des pages HTML de ce dossier.
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$public = Join-Path (Split-Path $PSScriptRoot) "public"
New-Item -ItemType Directory -Force $public | Out-Null
$profil = Join-Path $env:TEMP "chrome-cv"
$communs = @("--headless=new", "--disable-gpu", "--user-data-dir=$profil", "--virtual-time-budget=8000")

$pdf = Join-Path $public "CV_Rayan_Rimane_Developpeur.pdf"
Start-Process $chrome -Wait -ArgumentList ($communs + @("--no-pdf-header-footer", "--print-to-pdf=`"$pdf`"", "`"file:///$PSScriptRoot/cv.html`""))

$image = Join-Path $public "partage.png"
Start-Process $chrome -Wait -ArgumentList ($communs + @("--hide-scrollbars", "--window-size=1200,630", "--screenshot=`"$image`"", "`"file:///$PSScriptRoot/partage.html`""))

Get-Item $pdf, $image | Select-Object Name, Length
