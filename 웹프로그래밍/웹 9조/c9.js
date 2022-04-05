function ReplaceWithLogo()
{
   	if ($(".navbar-toggler").is(":visible"))
    {
    	$("#logotext").hide();
        $("#logoimg").fadeIn();
    }

    else
    {
    	$("#logoimg").hide();
    	$("#logotext").fadeIn();
    }
}

$(document).ready(function()
{
	wWidth = window.innerWidth;
	wHeight = window.innerHeight;

	ReplaceWithLogo();

	$("#login").click(function(e)
	{
		e.preventDefault();

		if ($("#signUpLayer.pop").is(":visible"))
		{
			$(".pop").fadeOut();
			$("#loginLayer.pop").fadeIn();
		}
    			
		else $(".dim, #loginLayer.pop").fadeIn();

		$('.navbar-collapse').collapse('hide');
	});

	$("#signup").click(function(e)
	{
		e.preventDefault();

		if ($("#loginLayer.pop").is(":visible"))
		{
			$(".pop").fadeOut();
			$("#signUpLayer.pop").fadeIn();
		}

		else $(".dim, #signUpLayer.pop").fadeIn();

		$('.navbar-collapse').collapse('hide');
	});

	$(".dim").click(function(e)
	{
		e.preventDefault();

		$(".dim, .pop").fadeOut();
	});

	$(window).resize(function()
	{
		ReplaceWithLogo();
	});

	$(".js-scroll-trigger").click(function(e)
	{
		if(this.hash !== "")
		{
			e.preventDefault();
			
            var hash = this.hash;

			$("html, body").animate({ scrollTop: $(hash).offset().top }, 800, function(){ window.location.hash = hash; });
		}
	});

	$('.js-scroll-trigger').click(function()
	{
		$('.navbar-collapse').collapse('hide');
	});
});