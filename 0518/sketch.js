let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，
var fill_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
var line_colors = "a7c6da-eefcce-9eb25d-f1db4b-edff71".split("-").map(a=>"#"+a)

var ball //目前要處裡的物件，暫時放在ball變數內
var balls =[] //把產生的所有的物件

var bullet
var bullets = []

var monster
var monsters = []

var shipP

var score =0

class obj{ //宣告一個類別，畫的圖案
  constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
    //this.p = args.p || {x: random(width), y:random(height) }//描述為該物件的初始位置 

    this.p = args.p || createVector(random(width),random(height))
    //this.v = {x: random(-1,1), y:random(-1,1) } //設定一個物件的移動速度
    this.v = createVector(random(-1,1),random(-1,1))
    this.size = random(10,20) // 一個物件放大倍率
    this.color = random(fill_colors) //充滿顏色
    this.stroke = random(line_colors) //外框線條顏色
  }
  draw(){ //畫出單一一個物件形狀
    push() //依照我的設定 設定原點(0,0)的位置
     translate(this.p.x,this.p.y) //以該物件位置為原點
     scale(this.v.x<0?1:-1,-1)
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(4)
     beginShape()
     for(var k=0; k<points.length;k=k+1){
      //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
      //vertex(points[k][0]*this.size,points[k][1]*this.size)
      curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫線為圓弧

     }
     endShape()
     pop() //原點設定回到整個視窗的左上角
  }
update(){ //移動的程式內容
  //this.p.x =this.p.x +this.v.x //x軸位置加上移動速度
 // this.p.y =this.p.y +this.v.y
  this.p.add(this.v)

  //let mouseV = createVector(mouseX,mouseY)
 // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
 // this.p.add(delta)


  if(this.p.x<=0 || this.p.x>=width){
    this.v.x=-this.v.x
  }
  if(this.p.y<=0 || this.p.y>=height){
    this.v.y=-this.v.y
  }
}
isBallInRanger(x,y){ //判斷滑鼠按下的位置是否在物件範圍內
  let d = dist(x,y,this.p.x,this.p.y)
  if(d<4*this.size){
    return true 
  }else{
    return false 
  }
}
}


class Bullet{
  constructor(args){ //預設值(基本資料)
    this.r =args.r || 15 //設計的飛彈有大有小時，傳參數args.r來設定飛彈大小，沒有參數就以10為主
    this.p =args.p || shipP.copy()                 // createVector(width/2,height/2)
    this.v =args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
    this.color =args.color || "red"
  }
  draw(){ //畫出物件程式碼
    push()
      translate(this.p.x,this.p.y)
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
    pop()
 
  }
  update(){ //計算出移動後的位置
      this.p.add(this.v)

  }

}



function preload(){
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}


function setup() {
 createCanvas(windowWidth, windowHeight);
 shipP= createVector(width/2,height/2)
 for(var i=0;i<20;i=i+1){
  ball = new obj({})  //產生一個obj class元件 
  balls.push(ball) //把ball的物件放到balls陣列內
 }
 createCanvas(windowWidth, windowHeight);
 for(var i=0;i<10;i=i+1){
  monster = new Monster({})  //產生一個obj class元件 
  monsters.push(monster) //把ball的物件放到balls陣列內
 }
}

function draw() {
  background(220);
  //for(var j=0;j<balls.length;j=j+1){
   // ball=balls[j]
   // ball.draw()
   // ball.update()
   // }
  
  if(keyIsPressed){
    if(key=="ArrowLeft"){
      shipP.x =shipP.x-5
    }
    if(key=="ArrowRight"){
      shipP.x =shipP.x+5
    }
    if(key=="ArrowUp"){
      shipP.y =shipP.y-5
    }
    if(key=="ArrowDown"){
      shipP.y =shipP.y+5
    }


  }
   //大象
  for(let ball of balls) //只要是陣列的方式，都可以利用此方式
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號
        bullets.splice(bullets.indexOf(bullet),1)
        score = score - 1
        elephant_sound.play()
  }
}
  }

  //飛彈
  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }

  //怪物
  for(let monster of monsters)
  {
    if (monster.dead== true7&& monster.timenum>4){
      monster.splice(monster.indexOf(monster),1)
    }


    monster.draw()
    monster.update()
  
  for(let bullet of bullets){ //檢查每一個物件
    if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
      //monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號
      bullets.splice(bullets.indexOf(bullet),1)
      score = score + 1
      monster.dead = true //代表怪物死掉
     // elephant_sound.play()
    }   
}
}
textSize(50)
text(score,50,50)
push() //重新規劃原點在視窗中間
  let dx = mouseX-width/2
  let dy = mouseY-height/2
  let angle = atan2(dy,dx) 
  translate(shipP.x,shipP.y)
  fill("#ffc03a")
  noStroke()
  rotate(angle-300)
  triangle(-25,25,25,25,0,-50) //設定三個點 畫成一個三角形
  ellipse(0,0,40)
pop() //恢復原本設定 原點在視窗左上角
}
 
function mousePressed(){

bullet = new Bullet({})
 
bullets.push(bullet) 
bullet_sound.play()

}

function keyPressed(){
  if(key==" "){ //按下空白建 發射飛彈 跟按下滑鼠的功能一樣
    bullet = new Bullet({})
    bullets.push(bullet) 
    bullet_sound.play()
}
  
   


}