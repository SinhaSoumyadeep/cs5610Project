$(document).ready(function(){

    $(main)

    function main() {



        $('#searchBtn').click(searchFunction);


    }
    
    
    function searchFunction() {

        $("tbody").empty();

            var searchKey = $("#searchInput").val();


        $.get("https://www.googleapis.com/books/v1/volumes?q="+searchKey,function (response) {

                console.log(response)
            response.items.map((item)=>{

                console.log(item.volumeInfo.imageLinks.thumbnail)
                console.log(item.volumeInfo.title)
                console.log(item.volumeInfo.description)


                var $row = $('<tr class="wbdv-template wbdv-user wbdv-hidden" id="trow['+item.index+']">'+
                    '<td style="padding: 20px" id="thumbnail['+item.index+']"><img src='+item.volumeInfo.imageLinks.thumbnail+'/></td>'+
                    '<td style="padding: 20px" id="title['+item.index+']">'+item.volumeInfo.title+'</td>'+
                    '<td style="padding: 20px" id="description['+item.index+']">'+item.volumeInfo.description+'</td>'+
                    '</tr>');

                $('table> tbody:last').append($row);




            })

        })

        var searchKey = $("#searchInput").val('');


    }




})