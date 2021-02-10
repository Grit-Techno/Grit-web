<?php
namespace App\Http\Controllers\API\user;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\PaymentTrait;
use Session;
use Stripe;
use Config;
class PaymentController extends Controller
{
	use PaymentTrait;
     public function makePayment(Request $request) {
     	\Stripe\Stripe::setApiKey('sk_test_rPCpenmNA8IqT5GPMaTuq3Jn');
		 // $customer = $this->createCustomer('test@yopmail.com', $request->card_token['id']);
            // if($customer){ 
           $charge =$this->createCharge($request->card_token['id'], $request->amount, $request->name);         
	 	   	if($charge['status'] == 'succeeded') {
                  return response()->json([
                    'status'     => true,
                    'message' => 'Payment successfull!',
                ], 200); 
	 	}
     // }
}
}
