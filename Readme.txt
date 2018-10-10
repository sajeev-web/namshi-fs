Html:

1. Used the latest bootstrap 4 flexbox layout
2. Utilized the bootstrap 4 utility almost fully to reduce the customised classes

CSS:

1. Classes are written in .scss files ['res/scss' folder] which compiled into .css ['res/css' folder].
2. .css files are bundled into bundle.css and minified into bundle.min.css ['dist/css' folder]. ["bundle.min.css" is not used for interviewer inspect purpose, instead "bundle.css"]
3. Two custom animations used for login click user experience ['res/scss/animation.scss' folder].
4. 


JS:

1. Written in main.js ['res/js' folder] which is minified into bundle.min.js 
2. .css files are bundled into bundle.js and minified into bundle.min.js ["bundle.min.js" is not used for interviewer inspect purpose, instead "bundle.js"]

Used axios.js for async call

Package Manager:
npm

Task Runner:
gulp

commands:
npm install
"gulp" to bundle
"gulp release" to bundle with minified version

Live server to dynamic refresh browser
npm install -g live-server


Note: 
Slider images are duplicated b'coz ombdapi returns only 1 poster image
