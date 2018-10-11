// client-side js
// run by the browser each time your view template is loaded

var links = [
  "http://google.com",
  "http://twitter.com",
  "http://github.com",
  "http://wikipedia.org",
  "http://www.abc.net.au/"
];


var myLink = document.getElementById("myLink");

// Choose random link to start with
var linkNumber = Math.floor(Math.random() * links.length);

myLink.href = "#";


fetch('/api')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        links = data.urls;
        linkNumber = Math.floor(Math.random() * links.length);
        
        const myLink = document.getElementById("myLink")
        myLink.innerText = "Explore!";
        
        myLink.onclick = function() {
          linkNumber++;
          if (linkNumber >= links.length) linkNumber = 0;
          myLink.target = "_blank";
          myLink.href = links[linkNumber];

          // Hide next link after a short delay
          setTimeout(function() {
            myLink.href = "#";
          }, 10);
        };
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
