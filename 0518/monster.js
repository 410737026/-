var monster_colors = "780000-c1121f-fdf0d5-003049-669bbc".split("-").map(a=>"#"+a)
class Monster{ //宣告一個怪物類別
    constructor(args){ //預設值(基本資料)
        this.r =args.r || random(50,100) //設計的怪物有大有小時，傳參數args.r來設定怪物大小，沒有參數就以10為主
        this.p =args.p || createVector(random(width),random(height)) //由電腦亂數顯示初始位置
        this.v =args.v || createVector(random(-1,1),random(-1,1)) //移動速度 如果沒有傳參數 就會利用亂數抽取xy軸移動速度
        this.color =args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum=0 
      }   
      draw(){ //畫出元件
        if(this.dead == false ){
        
       
       
        push() //重新設定圓點位置
            translate(this.p.x,this.p.y) // 把原點座標移到物件中心
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
           

            if(this.mode=="happy"){
            fill(255)
            ellipse(0,0,this.r/2)
            fill(0)
            ellipse(0,0,this.r/3)
        }else{
            fill(255)
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill(0)
            arc(0,0,this.r/3,this.r/3,0,PI)

            
        }
        stroke(this.color)
            strokeWeight(4)
            noFill()
           // line(this.r/2,0,this.r,0)
           for(var j=0;j<8;j++){
            rotate(PI/4)
           beginShape()
            for(var i=0;i<(this.r/2);i++){
                vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
            }

           endShape()
        }


         pop() //恢復原點到整個視窗的左上角
      }
      else
      { //怪物死亡
        this.timenum=this.timenum+1
        push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
        stroke(255)
        line(-this.r/2,0,this.r/2,0)
        stroke(this.color) 
        strokeWeight(4)
        noFill()
        pop()
        for (var j=0;j<8;j++){
          rotate(PI/4)
          line(this.r/2,0,this.r,0)
      }
    }

      update(){ //計算出移動元件後的位置
            this.p.add(this.v)
            if(this.p.x<=0 || this.p.x>=width){
                this.v.x=-this.v.x
              }
              if(this.p.y<=0 || this.p.y>=height){
                this.v.y=-this.v.y
              }
      }

      isBallInRanger(x,y){ //判斷滑鼠按下的位置是否在物件範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點 飛彈與物件中心點的距離
        if(d<this.r/2){
          return true 
        }else{
          return false 
        }
      }
      }
    }
    