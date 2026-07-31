param(
  [string]$RepoName = "MediFlow-AI-demo",
  [ValidateSet('public','private')][string]$Visibility = 'public'
)

function Abort($msg){ Write-Host $msg -ForegroundColor Red; exit 1 }

Write-Host "Preparing to publish repo: $RepoName (visibility=$Visibility)"

# Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Abort "Git is not installed. Install Git and re-run this script." }

# If gh (GitHub CLI) exists, use it (interactive auth if needed)
if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Found GitHub CLI (gh). Creating repository and pushing..."
  try {
    gh repo create $RepoName --$Visibility --source=. --remote=origin --push --confirm
    Write-Host "Repository created and pushed via gh. Visit: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)" -ForegroundColor Green
  } catch {
    Write-Host "gh failed: $_" -ForegroundColor Yellow
    Abort "Please ensure you're authenticated with 'gh auth login' or run the script again." 
  }
  exit 0
}

# If GITHUB_TOKEN is present, use GitHub API to create repo non-interactively
if ($env:GITHUB_TOKEN) {
  Write-Host "No gh detected but GITHUB_TOKEN found. Creating repo via GitHub API..."
  $headers = @{ Authorization = "token $env:GITHUB_TOKEN"; 'User-Agent' = 'publish-script' }
  $body = @{ name = $RepoName; private = ($Visibility -eq 'private') } | ConvertTo-Json

  $resp = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method Post -Headers $headers -Body $body -ErrorAction Stop
  $owner = $resp.owner.login
  $cloneUrl = $resp.clone_url

  Write-Host "Repository created: $($resp.html_url)"
  if (-not (Test-Path .git)) {
    git init
  }
  git add -A
  git commit -m "Initial commit" 2>$null
  git remote add origin $cloneUrl 2>$null
  git push -u origin main
  Write-Host "Pushed to $cloneUrl" -ForegroundColor Green
  exit 0
}

# Fallback: initialize git locally and show instructions
Write-Host "Neither 'gh' nor 'GITHUB_TOKEN' are available. Initializing local git and showing manual steps..." -ForegroundColor Yellow
if (-not (Test-Path .git)) { git init }
 git add -A
 git commit -m "Initial commit" 2>$null

Write-Host "Local repo initialized and committed." -ForegroundColor Green

Write-Host "Next steps (choose one):`n1) Install GitHub CLI (https://cli.github.com/) and run: gh auth login; then re-run this script.`n2) Create a repo on GitHub manually and run the commands below to push:`n" -ForegroundColor Cyan

Write-Host "   git remote add origin https://github.com/<your-username>/$RepoName.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White

Write-Host "After you push, your site will be available via GitHub Pages (see README.md)." -ForegroundColor Cyan
