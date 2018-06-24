
$(document).ready(function() {
    $('#rollForm').on('submit', function(e) {

        /* stop form from submitting normally */
        e.preventDefault(e);
        $.ajax({
            type:"GET",
            url:'wodroll',
            data:{
            	  diceNumber: $('#diceNo').val(), 
              	  difficulty: $('#difficulty').val(),
              	  explode: $('#tenExplode').val(),
              	  fail: $('#oneFail').val()
            },
            dataType: 'html',
            success: function(data){
            	var data = JSON.parse(data);
            	console.log('Request OK');
                
                var chart = drawGraph(data);
                
                $('#diceroller_results').html(chart);
                
            },
            error: function(data){
            	console.log('Request ERROR');
            }
        })
            
    })
	
});      
function drawGraph(data) {

	var ctx = document.getElementById("chart");

	ctx.height = 300;
	var myChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	    labels: data.labels,
	    datasets: [
	      { 
	        data: data.counts
	      }
	    ]
	  },
		options: {
		    maintainAspectRatio: false,
		    title: {
		    	display: true,
		    	text: "Wyniki: ",
		    	position: 'top',
		    	fontSize: 20,
		    	fontColor: 'black',
		    }
		}
	});
}
