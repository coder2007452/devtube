$content = Get-Content 'src/data/mockVideos.js' -Raw
$matches = [regex]::Matches($content, 'id:\s*"([a-zA-Z0-9_\-]{8,15})"')
$uniqueIds = $matches | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -notlike "chai-*" -and $_ -notlike "harkirat-*" -and $_ -notlike "codewithharry*" -and $_ -notlike "apna-*" -and $_ -notlike "sheryians*" -and $_ -notlike "akshay-*" -and $_ -notlike "love-*" -and $_ -notlike "krish-*" -and $_ -notlike "piyush-*" } | Select-Object -Unique

Write-Host "Found $($uniqueIds.Count) candidate YouTube video IDs"

$validIds = @()
foreach ($id in $uniqueIds) {
  $url = "https://i.ytimg.com/vi/$id/hqdefault.jpg"
  try {
    $res = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 2
    if ($res.StatusCode -eq 200) {
      $validIds += $id
    }
  } catch {
  }
}

Write-Host "Valid 200 OK YouTube IDs count: $($validIds.Count)"
$validIds | ForEach-Object { Write-Host $_ }
