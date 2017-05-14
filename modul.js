var answer = document.createElement('div');
window.onload = function() {
	document.querySelector('#wrap > form:nth-child(1) > select:nth-child(1)').selectedIndex = -1;
	chalkboard.appendChild(answer);
	answer.style.display = "block";
	/*answer.style.position = "relative";*/
	answer.style.bottom = "390px";
/*ABOUT*/
var menu = document.getElementsByClassName('dropdown-menu')[0];
var close = document.getElementById('close');
menu.onclick = function() {
	$(about).fadeIn();
}
close.onclick = function() {
	$(about).fadeOut();
}

var originalStyleHelp = window.help.style.cssText;
var originalTextHelp = window.help.children[0].innerHTML;
	
	

var changedLimit = document.querySelector('#wrap > form:nth-child(1) > select:nth-child(1)');
changedLimit.onclick = function chang(event) {         //выбираем кол-во ограничений
	window.limitDiv.innerHTML = '';
	for(var i=1;i<=parseFloat(event.target.value);i++) {
		window.limitDiv.innerHTML+='<form class="limit"><input type="text" value="0"></input>x<sub>1</sub>  <input type="text" value="0"></input>x<sub>2</sub><select><option><=</option><option>>=</option><option>=</option></select><input type="text" value="0"></input></form>'; 
	}
}
//=========================================================================================
var f = function(x,y){
	var x1,x2,x3;
	x1 = parseFloat(document.forms.func[0].value);
	x2 = parseFloat(document.forms.func[1].value);
	x3 = parseFloat(document.forms.func[2].value);
	return x1*x+x2*y+x3;
}
//==========================================================================================
var disabledOff = function() {
	document.getElementsByTagName('button')[0].removeAttribute("disabled");
}

function shake(e, oncomplete, distance, time) {
	if (typeof e === "string") e = document.getElementById(e);
	if (!time) time = 500;
	if (!distance) distance = 5;
	
	document.getElementsByTagName('button')[0].setAttribute("disabled", true);
	var originalStyle = e.style.cssText;
	e.style.position = "relative";
	e.style.boxShadow = "0px 0px 0px black, 1px 1px 1em #AA0000";
	e.style.textShadow = "0px 0px 0px black, 1px 1px 1em #FF5555";
	var start = (new Date()).getTime();
	animate();
	
	function animate() {
		var now = (new Date()).getTime();
		var elapsed = now-start;
		var fraction = elapsed/time;
		
		if (fraction < 1) {
			var x = distance * Math.sin(fraction*4*Math.PI);
			e.style.left = x + "px";
			
			setTimeout(animate, Math.min(25, time-elapsed));
		}
		else {
			e.style.cssText = originalStyle;
			if (oncomplete)  oncomplete();
		}
	}
}



//==========================================================================================
var butt = document.querySelector('#chalkboard > button:nth-child(7)');
butt.onclick = function graf() {
container.innerHTML = '';
answer.innerHTML = '';

var colors = [];                              //цвета функций
for (var i = 0; i<5; i++) {
	colors[i] = Math.floor(Math.random()*(16777215-11111111)+11111111).toString(16);   //colors[i] = Math.floor(Math.random()*(999999-100000)+100000);
	}
	
var textForms = document.querySelectorAll('[type="text"]');
for(var iter=0; iter<textForms.length; iter++) {
	if (isNaN(parseFloat(textForms[iter].value))) {
		shake(textForms[iter],disabledOff,5,1000);    //если не корректно введены данные подсветить
		return;
	}
}


if(window.limitDiv.children.length==0) return;
var n,q,x,y,optim,i,j,k,optX,optY;
var a = [
		[1,0],
		[0,1]
		];
var b = [];
n = 5;
if (document.querySelector('#function > select:nth-child(6)').value =='max') optim = -999999;
else optim = 999999;

var addLimits = parseFloat(window.addLimits.value); //x1 x2 <=0 ||
b = [0,0]; //,950,60,80
var limits = document.getElementsByClassName('limit');
for(var count=0;count<limits.length;count++) {                     //Добавляем в массив А коэффициенты ограничений
	a.push([parseFloat(limits[count].elements[0].value),parseFloat(limits[count].elements[1].value)]);
	b.push(parseFloat(limits[count].elements[3].value));          //Добавляем в массив B ограничения
	}

for (i = 0; i < b.length; i++) {
  for (j = 0; j < b.length; j++) {
     if ((a[i][0]!=0) && (a[j][1]-(a[j][0]*a[i][1])/a[i][0]!=0))  {
        y=(b[j]-(b[i]*a[j][0])/a[i][0])/(a[j][1]-(a[j][0]*a[i][1])/a[i][0]);
        x=(b[i]-a[i][1]*y)/a[i][0];
        q=true;
        for (k = 0; k < b.length; k++) {
            switch(k) {
            case 0:
				switch(addLimits) {                      //проверяем условия
				case 1:
				case 4:
				if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
				break;
				case 2:
				case 3:
				if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
				break;
				};
			break;
            case 1:
				switch(addLimits) {
				case 1:
				case 3:
				if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
				break;
				case 2:
				case 4:
				if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
				break;
				};
			break;
            case 2:
				switch(parseFloat(document.getElementsByClassName('limit')[k-2].elements[2].selectedIndex)) {
				case 0:if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
					break;
				case 1:if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
					break;
				case 2:if (a[k][0]*x+a[k][1]*y!=b[k]) q=false;
					break;
				};
			break;
            case 3:
				switch(document.getElementsByClassName('limit')[k-2].elements[2].selectedIndex) {
				case 0:if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
					break;
				case 1:if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
					break;
				case 2:if (a[k][0]*x+a[k][1]*y!=b[k]) q=false;
					break;
				};
			break;
            case 4:
				switch(document.getElementsByClassName('limit')[k-2].elements[2].selectedIndex) {
				case 0:if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
					break;
				case 1:if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
					break;
				case 2:if (a[k][0]*x+a[k][1]*y!=b[k]) q=false;
					break;
				};
			break;
			case 5:
				switch(document.getElementsByClassName('limit')[k-2].elements[2].selectedIndex) {
				case 0:if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
					break;
				case 1:if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
					break;
				case 2:if (a[k][0]*x+a[k][1]*y!=b[k]) q=false;
					break;
				};
			break;
			case 6:
				switch(document.getElementsByClassName('limit')[k-2].elements[2].selectedIndex) {
				case 0:if (a[k][0]*x+a[k][1]*y>b[k]) q=false;
					break;
				case 1:if (a[k][0]*x+a[k][1]*y<b[k]) q=false;
					break;
				case 2:if (a[k][0]*x+a[k][1]*y!=b[k]) q=false;
					break;
				};
			break;
			}
          }
		switch (document.querySelector('#function > select:nth-child(6)').value) {
			case 'max':if ((q) && (f(x,y)>optim)) {
			optim=f(x,y);
			optX = x;
			optY = y;
			};
			break;
			case 'min':if ((q) && (f(x,y)<optim)) {
			optim=f(x,y);
			optX = x;
			optY = y;
			};
			break;
		}
       }
    }
} 
//==============================================================================================================
function paintGraf() {

var w = 400;
var h = 400;
var padding = 30;


var svg = d3.select("#container")
             .append("svg")
          	 .attr("width", w)
          	 .attr("height", h);


var maxB = d3.max(b, function(d) {return d+50;});
var funcXScale = d3.scale.linear()                                 //масштабирование функции
			   .domain([0,d3.max([optX,optY], function(d) {return d+100;})])
			   .range([w/2,w-padding]);
			   
var funcYScale = d3.scale.linear()
			   .domain([0,d3.max([optX,optY], function(d) {return d+100;})])
			   .range([h/2,padding]);
			   
			  
var xScale = d3.scale.linear()
               .domain([0, d3.max([optX,optY], function(d) {return d+100;})])
               .range([w/2, w-padding]);

var x2Scale = d3.scale.linear()
               .domain([0, -d3.max([optX,optY], function(d) {return d+100;})])
               .range([w-padding, w/2]);

var yScale = d3.scale.linear()
                .domain([0, d3.max([optX,optY], function(d) {return d+100;})])
                 .range([h/2, padding]);

var y2Scale = d3.scale.linear()
                .domain([0, -d3.max([optX,optY], function(d) {return d+100;})])
                 .range([padding, h/2]);



var xAxis = d3.svg.axis()                    //оси х и у
               .scale(xScale)
               .orient("bottom")
               .ticks(5);

var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(5);
			  
var y2Axis = d3.svg.axis()
              .scale(y2Scale)
              .orient("left")
              .ticks(5);

var x2Axis = d3.svg.axis()
			  .scale(x2Scale)
			  .orient("bottom")
              .ticks(5);

		
svg.append("g")                                           // добавляем оси на график
   .attr("class", "axis")
   .attr("transform", "translate(0," + (h/2) + ")")
   .call(xAxis);
   
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate("+(-(w-padding*2)/2)+"," + (h/2) + ")")
   .call(x2Axis);

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + w/2 + ",0)")
   .call(yAxis);
   
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + w/2 + ","+ (h-padding*2)/2 +")")
   .call(y2Axis);
   
function delNulles() {                       //УДАЛЯЕМ НУЛИ
	var ticks = document.getElementsByTagName('text');
	for (var iter = 0; iter < ticks.length; iter++) {
		if (ticks[iter].innerHTML == '0') ticks[iter].style.visibility = 'hidden';
	}
}
delNulles()
 for (var key=2;key<a.length; key++) {                               //рисуем график
if ((a[key][0]==0 && a[key][1]!=0) || (a[key][0]!=0 && a[key][1]!=0)) { 								// если Х = 0
svg.append("line")
	.style("stroke", "#"+colors[key-2])
	.style("stroke-width", 2)
	.attr("x1",funcXScale(1000))
	.attr("y1",funcYScale((b[key]-(a[key][0]*1000))/a[key][1]))
	.attr("x2",funcXScale(-1000))
	.attr("y2",funcYScale((b[key]-(a[key][0]*-1000))/a[key][1]));
	} else if (a[key][0]!=0 && a[key][1]==0) {

svg.append("line")														// если У = 0 рисуем через х шоб не делить на ноль
	.style("stroke", "#"+colors[key-2])
	.style("stroke-width", 2)
	.attr("x1",funcXScale((b[key]-(a[key][1]*1000))/a[key][0]))
	.attr("y1",funcYScale(1000))
	.attr("x2",funcXScale((b[key]-(a[key][1]*-1000))/a[key][0]))
	.attr("y2",funcYScale(-1000));
	} else continue
}

svg.append("circle")                                           // точка оптимума
    .attr("cx", funcXScale(optX))             
    .attr("cy", funcYScale(optY))             
    .attr("r", 1)               
    .style("stroke-width", 3)    
    .style("stroke", "red")      
    .style("fill", "red");

}
paintGraf();
var legend = document.createElement('div');
legend.className = "legend";
container.appendChild(legend);
for (key=2; key<a.length; key++) {
	var elem = document.createElement('div');
	legend.appendChild(elem);
	elem.style.color = "#" + colors[key-2];
	elem.innerHTML = a[key][0]+"x1 "+a[key][1]+"x2 "+" = " + b[key];
}
	
if (optX===undefined && optY===undefined) {
	answer.innerHTML = 'РЕШЕНИЯ НЕТ';
	answer.style.textShadow = "0px 0px 0px black, 1px 1px 1em #FF0000";
	 shake(answer, disabledOff, 5, 500);
	return;
	}
answer.innerHTML = 'x1= ' + '<span class="selectColor">' + optX.toFixed(0) + '</span>' + ' x2= ' + '<span class="selectColor">' + optY.toFixed(0) + '</span>' + ' Оптимум= ' + '<span class="selectColor">' + optim.toFixed(0) + '</span>';
$('#container').fadeIn();
}

/*HELP*/
function isNeed(e) {

	if ($('#help div').css('display') == 'none' ) {               //нужна помощь?
	$('#help div').fadeIn();
	$('#help').css({
		right:0,
		bottom:0
	});
	window.no.onclick = function() {								//нет
		$('#help div').fadeOut();
		$('#help').css({
		right:-120,
		bottom:-150
	});
		}
	window.yes.onclick = function() {									//да
		isNeedHelp.removeEventListener('mouseover', isNeed, false);
		goHelp();
		}
	return;
	}

}


function goHelp() {
	var i=0;//for(var i=0; i<4; i++) {	
		switch(i) {
			case 0:
				$('#help').animate({
					left:func.offsetLeft-180,
					top:func.offsetTop+40
					}, {
						duration:600,
						complete: function() {
							$('#help > div').text('Введите коэффициенты функции и выберите максимум');
							setTimeout(function() {shake(window.func[0],disabledOff,10,1000)},1000);
							setTimeout(function() {shake(window.func[1],disabledOff,10,1000)},2000);
							setTimeout(function() {shake(window.func[2],disabledOff,10,1000)},3000);
							setTimeout(function() {shake(window.func[3],disabledOff,10,1000)},4000);
							setTimeout(function() {shake(window.addLimits,disabledOff,10,1000)},5000);
							}
						}
							);
				//break;
			case 1:setTimeout(function() {
				$('#help').animate({
					top:'+=100'
					}, {
						duration:600,
						complete: function() {
							$('#help > div').text('выберите ограничения');
							setTimeout(function() {document.forms[1].elements[0].children[0].click()},1000);
							setTimeout(function() {shake(document.forms[2],disabledOff,10,1000)},2000);
							setTimeout(function() {shake(document.forms[3],disabledOff,10,1000)},4000);
							setTimeout(function() {shake(document.forms[4],disabledOff,10,1000)},6000);
							}
						}
							)},5000);
				//break;
			
				//break;
			case 3:setTimeout(function() {
				$('#help').animate({
					top:'+=100'
					}, {
						duration:600,
						complete: function() {
							$('#help > div').text('Нажмите вычислить');
							setTimeout(function() {shake(butt,disabledOff,10,1000)},2000);
							setTimeout(function() {$('#help').fadeOut();},5000);
							}
						}
							)},20000);
				
				//break;
			
			case 4:setTimeout(function () {
				$('#help').animate({
							right:-20,
							bottom:-50
							}, {
								complete: function() {
									setTimeout(function() {window.help.children[0].style.display = 'none';
									window.help.children[0].innerHTML = originalTextHelp;
									$('#help').fadeIn();
									isNeedHelp.addEventListener('mouseover', isNeed,false);
									window.help.style.cssText = originalStyleHelp;},5000);
									}})},25000);
	
			}
}
var isNeedHelp = document.getElementById('help');
isNeedHelp.addEventListener('mouseover', isNeed,false);




}