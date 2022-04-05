const PUZZLE_DIFFICULTY = 4;
const PUZZLE_HOVER_TINT = "#009900";

var cvs;
var stage;

var stageImg;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var curPiece;
var curDropPiece;

var mouse;

function Init()
{	
	stageImg = new Image();
	stageImg.addEventListener("load", onImage, false);
	stageImg.src = "./img/demo.jpg";
}

function onImage()
{
	pieceWidth = Math.floor(stageImg.width / PUZZLE_DIFFICULTY);
	pieceHeight = Math.floor(stageImg.height / PUZZLE_DIFFICULTY);

	puzzleWidth = pieceWidth * PUZZLE_DIFFICULTY;
	puzzleHeight = pieceHeight * PUZZLE_DIFFICULTY;

	SetCanvas();
	InitPuzzle();
}

function SetCanvas()
{
	cvs = document.getElementById("gameCanvas");
	stage = cvs.getContext("2d");

	cvs.width = puzzleWidth;
	cvs.height = puzzleHeight;
	cvs.style.border = "1px solid black";
}

function InitPuzzle()
{
	pieces = [];
	mouse = { x:0, y:0 };

	curPiece = null;
	curDropPiece = null;

	stage.drawImage(stageImg, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
	createTitle("Click to start puzzle");

	BuildPieces();
}

function createTitle(msg)
{
	stage.fillStyle = "#000000";
	stage.globalAlpha = .4;
	stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
	stage.fillStyle = "#ffffff";
	stage.globalAlpha = 1;
	stage.textAlign = "center";
	stage.textBaseline = "middle";
	stage.font = "20px Arial";
	stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
}

function BuildPieces()
{
	var piece;
	var xPos = 0;
	var yPos = 0;

	for (var i = 0; i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY; i++)
	{
		piece = {};
		piece.sx = xPos;
		piece.sy = yPos;

		pieces.push(piece);

		xPos += pieceWidth;

		if (xPos >= puzzleWidth)
		{
			xPos = 0;
			yPos += pieceHeight;
		}
	}

	document.onmousedown = ShufflePuzzle;
}

function ShufflePuzzle()
{
	var ShuffleArray = function(o)
	{
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

			return o;
	}

	pieces = ShuffleArray(pieces);

	stage.clearRect(0, 0, puzzleWidth, puzzleHeight);

	var piece;
	var xPos = 0;
	var yPos = 0;

	for (var i = 0; i < pieces.length; i++)
	{
		piece = pieces[i];
		piece.xPos = xPos;
		piece.yPos = yPos;

		stage.drawImage(stageImg, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
		stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);

		xPos += pieceWidth;

		if (xPos >= puzzleWidth)
		{
			xPos = 0;
			yPos += pieceHeight;
		}
	}

	document.onmousedown = onPuzzleClick;
}

function onPuzzleClick(e)
{
	if(e.layerX || e.layerX == 0)
	{
		mouse.x = e.layerX - cvs.offsetLeft;
		mouse.y = e.layerY - cvs.offsetTop;
	}

	else if (e.offsetX || e.offsetX == 0)
	{
		mouse.x = e.offsetX - cvs.offsetLeft;
		mouse.y = e.offsetY - cvs.offsetTop;
	}

	curPiece = CheckPieceClicked();

	if (curPiece != null)
	{
		stage.clearRect(curPiece.xPos, curPiece.yPos, pieceWidth, pieceHeight);
		stage.save();
		stage.globalAlpha = .9;
		stage.drawImage(stageImg, curPiece.sx, curPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
		stage.restore();

		document.onmousemove = UpdatePuzzle;
		document.onmouseup = PieceDropped;
	}
}

function CheckPieceClicked()
{
	var piece;
	
	for(var i = 0; i < pieces.length; i++)
	{
		piece = pieces[i];
		
		if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight))
		{
			//PIECE NOT HIT
		}

		else
		{
			return piece;
		}
	}
	
	return null;
}

function UpdatePuzzle(e)
{
	curDropPiece = null;

	if (e.layerX || e.layerX == 0)
	{
		mouse.x = e.layerX - cvs.offsetLeft;
		mouse.y = e.layerY - cvs.offsetTop;
	}

	else if(e.offsetX || e.offsetX == 0)
	{
		mouse.x = e.offsetX - cvs.offsetLeft;
		mouse.y = e.offsetY - cvs.offsetTop;
	}

	stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
	
	var piece;

	for (var i = 0; i < pieces.length; i++)
	{
		piece = pieces[i];

		if (piece == curPiece) continue;

		stage.drawImage(stageImg, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
		stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
		
		if (curDropPiece == null)
		{
			if (mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight))
			{
				//NOT OVER
			}

			else
			{
				curDropPiece = piece;
				stage.save();
				stage.globalAlpha = .4;
				stage.fillStyle = PUZZLE_HOVER_TINT;
				stage.fillRect(curDropPiece.xPos, curDropPiece.yPos, pieceWidth, pieceHeight);
				stage.restore();
			}
		}
	}

	stage.save();
	stage.globalAlpha = .6;
	stage.drawImage(stageImg, curPiece.sx, curPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
	stage.restore();
	stage.strokeRect(mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
}

function PieceDropped(e){
	document.onmousemove = null;
	document.onmouseup = null;
	
	if (curDropPiece != null)
	{
		var tmp = { xPos:curPiece.xPos, yPos:curPiece.yPos };
		curPiece.xPos = curDropPiece.xPos;
		curPiece.yPos = curDropPiece.yPos;
		curDropPiece.xPos = tmp.xPos;
		curDropPiece.yPos = tmp.yPos;
	}
	
	ResetPuzzleAndCheckWin();
}

function ResetPuzzleAndCheckWin()
{
	stage.clearRect(0, 0, puzzleWidth, puzzleHeight);

	var gameWin = true;
	var piece;
	
	for (var i = 0; i < pieces.length; i++)
	{
		piece = pieces[i];
		stage.drawImage(stageImg, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
		stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);

		if (piece.xPos != piece.sx || piece.yPos != piece.sy) gameWin = false;
	}

	if (gameWin) setTimeout(GameOver, 500);
}

function gameOver()
{
	document.onmousedown = null;
	document.onmousemove = null;
	document.onmouseup = null;

	InitPuzzle();
}