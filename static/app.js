
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

function init_book(){

      $(".list nav").click(function(e) {
        $(this).parent().fadeOut();
      });



      var a = 0;
      $("#show-menu").click(function(e) {
        if(!a){
          $("nav").fadeIn();
          a = 1;
        }else{
          $("nav").fadeOut();
          a = 0;
        }
        //e.preventDefault();
      });



        var bookOptions = {
           height   : 500
          ,width    : 700
          // ,maxWidth : 800
          ,maxHeight : 500

          ,centeredWhenClosed : true
          ,hardcovers : true
          ,toolbar : "first, back, next, last"//, toc, zoomin, zoomout, slideshow, flipsound, fullscreen, thumbnails, download"
          ,thumbnailsPosition : 'left'
          ,responsiveHandleWidth : 50

          ,container: window
          ,containerPadding: "20px",
          pageNumbers : false
          // ,toolbarContainerPosition: "top" // default "bottom"

          // for pdf files, uncomment the tag script that loads the library "pdf.js".
          // Then uncomment the line below. The pdf and your webpage must be on the same domain
          // ,pdf: "url to pdf file"

          // Uncomment the option toc to create a Table of Contents
          // ,toc: [                    // table of contents in the format
          //  [ "Introduction", 2 ],  // [ "title", page number ]
          //  [ "First chapter", 5 ],
          //  [ "Go to codecanyon.net", "http://codecanyon.net" ] // or [ "title", "url" ]
          // ]
        };


      $('#book').wowBook( bookOptions ); // create the book

      $(".next").click(function(e) {
        var book = $.wowBook("#book");
        book.showPage(2);
      });


      $(".back-cover span").click(function(e) {
        var book = $.wowBook("#book");
        book.showPage(0);
      });


      $(".list ul li").click(function(e) {
        var book = $.wowBook("#book");
        book.showPage(parseInt($(this).attr('data-id')));
      });
      // How to use wowbook API
      // var book=$.wowBook("#book"); // get book object instance
      // book.gotoPage( 4 ); // call some method
      $("#home").click(function(e) {
        var book = $.wowBook("#book");
        book.showPage(0);
      });
}

function fill_book(data){
    console.log(data)
    _t_quote = _.template("<div class='page'><div class='inner-page'><p class='hi'><span class='anuhindi'>A</span> <%= hi %> <span class='anuhindi'>A</span></p><p class='en'> <%= en %></p> <p><small> - <%= author %></small></p></div>");
    _t_detail = _.template("<div class='page'><p class='inner-page'> <%= desc %></p></div>");

    var book = $.wowBook("#book");
    pages = []
    // add front cover
    pages.push("<div class='page'><p class='cover'></p></div>")
    // add quote pages
    for(var i=0;i<data['data'].length;i++){
      var quote = data['data'][i];
      pages.push(_t_quote(quote))
      pages.push(_t_detail(quote))
    }
    // add back cover
    pages.push("<div class='page'><p class='back-cover'></p></div>")
    book.insertPages(pages)
}

function init(){
    init_book();
    $.getJSON( "api/quotes")
     .done(function(data){
       fill_book(data);
     }).fail(function( jqxhr, textStatus, error ) {
       var err = textStatus + ", " + error;
       console.log( "Request Failed: " + err );
       alert(err)
     });
}
