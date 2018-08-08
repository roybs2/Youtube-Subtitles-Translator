var Translate = () => {
	var subtitles = document.getElementsByClassName("captions-text")[0];
	var sub = subtitles.firstElementChild;
	var text = sub.textContent;
	var textArray = text.split(" ");
	var newTextArray = [];
	for(var i = 0; i < textArray.length; i++)
	{
		//var url = "https://www.google.co.il/search?q=" + textArray[i];
		var a = document.createElement('a');
		var linkText = document.createTextNode(textArray[i] + " ");
		a.appendChild(linkText);
		a.addEventListener("click", function(){UserAction(this.text)}, false);
		newTextArray[i] = a;
	}
	var newText;
	sub.textContent = "";
	for(var i = 0; i < textArray.length; i++)
	{
		sub.appendChild(newTextArray[i]);
		sub.style.left = "50% ! important;";
	}
};

var UserAction = (word) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var response = JSON.parse(this.responseText);
	  alert(word + ":" + response.results[0].senses[0].definition);
    }
  };
  xhttp.open("GET", "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword="+word, true);
  xhttp.send();
};

var TranslateToItalian = (word) => {
  $.ajax({ 
   type: "GET",
   dataType: "jsonp",
   url: `https://glosbe.com/gapi/translate?from=eng&dest=ita&format=json&phrase=${word}&pretty=true`,	
   success: function(data){        
     console.log(data);
   }
});
	
};

chrome.runtime.sendMessage({todo: "showPageAction"});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.todo == "translate"){  
		Translate();
    }

});