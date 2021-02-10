<?php
namespace App\Traits;
use Session;
use Stripe;
trait PaymentTrait {
public function createCustomer($userEmail,$cardToken) {
		 $customer = \Stripe\Customer::create(array(
	        'email' => $userEmail,
	        "source" => $cardToken
	    )); 
		  if(!empty($customer)){         
            return $customer;
		}else{
				return response()->json([
            		'status' =>false,
            		'message'=> 'Invalid card token',
            	]);
		}
	}


public function createCharge($customerId, $amount, $name) {
	 $charge = \Stripe\Charge::create([
 				'amount'      =>  $amount*100,
 				'currency'    => 'usd',
 				'source'    => $customerId,
 				'description' => 'test charge'
			]);
		return $charge;
	}
}