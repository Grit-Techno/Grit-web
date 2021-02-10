<?php

namespace App\Traits;
use Exception;
use Auth;
trait ResponseTrait {

	protected function finalResponse($status, $data, $message){
		return response()->json([
                'status' => $status,
                'data'  => $data,
                'message' =>$message
            ],200);
	}

	protected function notMatch(){
            return response()->json([
                    'status'  => false,
                    'message' => 'Email or password not match!'
                ], 200);
     } 
     
	protected function sendValidationMessage($validator){
            foreach ($validator->messages()->getMessages() as $field_name => $messages){
                 return response()->json([
                    'status'  => false,
                    'message' => implode('<br />', $messages)
                ], 200); 
            }
    }

	 protected function returnStepFirstResponse($user){
	              return response()->json([
	                'status' => true,
	                'data'  => $user,
	                'message' =>'First step complete',
	                ],200); 
	}
    
	 protected function returnLoginResponse(){
        $user = Auth::user();
        $token = $user->createToken(env('Token'))->accessToken;
        $user['token'] = $token;
        if($user->role == 'Learner' && $user->complete_profile == 1) {
            $user['profile_complete'] = true;
        }else{
            $user['profile_complete'] = false;
        }
          return response()->json([
            'status' => true,
            'data'  => $user,
            'message' =>'Login Successfully!',
            ],200); 
	}

	protected function returnSignupResponse($userData){
            $token = $userData->createToken(env('Token'))->accessToken;
            $response['user_id'] = $userData['id'];
            $response['token'] = $token;
            $response['email'] = $userData['email'];
            $response['first_name'] = $userData['first_name'];
            $response['last_name'] = $userData['last_name'];
            $response['role'] = $userData['role'];
        return response()->json([
                'status'   => true,
                'data'  =>  $response,
                'message'  => 'Your account has been created successfully!'
            ], 200);
    }

}