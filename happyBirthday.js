var is_start = 0,
	x = 3, y = 3,
	times = 0;
	difficulty = 10,
	lastStep = -1;
	box = new Array();
for (var i = 0; i < 4; i++) {
	box[i] = new Array(i*4+0, i*4+1, i*4+2, i*4+3);
}

// complish load changing background pictures list
function loadPicList() {
	var choosePic = document.getElementById('choosePic');
	for (var i = 0; i < 4; i++) {
		var li = document.createElement("li");
		li.className = "choose imag" + i;
		choosePic.appendChild(li);
	}
}

// complish load 4x4 puzzle
function loadPuzzle() {
	var puzzle = document.getElementById('puzzle');
	for (var i = 0; i < 4; i++) {
		var ul = document.createElement("ul");
		ul.className = "col";
		puzzle.appendChild(ul);
		for (var j = 0; j < 4; j++) {
			var li = document.createElement("li");
			li.className = "pic imag0 row-" + i + " col-" + j;
			// if (i*4+j == 15) li.className += " white";
			li.id = "pic-" + (i*4+j);
			ul.appendChild(li);
		}
	}
}

// change background pictures
function changePic() {
	var choose = document.getElementsByClassName('choose');            //  add if is end
	for (var i = 0; i < choose.length; i++) {
		choose[i].onclick = function(i) {
			return function(){
				var ppic = document.getElementsByClassName('pic');
				for (var j = 0; j < ppic.length; j++) {
					var name = ppic[j].className;
					var nname = name.split(" ");
					nname[1] = "imag" + i;
					ppic[j].className = nname.join(" ");
				}
			}
		}(i);
	}
}

// if is success: at every move, including random;
function is_success() {
	if (is_start == 1) {
		var f = 1;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (box[i][j] != i*4+j) f = 0;
			}
		}
		if (f == 1) {
			times++;
			difficulty*10;
			envFunc();                           //  add html div提示, 还原
			resetFunc();
		}
	}
}

//  Reset


//   不再判断，直接进行交换(前提是可换：即不必考虑是否能换，是不是边界等的问题)
function exchange(direction) {
	if (direction == 0) {
		x--;
		box[x+1][y] = box[x][y];
	}
	if (direction == 1) {
		y++;
		box[x][y-1] = box[x][y];
	}
	if (direction == 2) {
		x++;
		box[x-1][y] = box[x][y];
	}
	if (direction == 3) {
		y--;
		box[x][y+1] = box[x][y];
	}
	var name = "pic-" + box[x][y];
	box[x][y] = 15;
	var org = document.getElementById("pic-15");
	var goal = document.getElementById(name);
	//var tmp = org.className;
	//org.className = goal.className;
	//goal.className = tmp;
	var org = document.getElementById("pic-15");
	var goal = document.getElementById(name);
	org.id = goal.id;
	goal.id = "pic-15";
}

// reset
function resetFunc() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				while (box[i][j] != i*4+j) {
					var num = box[i][j],
						other_num = box[parseInt(num/4)][parseInt(num%4)];
					box[i][j] = other_num;
					box[parseInt(num/4)][parseInt(num%4)] = num;
					var org = document.getElementById("pic-"+other_num);
					var goal = document.getElementById("pic-"+num);

					//var tmp = org.className;
					//org.className = goal.className;
					//goal.className = tmp;


					org.id = "pic-"+num;
					goal.id = "pic-"+other_num;
					/*alert(box[0]+"\n"+box[1]+"\n"+box[2]+"\n"+box[3]);*/
				}
			}
		}
		x = y = 3;
		is_start = 0;
}

// start function
function startFunc() {
	resetFunc();
	is_start = 1;
	var circle = difficulty;
	for(var i = 0; i < circle; i++) {
		var direction = parseInt(4*Math.random());
		if (direction == 0) {     // top
			if (x == 0 || lastStep == 2) circle++;
			else {exchange(0); lastStep = 0;}
		}
		if (direction == 1) {     // right
			if (y == 3 || lastStep == 3) circle++;
			else {exchange(1); lastStep = 1;}
		}
		if (direction == 2) {     // bottom
			if (x == 3 || lastStep == 0) circle++;
			else {exchange(2); lastStep = 2;}
		}
		if (direction == 3) {      // left
			if (y == 0 || lastStep == 1) circle++;
			else {exchange(3); lastStep = 3;}
		}
	}
	// moveFunc();
	for (var i = 0; i < 16; i++) {
		var name = "pic-" + i;
		var pic = document.getElementById(name);
		pic.onclick = function() {
			moveFunc(this);
		};
	}
}

/*----------------------------------window.onload--------------------------------*/
window.onload = function() {
	var begin = document.getElementById("begin");
	begin.onclick = function () {
		begin.id = "beginHidden";
	};
	loadPicList();
	loadPuzzle();
	// start again: reset&&random start
	var start = document.getElementById("start");
	start.onclick = function() {
		alert("每完成一幅拼图有一个奖励啊~~~~~~~~~\n"
			+ "点击左侧的列表可以更换图片\n"
			+ "点击reset可以复原");
		startFunc();
	}
	// reset
	var reset = document.getElementById('reset');
	reset.onclick = function() {
		alert("aha~  苯凡凡，继续努力！");
		resetFunc();
	}
	// change pictures
	changePic();
};

 function moveFunc(y) {
	var _name = y.id;
	var _num = 0;
	_num = _name.substring(4);
	var pos_x = 0, pos_y = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) if (box[i][j] == _num) {pos_x = i; pos_y = j;}
	}
	if (pos_x > 0 && box[pos_x-1][pos_y] == 15) exchange(2);
	if (pos_y < 3 && box[pos_x][pos_y+1] == 15) exchange(3);
	if (pos_x < 3 && box[pos_x+1][pos_y] == 15) exchange(0);
	if (pos_y > 0 && box[pos_x][pos_y-1] == 15) exchange(1);
	is_success();
}

envFunc = function () {
	alert("收到一个神秘信封！\n"+"一共有多少个神秘信封呢？");
	var wrap = document.getElementById("wrap"),
		env = document.getElementById("env"),
		next = document.getElementById("continue"),
		bg = document.getElementById('bg');
	wrap.className = "wrapHidden";
	env.id = "envAfter";
	env.onclick = function () {
		if (times == 1) {env.id = "green"; next.id = "continueAfter";}
		if (times == 2) {env.id = "pink"; next.id = "continueAfter";}
		if (times == 3) {env.id = "purple"; next.id = "continueAfter";}
		if (times == 4) {env.id = "words"; next.id = "continueAfter";}
	}
	next.onclick = function () {
		if (times == 4) {
			var end = document.getElementById("endHiden");
			end.id = "end";
			env.id = "env";
			next.id = "continue";
			bg.id = "bgPic";
		}
		else {
			env.id = "env";
			next.id = "continue";
			wrap.className = "wrap";
			reset();
		}
	}
}
