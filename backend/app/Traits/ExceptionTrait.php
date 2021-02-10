<?php
namespace App\Traits;
use Exception;
trait ExceptionTrait {


	protected function returnException($ex){
	    return response()->json([
	        'status' => false,
	        'message' => $ex->getMessage(),
	        'error_details' => 'on line : '.$ex->getLine().' on file : '.$ex->getFile(),
	    ], 200);	
	}

}