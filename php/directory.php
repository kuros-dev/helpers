<?php
$directory = isset($_GET['dir']) ? $_GET['dir'] : '.';; // Change this to the directory you want to read

function getDirectoryContents($dir) {
    $contents = scandir($dir);
    $result = [];

    foreach ($contents as $item) {
        if ($item != '.' && $item != '..') {
            $itemPath = $dir . DIRECTORY_SEPARATOR . $item;
            if (is_dir($itemPath)) {
                $result[$item] = getDirectoryContents($itemPath); // Recursively get subdirectory contents
            } else {
                $result[] = $item;
            }
        }
    }

    return $result;
}

$directoryContents = getDirectoryContents($directory);
echo json_encode($directoryContents);
?>