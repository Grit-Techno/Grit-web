<?php

namespace App\Traits;
use App\User;
use App\ViewProfile;
use App\UniversityCoach;
use Auth;
trait UsersTrait {
	
    protected function checkLogindetails($request){
            $checkStatus = Auth::attempt([
                'email' => $request['email'], 
                'password' => $request['password']
               ]);
            return $checkStatus;
    } 

   private function someOneViewYourProfile($deviceToken, $userId) {
			// My device token here (without spaces):
			$deviceToken = $deviceToken;
			$title = 'Viewed profile';
			$message = 'Someone viewed your profile.';
			// My private key's passphrase here:
			$passphrase = '12345678';
			//badge
			$badge = 1;
			$path = base_path('config/iosCertificates/apns-dev.pem');
			$ctx = stream_context_create();
			stream_context_set_option($ctx, 'ssl', 'local_cert', $path);
			stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
			// stream_context_set_option( $ctx , 'ssl', 'verify_peer', true); 

			// Open a connection to the APNS server
			$fp = stream_socket_client(
			    'ssl://gateway.push.apple.com:2195', $err,
			    $errstr, 5, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);
			if (!$fp)
			exit("Failed to connect: $err $errstr" . PHP_EOL);
			// echo 'Connected to APNS' . PHP_EOL;

			// Create the payload body
			$body['aps'] = array(
			'alert' => array(
			    'title' => $title,
                'body' => $message,
			 ),
			'sound' => 'default',
			'count'=>$personCount,
		);
			// Encode the payload as JSON
			$payload = json_encode($body);
			// dd($payload);
			// Build the binary notification
			$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
			// Send it to the server
			// if(!empty($msg))
			$result = fwrite($fp, $msg, strlen($msg));
			if (!$result){
			    // echo 'Error, notification not sent' . PHP_EOL;
			    return $result;
			}
			else{
			    // echo 'notification sent!' . PHP_EOL;
			     return;
			} 
			// Close the connection to the server
			   fclose($fp);
			   } 
}
