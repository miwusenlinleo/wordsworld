<?php

	//Set enough memory for data array
	ini_set('memory_limit', '1024M');

	//array of 100004 words
	include 'words.php';

	$word = $_GET["word"];
	$index = array_search($word, $words);

	if($index == false)
		echo "-1";
	else
	{
		if($index < 20000) {
			include 'embeddings_1.php';
		}
		else if($index < 40000) {
			include 'embeddings_2.php';
			$index -= 20000;
		}
		else if($index < 60000) {
			include 'embeddings_3.php';
			$index -= 40000;
		}
		else if($index < 80000) {
			include 'embeddings_4.php';
			$index -= 60000;
		}
		else {
			include 'embeddings_5.php';
			$index -= 80000;
		}                    
			
		echo json_encode($embeddings[$index]);
	}
	     
	unset($embeddings);

?>