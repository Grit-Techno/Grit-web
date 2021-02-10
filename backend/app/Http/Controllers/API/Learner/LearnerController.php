<?php

namespace App\Http\Controllers\API\Learner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Traits\ResponseTrait;
use App\Traits\ExceptionTrait;
use App\Traits\UsersTrait;
use Validator;
use Auth;
use App\Models\User;
use App\Models\Skill;

class LearnerController extends Controller
{
	use UsersTrait,ExceptionTrait, ResponseTrait;
    public function signUp(Request $request) {
    try{
     $validator = Validator::make($request->all(), [
             '*'          => 'bail',
            'first_name'=> 'required|string',
            'last_name' => 'required|string',
            'email'     => 'required|string|email|unique:users',
            'password'  => 'required|string|min:8',
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
            $request['password'] = bcrypt($request->password);
            $request['activation_token'] =  str::random(60);
            $user = User::create($request->all());
            // Mail::to($request->email)->send(new AccountConfirmation($user));
            $userData = Auth::loginUsingId($user['id']);
             return $this->returnSignupResponse($userData);
            }catch (\Exception $ex){
          return $this->returnException($ex);
        }
    }

    public function completeProfile(Request $request) {
    try{
     $validator = Validator::make($request->all(), [
             '*'          => 'bail',
            'country'=> 'required',
            'state'=> 'required',
            // 'device_token'=> 'required'
        ]);
        if ($validator->fails()) {
             return $this->sendValidationMessage($validator);
            }
             $user = User::where('id', Auth::user()->id)->update([
              'country'=>$request->country,
              'state'=>$request->state,
              'program'=>$request->program,
              'country'=>$request->country,
              'living_expenses'=>$request->living_expenses,
               'complete_profile'=> true
             ]);
             if($user){
              foreach ($request->study as $key => $value) {
                Skill::create([
                  'user_id'=>Auth::user()->id,
                  'skill'=>$value['item_text']
                ]);
              }
             }
             return $this->finalResponse(true, $user, 'Profile completed successfully!');
            }catch (\Exception $ex){
          return $this->returnException($ex);
        }
    }

    public function getHomeData() {
    try{
        $user = array('user' => Auth::user(), 
                      'invester_count'=> User::where('role','Invester')->count(),
                      'investers'=>User::where('role','Invester')->select('id','first_name','last_name')->get());
        return $this->finalResponse(true, $user, 'data found!');
        }catch (\Exception $ex){
      return $this->returnException($ex);
        }
    }
}
