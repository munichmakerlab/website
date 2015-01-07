<?php
header('Content-Type: text\javascript');
$json_https = "";
if (apc_exists("mumalab_json")) {
	$json_https = apc_fetch("mumalab_json");
} else {
	$json = file_get_contents('http://log.munichmakerlab.de/api/read/json');
	$json_https = preg_replace("#http:\\\/\\\/(\d+)\.media\.tumblr\.com#", "https://$1.media.tumblr.com",$json);
	apc_store("mumalab_json", $json_https, 300);
}
echo $json_https;
?>
