<?php

namespace App\Http\Controllers\API\Invester;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Traits\ResponseTrait;
use App\Traits\ExceptionTrait;
use App\Traits\UsersTrait;
use Validator;
use Auth;
use App\Models\User;

class InvesterController extends Controller
{
   use UsersTrait,ExceptionTrait, ResponseTrait;
    public function signUp(Request $request) {
    try{
     $validator = Validator::make($request->all(), [
             '*'          => 'bail',
            'first_name'=> 'required|string',
            'last_name' => 'required|string',
            'email'     => 'required|string|email|unique:users',
            // 'password'  => 'required|string|min:8',
            'role'      => 'required',
            'device_type'=> 'required',
            // 'country'=> 'required',
            // 'state'=> 'required',
            // 'device_token'=> 'required'
        ]);
        if ($validator->fails()) {
             return $this->sendValidationMessage($validator);
            }
            // dd($request->all());
            $request['password'] = bcrypt('test@123');
            $request['activation_token'] =  str::random(60);
            $user = User::create($request->all());
            // Mail::to($request->email)->send(new AccountConfirmation($user));
            $userData = Auth::loginUsingId($user['id']);
             return $this->returnSignupResponse($userData);
            }catch (\Exception $ex){
          return $this->returnException($ex);
        }
    }
}
