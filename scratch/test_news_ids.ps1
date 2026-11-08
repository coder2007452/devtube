$candidates = @(
  # Hitesh Choudhary / Chai aur Code (News / Updates)
  "EH3vGeqeIAo", # Node backend
  "vz1RlUyrc3w", # React
  "t2ypwhb_4sA", # React 19
  "q0Pz8N0-a_w", # JavaScript news
  "3K7eQk0Y6Z0", # Fullstack roadmap
  "1Q8m-Lhj9lA", # Short: Fullstack advice
  "W1n7Wz0T-9U", # Short: JS tip
  "8L4x_P1Q9r0", # Chai AI
  "Z6D5v8B3u6Q", # Chai Web dev

  # Harkirat Singh / 100xdevs (News / Updates)
  "Tzjpwqjk86U", # 100x fullstack
  "KxG2kYt-2_c", # AI vs devs
  "o18oX1g5Vq8", # Short: Kirat
  "u91x_q8L30A", # Short: Kirat devops
  "7wnove7K-ZQ", # Next.js 14/15
  "b_uF9f48G9w", # System design

  # Piyush Garg (News / Updates)
  "F-s3h7z1Zvg", # Docker
  "8M2X8J1s0Qw", # Piyush Next.js
  "w29v_q4k9fA", # Piyush AI update

  # CodeWithHarry (News / Updates)
  "6mbwJ2t42gg", # Python / AI
  "tVzUXW6siu0", # Web Dev Sigma
  "8_x6p8K9y2A", # React 19 Harry

  # Fireship (The Code Report / Tech News / Shorts)
  "i_LwzRVP44U", # Fireship React 19
  "y3UH2gPbhDQ", # Fireship Next.js drama
  "v64KOxKVLVg", # Fireship AI
  "b1YpQ8KqfE4", # Fireship Bun
  "Yv_U9rL-p64", # Fireship Short
  "SqcY0GlETPk", # Fireship React in 100s
  "Cu2gmhnJ5y4", # Fireship JavaScript
  "DHjqpvDnNGE", # Fireship CSS

  # Theo - t3.gg (Web Dev News / Tech Updates)
  "d8p8m4h8J2A", # Theo Next.js
  "568x_1p9Qw0", # Theo React

  # Kevin Powell (CSS News)
  "3elGSZSWTbM", # CSS Subgrid
  "p0x_19k8wL2"  # CSS Anchor
)

foreach ($id in $candidates) {
  $url = "https://i.ytimg.com/vi/$id/hqdefault.jpg"
  try {
    $res = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 2
    if ($res.StatusCode -eq 200) {
      Write-Host "VALID: $id"
    } else {
      Write-Host "INVALID: $id -> $($res.StatusCode)"
    }
  } catch {
    Write-Host "FAIL: $id -> $($_.Exception.Message)"
  }
}
