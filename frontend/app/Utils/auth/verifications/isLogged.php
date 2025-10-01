<?php

session_start();

if(!isset($_SESSION['dni'])){
    require '../../config/config.php';
	header("location: $loginURL");
}
?>