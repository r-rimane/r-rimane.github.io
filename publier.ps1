# Publie le site sur GitHub Pages :
#   - branche "main"   : le site exporte, servi tel quel ;
#   - branche "source" : le code, sans les notes internes.
param([string]$Message = "Mise a jour du site")

$ErrorActionPreference = "Stop"
$racine = $PSScriptRoot
$url = "https://github.com/r-rimane/r-rimane.github.io.git"
$identite = @("-c", "user.name=Rayan Rimane", "-c", "user.email=r-rimane@users.noreply.github.com", "-c", "core.autocrlf=false", "-c", "advice.detachedHead=false")
$notes = @("infos", "CLAUDE.md", "AGENTS.md", "SCENARIO.md")
$depot = Join-Path $env:TEMP ("publication-" + [guid]::NewGuid().ToString("N"))

function Invoke-Git {
    & git @identite -C $depot @args
    if ($LASTEXITCODE -ne 0) { throw "git $args a echoue" }
}

Push-Location $racine
& npm run build
if ($LASTEXITCODE -ne 0) { throw "Le build a echoue" }
Pop-Location

& git clone --quiet $url $depot
if ($LASTEXITCODE -ne 0) { throw "Clonage impossible" }

# Le site exporte, sur main
Invoke-Git checkout --quiet main
Invoke-Git rm -r --quiet .
Copy-Item (Join-Path $racine "out\*") $depot -Recurse -Force
Set-Content (Join-Path $depot "README.md") -Encoding utf8 -Value "# Portfolio de Rayan Rimane`n`nSite en ligne : https://r-rimane.github.io`n`nCette branche contient le site exporte. Le code est dans la branche [source](https://github.com/r-rimane/r-rimane.github.io/tree/source).`n"
Invoke-Git add -A -f
Invoke-Git commit --quiet --allow-empty -m $Message
Invoke-Git push --quiet origin main

# Le code, sur source
$existe = & git -C $depot ls-remote --heads origin source
if ($existe) { Invoke-Git checkout --quiet source } else { Invoke-Git checkout --quiet --orphan source }
Invoke-Git rm -r -f --quiet --ignore-unmatch .
$fichiers = & git -C $racine ls-files
foreach ($fichier in $fichiers) {
    if ($notes -contains ($fichier -split "/")[0]) { continue }
    $cible = Join-Path $depot $fichier
    New-Item -ItemType Directory -Force (Split-Path $cible) | Out-Null
    Copy-Item -LiteralPath (Join-Path $racine $fichier) $cible
}
Invoke-Git add -A
Invoke-Git commit --quiet --allow-empty -m $Message
Invoke-Git push --quiet origin source
Write-Output "Publie."
