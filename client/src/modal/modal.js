(function($){
    $.fn.modal = function(action){
        function close_modal(modal) {
            //finding form in modal window to remove modal element completely
            $("div.modal #" + $(modal).attr('id')).closest(".dark-background")[0].remove();
        };
        
        return this.each(function() {
            var modal_obj = $(this);
            if(action === "open") {
                $('body').css({'overflow': 'hidden'});
                var dark_background = $('<div/>');
                dark_background.addClass("dark-background");
                $('body').append(dark_background);
                var modal = $('<div/>');
                modal.addClass("modal modal-large");
                modal.html('<div class = "modal-close"><span class = "fa fa-close"></span></div>');
                $('.dark-background').append(modal);
                const form_html = $("#popup-form").html();
                var form = $('<form/>');
                form.attr('id', modal_obj.attr('id'));
                form.addClass('modal-obj');
                form.html(form_html);
                modal.append(modal_obj[0].outerHTML);
                $(".modal > #" + modal_obj.attr('id')).removeClass('fade');
                modal.children(".modal-close").on('click', function(e){
                    //finding which modal this close button is assigned to and closing it
                    $(this).closest('.modal').children('form').modal('close');
                    
                });
                dark_background.on('click', function(e){
                    $(this).children('.modal').children('form').modal('close');
                    $(this).blur();
                });
                modal.on('click', function(e) {
                    e.stopPropagation();
                })
            }
            if(action === "close") {
                if($(".dark-background").length == 0)
                    $('body').css({'overflow': 'auto'});
                close_modal(modal_obj);
            }
            
        })
    }
}(jQuery))