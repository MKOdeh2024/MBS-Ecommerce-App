<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['uid'],$_POST['token'],$_POST['items'])){
        $res = [ "res"=>"failed"];

        require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');

        $uid = (int) $_POST['uid'];

        $token = filter_var($_POST['token'], FILTER_SANITIZE_STRING);
        $token = mysqli_real_escape_string($con, $token);

        $sql = "SELECT a.id FROM user_sessions a LEFT JOIN users b ON b.id=a.userid WHERE a.userid='$uid' AND a.token='$token' AND a.exp_date >= CURDATE() LIMIT 1";
        $query = mysqli_query($con,$sql);
        if(mysqli_num_rows($query)){
            $items =  json_decode($_POST['items']);
            $sql = "INSERT INTO orders_num (uid) VALUES ('$uid')";
            $query = mysqli_query($con,$sql);
            if(!$query){
                array_push($res,[
                    "text"=>"Internal error, try again later."
                ]);
            }else{
                $oid = mysqli_insert_id($con);
                $comp = "";
                foreach ($items as $item) {
                    //var_dump($item);
                    $item = $item->meal;
                    // echo $item->id;
                    // //print_r($item);
                    // echo $item->quantity;
                    if($comp == ""){
                        $comp .= " ('$oid','$item->id','$item->quantity') ";
    
                    }else{
                        $comp .= " ,('$oid','$item->id','$item->quantity') ";
                    }
                }
                if($comp != ""){
                    $sql = "INSERT INTO orders (order_id,item_id,quantity) VALUES ".$comp;
                    $query = mysqli_query($con, $sql);
                    if(!$query){
                        array_push($res,[
                            "text"=>"Internal error, try again later."
                        ]);
                    }else{
                        $res = ["res"=>"succeeded"];
                    }
                }else{
                    $sql = "DELETE FROM orders_num WHERE id='$oid' LIMIT 1";
                    $query = mysqli_query($con, $sql);
                }
            }
        }
        echo json_encode($res);
    }
    // $x =  $_POST['items'];
    // foreach (json_decode($x) as $y) {
    //     echo $y->meal->name;
    // }
?>