<?php

require_once __DIR__ .'/csvClass.php';
$request = new csvClass();
$request->headerrequest();
$request_method = strtolower($_SERVER['REQUEST_METHOD']);

if(isset($_SERVER['PATH_INFO'])) {
	$request_path = strtolower($_SERVER['PATH_INFO']);
}else{
	$request_path = '/list';
}

if($request_path == '/list') {
	$message 	= $request->listcCsv();
	echo $message;
}
if($request_path == '/add') {
	$object = file_get_contents("php://input");
	$objectcontent = json_decode($object);
	$message = $request->addCsv($objectcontent);
	echo $message;
}

if($request_path == '/delete') {
	 $object = file_get_contents("php://input");
	 $message = $request->deleteCsv($object);
	 $message 	= $request->listcCsv();
	 echo $message;
}
if($request_path == '/checkitem'){
	$object = file_get_contents("php://input");
	$message = $request->checkCsv($object);
	echo $message;
}

?>
