<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\State;
use App\Models\Country;
use App\Traits\ResponseTrait;
use App\Traits\ExceptionTrait;
use App\Traits\UsersTrait;

class CountryStateController extends Controller
{
	use UsersTrait,ExceptionTrait, ResponseTrait;
    
    public function getCountryState() {
    	$country = Country::select('id','name')->with('states')->get();
    	  return $this->finalResponse(true, $country, 'data found!');
    }

    // public function getStateByCountryId(Request $request) {
    // 	$states = State::where('country_id',$request->id)->select('id','name')->get();
    // 	  return $this->finalResponse(true, $states, 'data found!');
    // }
}
