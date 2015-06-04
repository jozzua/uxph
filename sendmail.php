<?php
	$to = "phil@foolprooflabs.com,russ@foolprooflabs.com,alvinjosephvaldez@yahoo.com, vlainlawliet@gmail.com, rhys@foolprooflabs.com, "; /*Your Email*/
	//$to = "alvinjosephvaldez@yahoo.com, vlainlawliet@gmail.com, rhys@foolprooflabs.com, "; /*Your Email*/
	$subject = "Messsage from uxmnlevent.com"; /*Issue*/
	//$date = date ("l, F jS, Y"); 
	//$time = date ("h:i A");

	if(isset($_REQUEST['subscribe'])){

		$subject = "uxmnl.com subscriber"; /*Issue*/

		$Email=$_REQUEST['email'];

		$msg="
		Email: $_REQUEST[email]
		message: i want to subscribe
		";

		if ($Email=="") {
			echo "Please enter your email";
		}
		else{

			mail($to, $subject, $msg, "From: phil@foolprooflabs.com");
			echo "Thanks For Subscribing";
		}

	}else{

		$Email=$_REQUEST['email'];

		$msg="
		Name: $_REQUEST[name]
		Email: $_REQUEST[email]
		Organization: $_REQUEST[organization]

		message: i want to be a sponsor in uxmnl event
		";

		if ($Email=="" || $_REQUEST['name'] == "" || $_REQUEST['organization'] =="") {
			echo "error";
		}
		else if($Email !="" || $_REQUEST['name'] != "" || $_REQUEST['organization'] !=""){
			mail($to, $subject, $msg, "From: phil@foolprooflabs.com");
			echo "We are super thrilled to have you as our sponsor.
	              Our Message is on its way. In the mean time, you can like our facebook page. ";	
		}

	}	

?>
