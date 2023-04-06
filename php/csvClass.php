<?php

require_once __DIR__ .'/headerClass.php';
class csvClass implements Csv {
	
	use header;
	var $filepath; 
	
	/*--------constructor-------------*/
	function __construct()
	{
		$this->filepath = './csv/data.csv';
		$this->filetemppath = './csv/data_temp.csv';
	}
	
	/*--------Find total row count-------------*/
	public function fileread(){
		$count = 0;
		$fp   = $this->filecheck('r');
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
	
	/*--------All record read and get-------------*/
	public function listcCsv(){
		try {
			$fp   = $this->filecheck('r');
			$key  = fgetcsv($fp,"1024",",");
			$json = array();
				while ($row = fgetcsv($fp,"1024",",")) {
				$json[] = array_combine($key, $row);
			}
			fclose($fp);
			http_response_code(200);
			return json_encode($json);
		}
		catch (SomeException $ex){
			$rtn = array("No record found");
			http_response_code(500);
			return json_encode($rtn);
		}
	}
	
	/*--------New file creation-------------*/	
	public function addCsv($objectval){
		$count = $this->fileread();
		try {
			if(empty($objectval->name)){
				$name_error = "name is empty";
				http_response_code(200);
	            return json_encode($name_error);
			}else if(empty($objectval->state)){
				$state_error['error'] = "state is empty";
				http_response_code(200);
	            return json_encode($state_error);
			}else if(empty($objectval->zip)){
				$zip_error['error'] = "zip is empty";
				http_response_code(200);
	            return json_encode($zip_error);
			}else if(empty($objectval->amount)){
				$amount_error['error'] = "amount is empty";
				http_response_code(200);
	            return json_encode($amount_error);
			}else if(empty($objectval->qty)){
				$qty_error['error'] = "qty is empty";
				http_response_code(200);
	            return json_encode($qty_error);
			}else if(empty($objectval->item)){
				$item_error['error'] = "item is empty";
				http_response_code(200);
	            return json_encode($item_error);
			}else{
				$array = array($count,$objectval->name,$objectval->state,$objectval->zip,$objectval->amount,$objectval->qty,$objectval->item);
				$fp = $this->filecheck('a');
				fputcsv($fp, $array);
				fclose($fp); 
				$rtn = array("Record created Successfully");
				http_response_code(200);
				return json_encode($rtn);
			}
		}
		catch (SomeException $ex){
			$rtn = array("Could not create");
			http_response_code(500);
			return json_encode($rtn);
		}
	}
	
	/*-------------Form error handle ----------------*/
	public function formerror($err){
		http_response_code(200);
	    return json_encode($err);
	}
	
	/*--------check file exist-------------*/	
	public function checkCsv($object){
		try {
			$count = 0;
			$manage = json_decode($object, true);
			$table = fopen($this->filepath,'r');
			while (($data = fgetcsv($table, 1000)) !== FALSE){
				if($data[6] == $manage['params']){
					$count = 1;
				}
			}
			if($count > 0){
				$rtn = array("Already Exist");
				http_response_code(200);
				return json_encode($rtn);
			}
		}catch (SomeException $ex){
			$rtn = array("error");
			http_response_code(500);
			return json_encode($rtn);
		}
	}
	/*--------delete row value-------------*/	
	public function deleteCsv($object){
		$manage = json_decode($object, true);
		foreach ($manage['params'] as $value){
			$paramsvalue = json_encode($value);
			$stringtoobject = json_decode($paramsvalue);
			$this->deleteCsvMethod($stringtoobject->id);
		}
	}
	
	/*--------delete to csv file-------------*/	
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
			$this->tryCatch(500,$rtn);
		}
	}
	
	/*--------try catch message-------------*/	
	public function tryCatch($http,$rtn){
		http_response_code($http);
		return json_encode($rtn);
	}
	
	/*--------file exist check-------------*/	
	public function filecheck($param){
		if (!($fp = fopen($this->filepath, $param))) {
			die("Can't open file...");
		}
		return $fp;
	}
}
?>