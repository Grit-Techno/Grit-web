<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Mail\AccountConfirmation;
use Illuminate\Support\Str;
use App\Traits\ResponseTrait;
use App\Traits\ExceptionTrait;
use App\Traits\UsersTrait;
use App\Traits\PushNotificationTraits;
use App\Mail\AccountConfirmation;
use App\Models\User;
// use Mail;
use Auth;
use Validator;

class AuthController extends Controller
{
	use UsersTrait,ExceptionTrait, PushNotificationTraits, ResponseTrait;
     public function login(Request $request) {   
        try{
        $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' =>'required',
                'device_type'=> 'required',
                // 'device_token'=> 'required'
            ]);
         if($validator->fails()) {
                 return $this->sendValidationMessage($validator);
            }
            $checkStatus = $this->checkLoginDetails($request);
            if($checkStatus == false){
                     return $this->notMatch(); 
            }
                    // $user = Auth::user();
                    // $userIsActive = User::where('is_active',1)->find($user->id);
                 // if($userIsActive == null){
                 //     return $this->finalResponse(false, '', 'Before login you need to activate account!');
                 // }
                 else{
                    User::where('email',$request->email)->update([
                        'device_type'=>$request->device_type,
                        'device_token'=>$request->device_token?$request->device_token:''
                    ]); 
                    return $this->returnLoginResponse();
                    }
        }catch (\Exception $ex){
          return $this->returnException($ex);
        }
    }

    public function logout(Request $request) {
        try{
            User::where('id',Auth::user()->id)->update(['device_token' => '']);
            $request->user()->token()->revoke();
            return $this->finalResponse(true, '', 'Successfully logged out!');
        }catch (\Exception $ex){
                return $this->returnException($ex);
            } 
    }
}
