<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ResponseTrait;
use App\Models\User;
use Validator;

class ForgotPasswordController extends Controller
{
    use ResponseTrait;
    public function process(Request $request)
    {
    	$validator = Validator::make($request->all(), [
                 'email' => 'required|email',
                'password' => 'required|confirmed'
            ]);
         if($validator->fails()) {
                 return $this->sendValidationMessage($validator);
            }
       	 return $this->getPasswordResetTableRow($request)->count()> 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email,'token' =>$request->resetToken]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json(['status'=> false, 'message' => 'Token or Email is incorrect'],200);
    }

    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update(['password'=>bcrypt($request->password)]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json([
        	'message'=>'Password Successfully Changed',
        	'status' =>true,
        	],200);
    }
}
