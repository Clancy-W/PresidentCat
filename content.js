
walk(document.body);

function walk(node)
{
	var child;
	var next;

	switch (node.nodeType)
	{
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3:
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;
	
	// A dictionary of words we want replaced, and what we want them replaced by.
	var di = {
		"Donald Trump": "Kitty Cat",
		"DONALD TRUMP": "Kitty CAT",
		"Trump Campaign": "Kitty Crusade",
		"Trump campaign": "Kitty Crusade",
		"Donald J. Trump": "Kitty T. Cat",
		"Donald John Trump": "Kitty Tabby Cat",
		"realDonaldTrump": "realKittyCat",
		"donaldjtrump": 'kittytcat',
		"Trump": "Cat"

	};
	for (var key in di) {
		// check if the property/key is defined in the object itself, not in parent
		if (di.hasOwnProperty(key)) {
				v = v.replace(new RegExp(key, 'gi'), di[key]);
		}
	}

	textNode.nodeValue = v;
}

$( document ).ready(function() {
	// The images we want to replace Trump
	imgs = [
		"https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg",
		"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
		"https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634__340.png",
		"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg",
		"https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404__340.jpg",
		"https://cdn.pixabay.com/photo/2013/05/30/18/21/tabby-114782__340.jpg",
		"https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315__340.jpg",
		"https://cdn.pixabay.com/photo/2018/01/28/12/37/cat-3113513__340.jpg",
		"https://cdn.pixabay.com/photo/2017/04/30/18/33/cat-2273598__340.jpg",
		"https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332__340.jpg",
		"https://cdn.pixabay.com/photo/2017/12/09/21/33/sunset-3008779__340.jpg"
	]

	$( "img" ).each(function( index ) {
		var attr = $(this).attr("alt");
		if (typeof attr !== typeof undefined && attr !== false) {
			var attr = $(this).attr("src");
			if (typeof attr !== typeof undefined && attr !== false) {
				if ($(this).attr("alt").toLowerCase().includes("trump") || $(this).attr("src").toLowerCase().includes("trump") || $(this).attr("src") == "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_bigger.jpg") {
					$(this).attr("src", imgs[Math.floor(Math.random()*imgs.length)]);
					$(this).attr("style", "object-fit: cover;");
					var attr = $(this).attr('srcset');

					if (typeof attr !== typeof undefined && attr !== false) {
							$(this).attr("srcset", "")
					}

				}
			}
		}
	});
	$( "source" ).each(function( index ) {
		var attr = $(this).attr('srcset');

		if (typeof attr !== typeof undefined && attr !== false) {
				$(this).attr("srcset", "")
		}
	});
});
