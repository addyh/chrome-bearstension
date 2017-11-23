console.log('background');
let banana;

// Listen for tab open/refresh, etc
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    // Get a DirectoryEntry object (for the extension package)
    chrome.runtime.getPackageDirectoryEntry(function(dirEntry) {

      // This is the root of that directory
      let root_Reader = dirEntry.createReader();
      root_Reader.readEntries(function(root_DirList) {

        // This is picking the image folder
        for (let dir of root_DirList) {
          if (dir.name == 'theden') {

            // This is getting the DirectoryEntry for the image folder
            let theden_Reader = dir.createReader();
            theden_Reader.readEntries(function(theden_DirList) {

              // This is looping through the bear image files
              let filenames = [];
              for (let file of theden_DirList) {
                if (file.isFile == true) {

                  // Make sure it's a valid file extension for an image
                  let fileName = file.name;
                  let fileExtension = fileName.match(/\.([a-zA-Z]+)$/)[1];
                  let goodExtensions = ['ANI','BMP','CAL','FAX','GIF',
                  'IMG','JBG','JPE','JPEG','JPG','MAC',
                  'PBM','PCD','PCX','PCT','PGM','PNG',
                  'PPM','PSD','RAS','TGA','TIFF','WMF'];

                  // Now, save the file name to the filenames array
                  if (goodExtensions.indexOf(fileExtension.toUpperCase()) >-1) {
                    filenames.push(fileName);
                  }
                }
              }

              // Send the filenames array to the content script
              chrome.tabs.sendMessage(tabId, filenames);

            });
          }
        }
      });
    });
  }
});
