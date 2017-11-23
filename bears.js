console.log('In order to be a bear, you must first think like a bear.');

//add way to dynamically add all the images regardless of number or ending?
// let filenames = [
//   "relax-1.png",
//   "relax-2.png",
//   "relax-3.png",
//   "relax-4.png",
//   "relax-5.png",
//   "relax-6.jpg",
//   "relax-7.jpg"
// ];

let filenames = ["relax-6.jpg","relax-7.jpg"];

for (let i = 0; i < 4; i++) {
  filenames.push("relax-" + i + ".png");
  console.log(filenames);
}

let imgs = document.getElementsByTagName('img');

for (let imgElt of imgs) {
  let r = Math.floor(Math.random() * filenames.length);
  let file = 'theden/' + filenames[r];
  let url = chrome.extension.getURL(file);
  imgElt.src = url;
  console.log(url);
}
