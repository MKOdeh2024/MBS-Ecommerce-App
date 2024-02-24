<?php
    // use PHPMailer\PHPMailer\PHPMailer;
    // use PHPMailer\PHPMailer\SMTP;
    // require($_SERVER['DOCUMENT_ROOT'] .'/vendor/autoload.php');   

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['fullName'],$_POST['email'],$_POST['password'],$_POST['image'],$_POST['address'],$_POST['mobile'])){

        $res = [ "res"=>"failed"];

        if(strlen($_POST['email']) < 5 || strlen($_POST['email']) > 85 || !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
            array_push($res,
            [
                "text"=>"Please enter a valid email address."
            ]
            );
        }else{
            if( strlen($_POST['password']) < 8 ){
                array_push($res,
                [
                    "text"=>"Your password is too short."
                ]
                );
            }else{
                if( strlen($_POST['fullName']) < 5 ){
                    array_push($res,
                    [
                        "text"=>"Your name is too short."
                    ]
                    );
                }else{
                    if(!filter_var($_POST['image'],FILTER_VALIDATE_URL)){
                        array_push($res,
                        [
                            "text"=>"Please enter a valid image url."
                        ]
                        );
                    }else{
                        if(strlen($_POST['address']) < 5){
                            array_push($res,
                            [
                                "text"=>"Address too short."
                            ]
                            );
                        }else{
                            if(preg_match('/[^0-9]/', $_POST['mobile']) || strlen($_POST['mobile']) > 10){
                                array_push($res,
                                [
                                    "text"=>"Invalid mobile number"
                                ]
                                );
                            }else{
                                require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');

                                $fullName = filter_var($_POST['fullName'], FILTER_SANITIZE_STRING);
                                $fullName = mysqli_real_escape_string($con, $fullName);
        
                                $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                                $email = mysqli_real_escape_string($con, $email);
                                
                                $password = $_POST['password'];
                                $password = password_hash($password, PASSWORD_DEFAULT);
        
                                $image = filter_var($_POST['image'], FILTER_SANITIZE_URL);
                                $image = mysqli_real_escape_string($con, $image);
        
                                $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
                                $address = mysqli_real_escape_string($con, $address);
        
                                $mobile = filter_var($_POST['mobile'], FILTER_SANITIZE_STRING);
                                $mobile = mysqli_real_escape_string($con, $mobile);
        
                                $sql = "SELECT id FROM users WHERE email='$email' LIMIT 1";
                                $query = mysqli_query($con, $sql);
                                if(!$query){
                                    array_push($res,
                                    [
                                        "text"=>"Internal error, try again later."
                                    ]
                                    );
                                }else{
                                    if(mysqli_num_rows($query)){
                                        array_push($res,
                                        [
                                            "text"=>"Email already used, try to login."
                                        ]
                                        );
                                    }else{
                                        $sql = "INSERT INTO users (email,password,fullName,img,address,mobile) VALUES ('$email','$password','$fullName','$image','$address','$mobile')";
                                        $query = mysqli_query($con, $sql);
                                        if(!$query){
                                            array_push($res,
                                            [
                                                "text"=>"Internal error, try again later."
                                            ]
                                            );
                                        }else{
                                            $id = mysqli_insert_id($con);
                                            $fullName = str_replace('\\','',$fullName);
                                            $img = str_replace('\\','',$image);
                                            $role = 'user';
                                            $email = str_replace('\\','',$email);
                                            $token = bin2hex(openssl_random_pseudo_bytes(16)).bin2hex(openssl_random_pseudo_bytes(16));
                                            $exp_datestr = strtotime('+1 months');
                                            $exp_date = date('Y-m-d H:i:s', $exp_datestr);
                                            $sql = "INSERT INTO user_sessions (userid, token, exp_date) VALUES('$id','$token','$exp_date')";
                                            $query = mysqli_query($con, $sql);
                                            $res = [ "res"=>"succeeded",
                                                "id"=>$id,
                                                "email"=>$email,
                                                "imageUrl"=>$img,
                                                "role"=>$role,
                                                "token"=>$token,
                                                "ver"=>"0"
                                            ];
                                            // //Mail part starts here
                                            // ///////////////////////
                                            // $mail_pin = rand(999999,000000);
                                            // $exp_datestr = strtotime('+15 minutes');
                                            // $exp_date = date('Y-m-d H:i:s', $exp_datestr);
                                            // $sql = "INSERT INTO ver (userid,email,token,exp_date) VALUES ('$id','$email','$mail_pin','$exp_date')";
                                            // $query = mysqli_query($con, $sql);
                                            // if($query){
                                            //     try {
                                            //         $mail = new PHPMailer();
                                            //         $mail->isSMTP();
                                            //         $mail->Host       = 'smtp.hostinger.com';
                                            //         $mail->SMTPAuth   = true;
                                            //         $mail->Username   = 'no-reply@openme.click';
                                            //         $mail->Password   = 'vBIL7IPr&9g/*&Wv30G';
                                            //         $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                                            //         $mail->Port       = 465;
                                            //         $mail->CharSet = 'UTF-8';
                                            //         $mail->Priority = 3;
                                            //         $mail->setFrom('no-reply@openme.click', 'Frying Nemo');
                                            //         $mail->addReplyTo('info@openme.click', 'Frying Nemo');
                                            //         $mail->isHTML(true);
                                            //         //===================================
                                            //         $mail->addAddress($email, $fullName);
                                            //         $mail->Subject = "Frying Nemo Email confirmation";
                                            //         $mail->Body = '<html>
                                            //             <body>
                                            //                 <h1>Welcome to Frying Nemo</h1>
                                            //                 <h2>Your verification code is:</h2>
                                            //                 <h3>'.$mail_pin.'</h3>
                                            //             </body>
                                            //         </html>';
                                            //         $mail->AltBody = "
                                            //                 Welcome to Frying Nemo
                                            //                 Your verification code is:
                                            //                 ".$mail_pin."
                                            //                 ";
                                            //         $mail->send();
                                            //     } catch (Exception $e) {
                                            //        //////Nothing yet///////////
                                            //     }
                                            // }
                                            // ///////////////////////
                                            // //Mail part ends here
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        echo json_encode($res);
    }
?>