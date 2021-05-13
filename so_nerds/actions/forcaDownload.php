<?php
$filename = $_REQUEST['caminho'];

$file_extension = strtolower(substr(strrchr($filename,"."),1));

if( $filename == "" ) 
{
  echo "<html><title>Metaweb</title><body>ERROR: download file NOT SPECIFIED. USE force-download.php?file=filepath</body></html>";
  exit;
} elseif ( ! file_exists( $filename ) ) 
{
  echo "<html><title>Metaweb</title><body>ERROR: File not found. USE force-download.php?file=filepath</body></html>";
  exit;
};
switch( $file_extension )
{
  case "pdf": $ctype="application/pdf"; break;
  case "exe": $ctype="application/octet-stream"; break;
  case "zip": $ctype="application/zip"; break;
  case "doc": $ctype="application/msword"; break;
  case "xls": $ctype="application/vnd.ms-excel"; break;
  case "ppt": $ctype="application/vnd.ms-powerpoint"; break;
  case "gif": $ctype="image/gif"; break;
  case "png": $ctype="image/png"; break;
  case "jpeg":
  case "jpg": $ctype="image/jpg"; break;
  default: $ctype="application/force-download";
}
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false);
header("Content-Type: $ctype");
header("Content-Disposition: attachment; filename=\"".basename($filename)."\";" );
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($filename));
readfile("$filename");
exit();

?>