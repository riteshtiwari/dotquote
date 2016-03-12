
var all_quotes = [];
var current = 0;
var _t_quote = null;
var _t_detail = null;
var quotes_db = null;
var ready=false;
function init_ui(){
    if(ready) return;
    $('#overlay').hide();
    $("#quote_book").turn({
      width: 700,
      height: 500,
      autoCenter: false
    });
    add_cover_page();
    // remove placeholder colver as turn.js doesn't allow to create empty book
    $("#quote_book").turn("removePage", 1);
    add_back_cover();
    $("#quote_book").fadeIn(1000);
    ready=true;
}

function add_cover_page(){
    // add cover page
    var element = $("<div />", {"class": "hard page"}).html("<p class='quote title'>The Book of Quotes<br>- Baba Dot</p>");
    $("#quote_book").turn("addPage", element);
}

function add_back_cover(){
  // add back cover page
  var element = $("<div />", {"class": "hard page"}).html("<p class='quote title'>The End.</p>");
  $("#quote_book").turn("addPage", element);
}

function add_quote(quote){
  all_quotes.push(quote);
  // there is no wasy way to insert page in turn.js, and our pages are coming dynamically
  // so we initally insert front and backcover
  // as a new page comes remove backcover, add page and then add back_cover again
  $("#quote_book").turn("removePage", $("#quote_book").turn('pages'));
  var element = $("<div />", {"class": "page"}).html(_t_quote(quote));
  $("#quote_book").turn("addPage", element) ;
  quote['detail'] = "This is a great quote what can I say about it, it is awesome"
  var element = $("<div />", {"class": "page"}).html(_t_detail(quote));
  $("#quote_book").turn("addPage", element);
  add_back_cover()
}

function init(){
    $('#quote_book').hide();
    _t_quote = _.template("<div class='quote'><p class='hi'> <%= quote.hi %></p><p class='en'> <%= quote.en %></p> <p><small> - <%= author %></small></p></div>");
    _t_detail = _.template("<p class='quote'> <%= detail %></p>");
     quotes_db = new Firebase('https://glaring-torch-9946.firebaseio.com/quotes');
    quotes_db.on('child_added', function (quote_ref, prev_quote) {
        var quote = quote_ref.val()
        init_ui();
        add_quote(quote);
    });
}

