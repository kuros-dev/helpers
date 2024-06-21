<?php
function randomizerInt($min, $max){
    return rand($min, $max);
}

function randomizerFloat($min, $max){
    return rand($min * 100000, $max * 100000) / 100000;
}

echo randomizerFloat(1, 1000);
echo "<br/>";
echo randomizerInt(5, 250);
?>