<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'API\Admin\AdminController@login');
    Route::post('getemailbytoken', 'API\Admin\AdminController@getEmailByToken');
    Route::post('registeruniversity', 'API\Admin\AdminController@registerUniversity');
    Route::post('save_guest_cart', 'UserController@saveGuestCartDetails');
    Route::post('save_contact_form', 'UserController@saveContactFormDetails');

    Route::post('register_user', 'UserController@registerUser');
    Route::post('socialLoginGoogle','UserController@socialLoginWithGoogle');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'UserController@logout');
        Route::get('user', 'UserController@getUser');

    });
});

/**********************ADMIN ROUTES START*****************************/
Route::group(['namespace' => 'API\Admin',
			  'prefix' => 'admin','middleware' => ['auth:api']
			],function(){ 
                Route::post('get_users','UserManagementController@getUserData'); 
                Route::post('get_user_detail','UserManagementController@showUserDetail'); 
                Route::get('total_users','UserManagementController@totalUsers');
});
/**********************ADMIN ROUTES ENDS*******************************/

// without Auth
Route::group(['namespace' => 'App\Http\Controllers\API\User'],function(){ 
Route::post('login', 'AuthController@login');
Route::post('password/email', 'ForgotPasswordController@forgot');
Route::post('password/reset', 'ForgotPasswordController@reset');
Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
Route::post('resetPassword', 'ForgotPasswordController@process');
Route::post('makepayment', 'PaymentController@makePayment');
});


// WithAuth
Route::group(['namespace' => 'App\Http\Controllers\API\User', 'middleware' => ['auth:api']
            ],function(){ 
Route::post('updateprofile', 'ProfileController@updateProfile');
Route::get('getProfile', 'ProfileController@getProfile');
Route::get('checkProfile', 'ProfileController@checkProfile');
Route::post('updateProfile', 'ProfileController@updateProfile');
//getstate and country
Route::get('getCountries', 'CountryStateController@getCountryState');
// Route::post('getstatebycountryid', 'CountryStateController@getStateByCountryId');
});

/**********************Learner routes**********************/
Route::group(['namespace' => 'App\Http\Controllers\API\Learner'],function(){ 
Route::post('learner/signup', 'LearnerController@signUp');
});

Route::group(['namespace' => 'App\Http\Controllers\API\Learner', 'middleware' => ['auth:api']],function(){ 
Route::post('complete/profile', 'LearnerController@completeProfile');
Route::get('getlearnerhome', 'LearnerController@getHomeData');

});
/**********************Learner route ends**********************/

/**********************Invester Routes**********************/
Route::group(['namespace' => 'App\Http\Controllers\API\Invester'],function(){ 
Route::post('invester/signup', 'InvesterController@signUp');
});
/**********************Invester route ends**********************/


Route::get('terms_and_condition', 'API\User\TermsAndConditionController@getTermsAndCondition');
Route::get('users', 'API\User\TermsAndConditionController@website');


/**********************global route*******************************/
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('changepassword', 'API\User\ForgotPasswordController@changePassword');
    Route::get('logout', 'API\User\AuthController@logout');
    Route::post('viewprofile', 'API\User\ProfileController@viewProfile');
/**********************global route Ends*******************************/
});