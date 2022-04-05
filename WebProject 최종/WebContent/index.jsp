<!-- Game development, Error handling -->

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
	rel="stylesheet" type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic"
	rel="stylesheet" type="text/css">
		
<script src="./js/jquery-3.2.1.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
	integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
	crossorigin="anonymous"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="./js/c9.js"></script>

<link rel="stylesheet" type="text/css" href="c9.css">


<title>CAFE NINE - Coffee, Tea, Bread and Person.</title>

</head>
<body>
	<%!
	public String id = null;
	public String name = null;
	public String msg = null;
	%>
	
	<%
	try
	{
		msg = request.getAttribute("error").toString();
	}
	catch (Exception e)
	{
		
	}
	
	if (msg != null)
	{
		out.println("<script>alert('로그인에 실패했습니다.');</script>");
		msg = null;
	}
	%>

	<div id="topheader">
		<p
			class="navbar-brand tagline-upper text-center text-heading mt-5 d-none d-lg-block">CAFE
			NINE</p>
		<div
			class="tagline-lower text-center text-expanded text-shadow text-uppercase mb-5 d-none d-lg-block">Coffee,
			Tea, Bread and Person.</div>
	</div>

	<!--Nav Menu-->
	<nav id="navmenu"
		class="navbar navbar-expand-lg navbar-light bg-faded py-lg-4" style="z-index: 13;">
		<div class="container">
			<a class="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none"
				href="#">CAFE NINE</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse"
				data-target="#navbarResponsive" aria-controls="navbarResponsive"
				aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav mx-auto">
					<li class="nav-item active px-lg-4">
						<a class="nav-link text-uppercase text-expanded" href="#" onclick="goToHome()">Home<span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item px-lg-4">
						<a class="nav-link text-uppercase text-expanded js-scroll-trigger" href="#cafe">Cafe</a>
					</li>
					<li class="nav-item px-lg-4">
						<a class="nav-link text-uppercase text-expanded js-scroll-trigger" href="#order">Order System</a>
					</li>
					<li class="nav-item px-lg-4">
						<a id="gamemenu" class="nav-link text-uppercase text-expanded" href="#">Game</a>
					</li>
					<li id="signupMenu" class="nav-item px-lg-4">
						<a id="signup" class="nav-link text-uppercase text-expanded" href="#">Sign Up</a>
					</li>
					<li id="loginMenu" class="nav-item px-lg-4">
						<a id="login" class="nav-link text-uppercase text-expanded" href="#">Login</a>
					</li>
					<li id="logoutMenu" class="nav-item px-lg-4">
						<form id="logout_form" action="./Process" method="POST">
							<a id="logout" class="nav-link text-uppercase text-expanded"
								href="javascript: clickLogout()">Logout</a>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<%
		try {
			id = session.getAttribute("userid").toString();
			name = session.getAttribute("username").toString();
		}

		catch (Exception e) {
			id = "0";
			name = "";
		}

		if (id.equals("0")) {
	%>
	<script>
		$("#logoutMenu").hide();
	</script>
	<%
		} else {
	%>
	<script>
		$("#signupMenu").hide();
		$("#loginMenu").hide();
	</script>
	<%
		}
	%>

	<!--header­-->
	<header id="top"> </header>

	<!--Cafe / Menu-->
	<section id="cafe">
		<div id="cafeLayer" class="card-deck">
			<div class="card" style="width: 5rem;">
				<img class="card-img-top" src="./img/atwosomeplace.png"
					alt="atwosomeplace logo">
				<div class="card-body">
					<h4 class="card-title">투썸플레이스</h4>
					<div class="list-group">
						<a href="#cafe" class="list-group-item list-group-item-action">자몽에이드<span style="float: right;">5,500원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">키위 바나나 주스<span style="float: right;">5,500원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">콜드브루 라떼<span style="float: right;">5,000원</span></a>
						<a id="Aclick" href="#" class="list-group-item active"><span style="float: right;">More...</span></a>
					</div>
				</div>
			</div>
			<div class="card" style="width: 5rem;">
				<img class="card-img-top" src="./img/starbucks.png" alt="starbucks logo">
				<div class="card-body">
					<h4 class="card-title">스타벅스</h4>
					<div class="list-group">
						<a href="#cafe" class="list-group-item list-group-item-action">딸기 요거트<span style="float: right;">6,100원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">베리 베리 요거트<span style="float: right;">6,700원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">망고 바나나<span style="float: right;">6,300원</span></a>
						<a id="Sclick" href="#" class="list-group-item active"><span style="float: right;">More...</span></a>
					</div>
				</div>
			</div>
			<div class="card" style="width: 5rem;">
				<img class="card-img-top" src="./img/ediya.png" alt="ediya logo">
				<div class="card-body">
					<h4 class="card-title">이디야</h4>
					<div class="list-group">
						<a href="#cafe" class="list-group-item list-group-item-action">로즈 자스민 티<span style="float: right;">2,800원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">페퍼민트 티<span style="float: right;">3,500원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">레몬 스윗플럼<span style="float: right;">4,200원</span></a>
						<a id="Eclick" href="#" class="list-group-item active"><span style="float: right;">More...</span></a>
					</div>
				</div>
			</div>
			<div class="card" style="width: 5rem;">
				<img class="card-img-top" src="./img/waining.png" alt="waining logo">
				<div class="card-body">
					<h4 class="card-title">더웨이닝</h4>
					<div class="list-group">
						<a href="#cafe" class="list-group-item list-group-item-action">레몬 프레도<span style="float: right;">6,000원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">그린티 프레도<span style="float: right;">6,500원</span></a>
						<a href="#cafe" class="list-group-item list-group-item-action">커피 프레도<span style="float: right;">5,700원</span></a>
						<a id="Wclick" href="#" class="list-group-item active"><span style="float: right;">More...</span></a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!--Order-->
	<section id="order">
		<div id="orderLayer" class="card">
			<div class="card-body">
				<form action="./Process" method="POST">
					<div class="form-group">
						<label for="orderName">이름</label>
						<input type="text" class="form-control" id="orderName" name="name" placeholder="주문자 이름"
						<% if (!(id.equals("0"))) {  %> value="<% out.println(name); %>" <% } %> >
					</div>
					<div class="form-group">
						<label for="orderPhone">전화번호</label>
						<input type="tel" class="form-control" id="orderPhone" name="phone" placeholder="010-0000-0000(- 없이 입력)">
					</div>
					<div class="form-group">
						<label for="orderPhone">카페</label>
						<select class="form-control" id="orderCafe" name="cafe">
							<option value="0">스타벅스</option>
							<option value="1">이디야</option>
							<option value="2">투썸플레이스</option>
							<option value="3">더 웨이닝</option>
						</select>
					</div>
					<div class="form-group">
						<label for="orderCafe">주문</label>
						<input type="text" class="form-control" id="orderCafe" name="order" placeholder="주문 내용">
					</div>
					<p>**결제는 계좌이체 선불 입니다.**</p>
					<button type="submit" class="btn btn-success" name="orderbtn">확인</button>
				</form>
			</div>
		</div>
	</section>

	<!--Dim layer-->
	<div class="dim"></div>

	<!--SignUp Layer-->
	<div id="signUpLayer" class="pop">
		<form action="./Process" method="POST">
			<div class="form-group">
				<label for="inputName">이름</label> <input type="text"
					class="form-control" id="inputName" name="username"
					aria-describedby="nameHelp" placeholder="실명">
			</div>
			<div class="form-group">
				<label for="inputEmail">이메일</label> <input type="email"
					class="form-control" id="inputEmail" name="email"
					aria-describedby="emailHelp" placeholder="xxx@website.com">
			</div>
			<div class="form-group">
				<label for="inputPasswd">비밀번호</label> <input type="password"
					class="form-control" id="inputPasswd" name="passwd"
					placeholder="********">
			</div>
			<button type="submit" class="btn btn-success" name="signup">회원
				가입</button>
		</form>
	</div>

	<!--Login Layer-->
	<div id="loginLayer" class="pop">
		<form action="./Process" method="POST">
			<div class="form-group">
				<label for="inputEmail">이메일</label> <input type="email"
					class="form-control" id="inputEmail" name="email"
					aria-describedby="emailHelp" placeholder="xxx@website.com">
			</div>
			<div class="form-group">
				<label for="passwd">비밀번호</label> <input type="password"
					class="form-control" id="passwd" name="passwd"
					placeholder="********">
			</div>
			<button type="submit" class="btn btn-success" name="login">로그인</button>
		</form>
	</div>
	
	<div id="cafemenu" class="pop">
		<img id="AMenu" style="display: none;" alt="atwosome" src="./img/atwosomeplacem.png">
		<img id="SMenu" style="display: none;" alt="starbucks" src="./img/starbucksm.png">
		<img id="EMenu" style="display: none;" alt="ediya" src="./img/ediyam.png">
		<img id="WMenu" style="display: none;" alt="waining" src="./img/wainingm.png">
	</div>

	<!--Game Layer -->
	<div id="gameLayer" class="pop">
		<canvas id="gameCanvas"></canvas>
	</div>
	<script type="text/javascript" src="./js/game.js"></script>
</body>
</html>