<?php

trait header{
	public function headerrequest(){
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
	}
}

class CrudClass{
	use header;
	
	var $filepath; 
	
	function __construct()
	{
		$this->filepath = './csv/data.csv';
		$this->filetemppath = './csv/data_temp.csv';
	}
	
	public function fileread(){
		$count = 0;
		if (!($fp = fopen($this->filepath, 'r'))) {
			die("Can't open file...");
		}
   		// parse csv rows into array
		$json = array();
			while ($row = fgetcsv($fp,"1024",",")) {
			$count++;
		}
		fclose($fp);
		if($count > 0){
			$count = $count;
		}else{
			$count = 1;
		}
		return $count;
	}
	
	public function listcCsv(){	
		if (!($fp = fopen($this->filepath, 'r'))) {
			die("Can't open file...");
		}
    
		$key = fgetcsv($fp,"1024",",");
		// parse csv rows into array
		$json = array();
			while ($row = fgetcsv($fp,"1024",",")) {
			$json[] = array_combine($key, $row);
		}
		fclose($fp);
		return json_encode($json);
	}	
	
	public function addCsv($object){
		$count = $this->fileread();
		//echo $count;
		try {
			$array = array($count,$object->name,$object->state,$object->zip,$object->amount,$object->qty,$object->item);
			if (!($fp = fopen($this->filepath, 'a'))) {
			die("Can't open file...");
			}
			//$wit = fwrite($fp,$array);
			//fputcsv($fp,["\n"]);
			fputcsv($fp, $array);
			fclose($fp); 
			$rtn = array("Record created Successfully");
			http_response_code(200);
			return json_encode($rtn);
		}
		catch (SomeException $ex){
			$rtn = array("Could not create");
			http_response_code(500);
			return json_encode($rtn);
		}
		
	}
	public function deleteCsv($object){
		$manage = json_decode($object, true);
		foreach ($manage['params'] as $value){
			$paramsvalue = json_encode($value);
			$stringtoobject = json_decode($paramsvalue);
			$this->deleteCsvMethod($stringtoobject->id);
		}
	}
	public function deleteCsvMethod($id){
		try {
		$table = fopen($this->filepath,'r');
		$temp_table = fopen($this->filetemppath,'w');
		while (($data = fgetcsv($table, 1000)) !== FALSE){
			if($data[0] == $id){ 
				continue;
			}
			fputcsv($temp_table,$data);
		}
		fclose($table);
		fclose($temp_table);
		copy($this->filetemppath,$this->filepath);
		$rtn = array("Record deleted Successfully");
		http_response_code(200);
		return json_encode($rtn);
		}
		catch (SomeException $ex){
			$rtn = array("Could not delete");
			http_response_code(500);
			return json_encode($rtn);
		}
	}
}


?>