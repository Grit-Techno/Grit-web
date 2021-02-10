<?php

namespace App\Traits;
use App\User;
use Auth;
use Exception;
trait PushNotificationTraits {

   private function sendNotification($deviceToken, $title, $message) {
			// My device token here (without spaces):
			$deviceToken = $deviceToken;
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
			echo 'Connected to APNS' . PHP_EOL;

			// Create the payload body
			$body['aps'] = array(
			'alert' => array(
			    'title' => $title,
                'body' => $message,
			 ),
			'sound' => 'default',
			'badge'=>$bedgeCount,
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

   private function sendNotificationAndroid($deviceToken, $title, $message) {
   	try{
			// My device token here (without spaces):
			$deviceToken = $deviceToken;
        $url = "https://fcm.googleapis.com/fcm/send";
        $serverKey = 'AAAACLR421E:APA91bFOgq7g2fOmQRTfXpkIBtyK3uPysRcXnCS4yorJ5YGR95WoR96U5d5QBhpMIwvvOwxai2xG9Rx9xIHj5PrLEaDt5p-ui__u9gnPuM849X1xUtoAfBYNMM113EHfcW3OzbURm3Dw';

        $notification = array(
        	'title' =>$title , 
        	'body' => $message, 
			'badge'=>$bedgeCount,
        	'sound' => 'default',
        	);
        $arrayToSend = array('to' => $deviceToken, 'notification' => $notification,'priority'=>'high');
        $json = json_encode($arrayToSend);
        $headers   = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: key='. $serverKey;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //Send the request
        $response = curl_exec($ch);
        //Close request
        if ($response === FALSE) {
        die('FCM Send Error: ' . curl_error($ch));
        }
        curl_close($ch);
        return;
        }catch (\Exception $ex){
            return response()->json([
                'status' => false,
                'message' => $ex->getMessage(),
                'error_details' => 'on line : '.$ex->getLine().' on file : '.$ex->getFile(),
            ], 200);
        }
} 

}
