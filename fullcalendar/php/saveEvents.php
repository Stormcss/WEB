<?php
print_r('PHP saveEvents:');
print_r('The value of $_POST["json"] is :  ');
var_dump($_POST['json']);
$post_data = $_POST['json'];
    $filename ='../Events/Events.json';
    $handle = fopen($filename, "w");      
if (empty($post_data)) {  
    print_r('No data! Can not save result to JSON file!');
    //fwrite($handle, ' Hmm, I did NOT get any data from AJAX. myText is:  '. $post_data);  
}
if (!empty($post_data)) {
    //fwrite($handle, ' ... Recieved data from AJAX!   myText:   ');
    fwrite($handle, $post_data);
}
     fclose($handle);
?>