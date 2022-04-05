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

function clickLogout()
{
	document.getElementById('logout_form').submit();
}

function goToHome()
{
	window.location.href = "./"
}

$(document).ready(function()
{
	// Document variable
	
	var wWidth = window.innerWidth;
	var wHeight = window.innerHeight;
	var headerHeight = $("#topheader").height();
	var navHeight = $("#navmenu").height();
	
	// Functions

	ReplaceWithLogo();
	
	window.location.hash = "";
	
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
	
	$("#gamemenu").click(function(e)
	{
		e.preventDefault();
		
		$(".dim, #gameLayer.pop").fadeIn();
		
		$('.navbar-collapse').collapse('hide');
		
		Init();
	});

	$(".dim").click(function(e)
	{
		e.preventDefault();

		$(".dim, .pop, #AMenu, #SMenu, #EMenu, #WMenu").fadeOut();
	});
	
	$("#Aclick").click(function(e)
	{
		e.preventDefault();
		
		$("#AMenu").show();
		
		$(".dim, #cafemenu.pop").fadeIn();
	});
	
	$("#Sclick").click(function(e)
	{
		e.preventDefault();
		
		$("#SMenu").show();
		
		$(".dim, #cafemenu.pop").fadeIn();
	});
	
	$("#Eclick").click(function(e)
	{
		e.preventDefault();
		
		$("#EMenu").show();
		
		$(".dim, #cafemenu.pop").fadeIn();
	});
	
	$("#Wclick").click(function(e)
	{
		e.preventDefault();
		
		$("#WMenu").show();
		
		$(".dim, #cafemenu.pop").fadeIn();
	});

	$(window).resize(function()
	{
		ReplaceWithLogo();
	});

	$(window).scroll(function()
	{
		var sticky = $("#navmenu");
		scroll = $(window).scrollTop();

		if (scroll >= headerHeight + navHeight) sticky.addClass("fixed");
		else sticky.removeClass("fixed");
	});

	$(".js-scroll-trigger").click(function(e)
	{
		e.preventDefault();

		$('.navbar-collapse').collapse('hide');

		hash = this.hash;

		$('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function()
    	{
			window.location.hash = hash;
    	});
	});
});