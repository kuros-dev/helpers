<?php
function substract(){
    $keys = array();
    $values = array();
    foreach ($_GET as $key => $value) {
        array_push($keys, $key);
        array_push($values, $value);
    }
    return [$keys, $values];
}

?>