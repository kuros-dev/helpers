//                      origin:             first part of the fetch path
//                      PATH                path from the php document will be found
//                      TARGETPATH          the path you want to read
//                      ALTERNATIVEPATH     path to a secondary local file in case the php file isnt found

function fetchDirectoryListing(origin, path, targetpath, alternativefile) {
    const phpScriptUrl = origin + path + (targetpath ? '?dir=' + targetpath : ''); // Construct the URL to PHP script
    return fetch(phpScriptUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                try {
                    if (alternativefile) {
                        fetch(alternativefile)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to fetch JSON');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Handle your JSON data here
                                return data;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                }
                catch {
                    throw new Error('PHP and json script failed or not found');
                }
            }
        })
        .catch(error => {
            const jsonFileUrl = window.location.origin +"/"+ alternativefile; // Construct the URL to JSON file
            return fetch(jsonFileUrl)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('JSON file failed or not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching directory listing from JSON:', error);
                });
        });
}

// USAGE EXAMPLE
/*
fetchDirectoryListing()
    .then(data => {
        console.log(data); // Output the directory structure
    });
*/