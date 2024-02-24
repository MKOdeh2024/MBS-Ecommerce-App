<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'],$_POST['password'])){

        $res = [ "res"=>"failed"];

        require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');

        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $email = mysqli_real_escape_string($con, $email);
        $password = $_POST['password'];

        $sql = "SELECT email,ver,password,id,fullName,img,user_level FROM users WHERE email='$email' LIMIT 1";
        $query = mysqli_query($con, $sql);
        if(!$query){
            array_push($res,[
                "text"=>"Internal error, try again later."
            ]);
        }else{
            if(!mysqli_num_rows($query)){
                array_push($res,[
                    "text"=>"Email not found."
                ]);
            }else{
                $result = mysqli_fetch_assoc($query);
                $hashed_password = $result['password'];
                if(!password_verify($password, $hashed_password)){
                    array_push($res,[
                        "text"=>"Wrong password."
                    ]);
                }else{
                    $id = $result['id'];
                    $fullName = $result['fullName'];
                    $img = $result['img'];
                    $role = $result['user_level'];
                    $email = $result['email'];
                    $ver = $result['ver'];
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
                        "ver"=>$ver
                    ];
                }
            }
        }
        echo json_encode($res);
    }
?>