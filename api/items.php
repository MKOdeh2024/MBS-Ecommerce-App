<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $res = [];

        require($_SERVER['DOCUMENT_ROOT'].'/config/db.inc.php');
        $comp = "";
        $pid = false;
        if(isset($_POST['id']) && is_numeric($_POST['id'])){
            $pid = (int) $_POST['id'];
            $comp = " WHERE id='$pid' LIMIT 1";
        }elseif(isset($_POST['store'])){
            $store = (int) $_POST['store'];
            $comp = " WHERE store='$store' ";
        }

        $sql = "SELECT * FROM items".$comp;
        $query = mysqli_query($con, $sql);
        if($query){
            while($row = mysqli_fetch_assoc($query)){
                $id = $row['id'];
                $name = $row['item_name'];
                $price = $row['price'];
                $description = $row['item_desc'];
                $category = $row['category'];
                $ingredients = $row['ingredients'];
                $ingredients = explode(',',$ingredients);
                $image = $row['img'];
                if($pid){
                    $res = [
                        "id"=>$id,
                        "name"=>$name,
                        "price"=>$price,
                        "description"=>$description,
                        "category"=>$category,
                        "ingredients"=>$ingredients,
                        "image"=>$image
                    ];
                }else{
                    array_push($res,
                    [
                        "id"=>$id,
                        "name"=>$name,
                        "price"=>$price,
                        "description"=>$description,
                        "category"=>$category,
                        "ingredients"=>$ingredients,
                        "image"=>$image
                    ]
                    );
                }
            }
        }
        echo json_encode($res);
    }
?>