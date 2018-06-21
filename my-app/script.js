
$(document).ready(function(){

$(main)


function main()
{
			
			fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=8e08852c66f845fbae14cb660487234e', {
					method: 'get',
				  })
				  .then(response => { return response.json(); })
				  .then(json => { 
				  
						json.results.map((items)=>{
							
							
							console.log(items.book_details[0].title)
							 var $row = $('<tr class="wbdv-template wbdv-user wbdv-hidden" id="trow['+items.book_details[0].title+']">'+
							 '<td style="padding: 20px" id="book[1]">'+items.book_details[0].title+'</td>'+
							'<td style="padding: 20px" id="title[1]">'+items.book_details[0].author+'</td>'+
							'<td style="padding: 20px" id="description[2]">'+items.book_details[0].description+'</td>'+
							'</tr>');

						$('table> tbody:last').append($row);

							
							
						})
					
					

					
				  })
				  

}



});



