$(".navbar-toggle").on('click', function(){
   console.log('click', $(this)); 
   if($(".navbar-toggle").attr('class').search('collapsed')!= -1) {
       console.log('collapsed');
       $(".navbar-toggle").removeClass('collapsed');
       $("ul.nav-menu").addClass('mobile');
   }
   else {
       console.log('open');
       $(".navbar-toggle").addClass('collapsed');
       $("ul.nav-menu").removeClass('mobile');
   }
});