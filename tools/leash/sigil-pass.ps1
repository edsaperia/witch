param([string]$OutDir)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$data = Get-Content -Raw -LiteralPath (Join-Path $OutDir 'masks.json') | ConvertFrom-Json
$bg = [Drawing.Color]::FromArgb(11,15,10)
$cols = @([Drawing.Color]::FromArgb(180,100,255),[Drawing.Color]::FromArgb(55,115,220),[Drawing.Color]::FromArgb(225,45,40))
$font = New-Object Drawing.Font('Consolas',10)
function Mask($g,$m,$x,$y,$z,$col) {
  $brush = New-Object Drawing.SolidBrush($col)
  for($j=0;$j -lt $m.h;$j++){for($i=0;$i -lt $m.w;$i++){if($m.m[$j*$m.w+$i]){$g.FillRectangle($brush,[int]($x+$i*$z),[int]($y+$j*$z),[int]$z,[int]$z)}}}
  $brush.Dispose()
}
foreach($sheet in $data.sheets) { foreach($z in @(1,4)) {
  $bmp = New-Object Drawing.Bitmap((175+920*$z),($sheet.cells.Count*110*$z+65))
  $g = [Drawing.Graphics]::FromImage($bmp); $g.Clear($bg)
  $g.DrawString('NOMINAL MASKS: baby16 youth18 adult20 legend27 pointer17 grid24 bold44 monoline44 (left to right)', $font,[Drawing.Brushes]::White,5,5)
  $g.DrawString('Each group: purple / friend / enemy. Lower marks crowned. Stack sizes vary with camera zoom.', $font,[Drawing.Brushes]::White,5,23)
  $r=0
  foreach($cell in $sheet.cells) {
    $y=60+$r*110*$z
    $g.DrawString($cell.id,$font,[Drawing.Brushes]::White,5,$y)
    $x=175
    foreach($m in $cell.row) {
      foreach($col in $cols) {
        Mask $g $m $x $y $z $col
        if($m.crown) {
          Mask $g $m $x ($y+($m.h+$m.crown.h+3)*$z) $z $col
          Mask $g $m.crown ($x+[Math]::Floor(($m.w-$m.crown.w)*$z/2)) ($y+($m.h+2)*$z) $z $col
        }
        $x+=($m.w+4)*$z
      }
      $x+=8
    }
    $r++
  }
  $bmp.Save((Join-Path $OutDir "$($sheet.name)-${z}x.png"),[Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose();$bmp.Dispose()
} }
$font.Dispose()
