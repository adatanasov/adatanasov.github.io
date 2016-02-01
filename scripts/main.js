var loadRouteButtons = function () {       
    $('.delete-route').on('click', function(ev) {
        ev.preventDefault();
        var isSure = confirm("Are you sure you want to delete this route?");
        if (isSure == true) {  
            var clientId = $(this).parent().parent().find('.route-client').attr('id'); 
            //var transporterId = $(this).parent().parent().find('.transport-info').attr('id'); 
            var routeId = $(this).parent().parent().find('.route').attr('id'); 
            //TODO Add delete for Map
            MODEL.Delete('Client', clientId, function(result){});
            //MODEL.Delete('Transporter', transporterId, function(result){});
            MODEL.Delete('Route', routeId, function(result){
                window.location.href = 'main.html';
            });
        }
        
        return false;
    });
};