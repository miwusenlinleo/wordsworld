<?php 
    
    $host = "wenbinus.ipagemysql.com"; 
    $user = "haha"; 
    $pass = "haha"; 
    $database = "wordsmap"; 

    $file_handle = fopen("test.sql", "r");
    $connection = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
    mysql_set_charset('utf8', $connection);
    mysql_select_db($database, $connection) or die("Could not find database."); 

    $index = 1;
    while (!feof($file_handle)) {
        $query = fgets($file_handle);
        mysql_query($query, $connection);
    }

    fclose($file_handle);

?>