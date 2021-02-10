<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Auth;
use App\Models\User;
use App\Models\Skill;
use App\Traits\ResponseTrait;
use App\Traits\ExceptionTrait;
use App\Traits\UsersTrait;
class ProfileController extends Controller
{
   use UsersTrait,ExceptionTrait, ResponseTrait;

  public function updateProfile(Request $request) {
    try{
     // $validator = Validator::make($request->all(), [
     //         '*'          => 'bail',
     //        'first_name'=> 'required|string',
     //        'last_name' => 'required|string',
     //    ]);
     //    if ($validator->fails()) {
     //         return $this->sendValidationMessage($validator);
     //        }
        if($request->study){
             Skill::where('user_id',Auth::user()->id)->delete();
        }
              $user = User::where('id', Auth::user()->id)->update([
              'first_name'=>$request->first_name,
              'last_name'=>$request->last_name,
              'country'=>$request->country,
              'state'=>$request->state,
              'program'=>$request->program,
              'country'=>$request->country,
              'living_expenses'=>$request->living_expenses,
             ]);
               if($user){
              foreach ($request->study as $key => $value) {
                Skill::create([
                  'user_id'=>Auth::user()->id,
                  'skill'=>$value['skill']
                ]);
              }
             }
             return $this->finalResponse(true, $user, 'Profile updated successfully!');
            }catch (\Exception $ex){
          return $this->returnException($ex);
        }
    }
 
  public function getProfile(Request $request) {
    try{
        $user = User::where('id', Auth::user()->id)->with('study')->first();
         return $this->finalResponse(true, $user, 'data found!');
        }catch (\Exception $ex){
      return $this->returnException($ex);
    }
    }

  public function checkProfile(Request $request) {
    try{
        if(Auth::user()->role == 'Learner' && Auth::user()->complete_profile == 1){
            return $this->finalResponse(true, '', '');
        }else{
            return $this->finalResponse(false, '', '');
        }
        }catch (\Exception $ex){
      return $this->returnException($ex);
    }
    }
}
