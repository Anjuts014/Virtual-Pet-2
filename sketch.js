var dog, happyDog, database, foodStock
var feedBtn, addFoodBtn
var fedTime, lastFed, food

var Foods = 0
var foodS = 0
var gameState = "play"

function preload() {
  dogImg = loadImage('images/Dog.png')
  happyDog = loadImage('images/happyDog.png')
}

function setup() {
  createCanvas(900, 500);
  database = firebase.database();

  dog = createSprite(650, 300, 50, 50)
  dog.addImage(dogImg)
  dog.scale = 0.2

  food = new Food();

  foodStock=database.ref('Foods');
  foodStock.on("value",readStock);

  feedBtn = createButton("Feed the Dog")
  feedBtn.position(700, 95)
  feedBtn.mousePressed(feedDog)

  addFoodBtn = createButton("Add Food")
  addFoodBtn.position(800, 95)
  addFoodBtn.mousePressed(addFoods)

}


function draw() {
  background(46, 139, 87);
  food.display();
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDog)

  if (food.getFoodStock() <= 0) {
    food.updateFoodStock(food.getFoodStock()*0)
  }
  else {
    food.updateFoodStock((food.getFoodStock())-1)
  }
}


function addFoods(){
  database.ref('/').update({
    Foods:food.updateFoodStock((food.getFoodStock())+1)
  })
}