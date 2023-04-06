<?php

interface Csv {
	public function __construct();
	public function fileread();
	public function listcCsv();
	public function addCsv($objectval);
	public function deleteCsv($object);
	public function checkCsv($object);
}

trait header{
	public function headerrequest(){
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
	}
}




?>