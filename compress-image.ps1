# Windows용 썸네일 압축 스크립트 (node/sharp 없이 PowerShell만으로 동작)
# 사용법:
#   .\compress-image.ps1 -In "C:\원본.png" -Out "public\images\슬러그.jpg"
# 기본값: 최대 너비 800px, JPEG 품질 75 → 보통 100KB 이하로 나옴
param(
  [Parameter(Mandatory = $true)][string]$In,
  [Parameter(Mandatory = $true)][string]$Out,
  [int]$MaxW = 800,
  [int]$Quality = 75
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile((Resolve-Path $In))
$ratio = [Math]::Min(1.0, $MaxW / $src.Width)
$w = [int]($src.Width * $ratio)
$h = [int]($src.Height * $ratio)

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::White)   # PNG 투명 영역은 흰색으로
$g.DrawImage($src, 0, 0, $w, $h)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

if ([System.IO.Path]::IsPathRooted($Out)) { $outPath = $Out }
else { $outPath = Join-Path (Get-Location).Path $Out }
$bmp.Save($outPath, $codec, $params)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()

$size = (Get-Item $outPath).Length
Write-Output ("{0} : {1}x{2}, {3} KB" -f $outPath, $w, $h, [Math]::Round($size / 1KB, 1))
