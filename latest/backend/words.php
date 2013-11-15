<?php 
    header("Access-Control-Allow-Origin: *");

    $type = $_GET["type"];
    $query = "";
    $results = array();
    $host = "wenbinus.ipagemysql.com"; 
    $user = "haha"; 
    $pass = "haha"; 
    $database = "wordsmap"; 

    $connection = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
    mysql_select_db($database, $connection) or die("Could not find database."); 

    if($type == "init")
        $query .= "select * from allwords"; 
    else if($type == "render")
        $query .= "select * from allwords where x > "
                  .$_GET["min_x"]." and x < ".$_GET["max_x"]." and y > ".$_GET["min_y"]." and y < ".$_GET["max_y"];

    $resultID = mysql_query($query, $connection) or die("Data not found."); 
    for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
        $row = mysql_fetch_assoc($resultID); 
        array_push($results, array($row['name'], $row['x'], $row['y']));
    }

    echo json_encode($results);

?>