var loadRouteButtons = function () {       
    $('.delete-route').on('click', function(ev) {
        ev.preventDefault();
        var isSure = confirm("Are you sure you want to delete this route?");
        if (isSure == true) {  
            var id = $(this).parent().parent().find('.route').attr('id'); 
            MODEL.Delete('Route', id, function(result){
                window.location.href = 'main.html';
            });
        }
        
        return false;
    });
};