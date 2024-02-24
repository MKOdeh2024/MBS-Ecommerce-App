<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    require($_SERVER['DOCUMENT_ROOT'] .'/vendor/autoload.php');   
    
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['concode'],$_POST['uid'])){

        $res = [ "res"=>"failed"];

        require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');

        $concode = (int) $_POST['concode'];
        $uid = (int) $_POST['uid'];

        $sql = "SELECT id FROM mail_triggers WHERE userid='$uid' AND t_date=CURDATE() LIMIT 5";
        $query = mysqli_query($con,$sql);
        if(mysqli_num_rows($query)>4){
            $res = [ "res"=>"failed",
                "text"=>"You trying too much, come back tomorrow"
            ];
        }else{
            $sql = "SELECT email,fullName FROM users WHERE id='$uid' LIMIT 1";
            $query = mysqli_query($con,$sql);
            $result = mysqli_fetch_assoc($query);
            $email = $result['email'];
            $fullName = $result['fullName'];
            $sql = "SELECT id FROM ver WHERE token='$concode' AND userid='$uid' AND exp_date>=CURDATE() LIMIT 1";
            $query = mysqli_query($con, $sql);
            if(!mysqli_num_rows($query)){
                $res = [ "res"=>"failed",
                    "text"=>"Wrong Code, we sent you another one."
                ];
                $sql = "DELETE FROM ver WHERE userid='$uid'";
                $query = mysqli_query($con,$sql);
                //Mail part starts here
                ///////////////////////
                $mail_pin = rand(111111,999999);
                $exp_datestr = strtotime('+15 minutes');
                $exp_date = date('Y-m-d H:i:s', $exp_datestr);
                $sql = "INSERT INTO ver (userid,token,exp_date) VALUES ('$uid','$mail_pin','$exp_date')";
                $query = mysqli_query($con, $sql);
                if($query){
                    try {
                        $mail = new PHPMailer();
                        $mail->isSMTP();
                        $mail->Host       = 'smtp.hostinger.com';
                        $mail->SMTPAuth   = true;
                        $mail->Username   = 'no-reply@openme.click';
                        $mail->Password   = 'vBIL7IPr&9g/*&Wv30G';
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                        $mail->Port       = 465;
                        $mail->CharSet = 'UTF-8';
                        $mail->Priority = 3;
                        $mail->setFrom('no-reply@openme.click', 'MBS');
                        $mail->addReplyTo('info@openme.click', 'MBS');
                        $mail->isHTML(true);
                        //===================================
                        $mail->addAddress($email, $fullName);
                        $mail->Subject = "MBS Email confirmation";
                        $mail->Body = '<html>
                            <body>
                                <h1>Welcome to MBS</h1>
                                <h2>Your verification code is:</h2>
                                <h3>'.$mail_pin.'</h3>
                            </body>
                        </html>';
                        $mail->AltBody = "
                                Welcome to MBS
                                Your verification code is:
                                ".$mail_pin."
                                ";
                        $mail->send();
                    } catch (Exception $e) {
                       //////Nothing yet///////////
                    }
                }
                ///////////////////////
                //Mail part ends here
            }else{
                $sql = "UPDATE users SET ver='1' WHERE id='$uid' LIMIT 1";
                $query = mysqli_query($con,$sql);
                $res = [ "res"=>"succeeded"];
                $sql = "DELETE FROM ver WHERE userid='$uid'";
                $query = mysqli_query($con,$sql);
            }
        }
        echo json_encode($res);
    }
?>