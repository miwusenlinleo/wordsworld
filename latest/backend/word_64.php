<?php 
    header("Access-Control-Allow-Origin: *");

    $results = array();
    $host = "wenbinus.ipagemysql.com"; 
    $user = "haha"; 
    $pass = "haha"; 
    $database = "wordsmap"; 

    $connection = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
    mysql_select_db($database, $connection) or die("Could not find database."); 

    $query .= "select * from words_64 where name = \"".$_GET["name"]."\""; 

    $resultID = mysql_query($query, $connection) or die("Data not found."); 
    for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
        $row = mysql_fetch_assoc($resultID); 
        array_push($results, $row['name'], $row['d1'], $row['d2'], $row['d3'], $row['d4'], $row['d5'], $row['d6'], $row['d7'], $row['d8'], $row['d9'], $row['d10'], $row['d11'], $row['d12'], $row['d13'], $row['d14'], $row['d15'], $row['d16'], $row['d17'], $row['d18'], $row['d19'], $row['d20'], $row['d21'], $row['d22'], $row['d23'], $row['d24'], $row['d25'], $row['d26'], $row['d27'], $row['d28'], $row['d29'], $row['d30'], $row['d31'], $row['d32'], $row['d33'], $row['d34'], $row['d35'], $row['d36'], $row['d37'], $row['d38'], $row['d39'], $row['d40'], $row['d41'], $row['d42'], $row['d43'], $row['d44'], $row['d45'], $row['d46'], $row['d47'], $row['d48'], $row['d49'], $row['d50'], $row['d51'], $row['d52'], $row['d53'], $row['d54'], $row['d55'], $row['d56'], $row['d57'], $row['d58'], $row['d59'], $row['d60'], $row['d61'], $row['d62'], $row['d63'], $row['d64']);
    }

    echo json_encode($results);
?>