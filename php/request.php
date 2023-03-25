<?php

require_once __DIR__ .'/headerClass.php';
$request = new CrudClass();
$request->headerrequest();
$request_method = strtolower($_SERVER['REQUEST_METHOD']);
$request_path = strtolower($_SERVER['PATH_INFO']);
//echo $request_path;
//echo "<pre>";print_r($_SERVER['PATH_INFO']);
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
	//echo "deleted";
	 $object = file_get_contents("php://input");
	 $message = $request->deleteCsv($object);
	 $message 	= $request->listcCsv();
	 echo $message;
}	

?>
