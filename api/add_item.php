<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['category'],$_POST['description'],$_POST['image'],$_POST['ingredients'],$_POST['name'],$_POST['price'],$_POST['token'],$_POST['uid'],$_POST['store'])){
        $res = [ "res"=>"failed"];

        require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');

        $uid = (int) $_POST['uid'];

        $token = filter_var($_POST['token'], FILTER_SANITIZE_STRING);
        $token = mysqli_real_escape_string($con, $token);

        $sql = "SELECT a.id FROM user_sessions a LEFT JOIN users b ON b.id=a.userid WHERE b.user_level='ADMIN' AND a.userid='$uid' AND a.token='$token' AND a.exp_date >= CURDATE() LIMIT 1";
        $query = mysqli_query($con,$sql);
        if(mysqli_num_rows($query)){

            $store = (int) $_POST['store'];

            $category = filter_var($_POST['category'], FILTER_SANITIZE_STRING);
            $category = mysqli_real_escape_string($con, $category);
    
            $description = filter_var($_POST['description'], FILTER_SANITIZE_STRING);
            $description = mysqli_real_escape_string($con, $description);
            
            $image = filter_var($_POST['image'], FILTER_SANITIZE_STRING);
            $image = mysqli_real_escape_string($con, $image);
    
            $ingredients = filter_var($_POST['ingredients'], FILTER_SANITIZE_STRING);
            $ingredients = mysqli_real_escape_string($con, $ingredients);
    
            $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
            $name = mysqli_real_escape_string($con, $name);
            
            $price = (int) $_POST['price'];
    
    
            $sql = "INSERT INTO items (store, item_name,item_desc,img,price,category,ingredients) VALUES ('$store','$name','$description','$image','$price','$category','$ingredients')";
            $query = mysqli_query($con, $sql);
            if(!$query){
                array_push($res,[
                    "text"=>"Internal error, try again later."
                ]);
            }else{
                $res = [ "res"=>"succeeded"];
            }
        }
        echo json_encode($res);
    }
?>