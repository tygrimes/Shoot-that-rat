//setup
import kaboom from "kaboom"

// initialize context
kaboom()


// load assets
loadPedit("luigi", "sprites/luigi.pedit")
loadPedit("mewigi", "sprites/mewigi.pedit")
loadPedit("ground", "sprites/ground.pedit");
loadPedit("grave", "sprites/grave.pedit");
loadPedit("deepground", "sprites/deepground.pedit");
loadPedit("tooth", "sprites/tooth.pedit");
loadPedit("deepground2", "sprites/deepground2.pedit");
loadPedit("platform", "sprites/platform.pedit");
loadPedit("bullet", "sprites/bullet.pedit");
loadSprite("bg", "sprites/bg.jpg");
loadPedit("ghost", "sprites/ghost.pedit");
loadPedit("hole", "sprites/hole.pedit");

let BULLET_SPEED = 400;
let SCORE_VALUE = 0
let isFlipped = false; 
const MOVE_SPEED = 200;
const JUMP_FORCE = 360;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let hspeed = -50;


  //back
  


    const LEVELS = [
  [
  'g                        g',
  'g                        g',
  'g                        g',
  'g                        g',
  'g             T          g',
  'g          T  p          g',
  'g  T    T  p             g',
  'g     h p   h            g',
  'g     g     g         o  g',
  'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  'dudddddddddduddddddddddddd',
], 
[
  'g                        g',
  'g                        g',
  'g                        g',
  'g                        g',
  'g                        g',
  'g          T  p          g',
  'g  T    T  p             g',
  'g     h p   h            g',
  'g     g     g         o  g',
  'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  'dudddddddddduddddddddddddd',
]
  ]
scene("game", ({levelIdx, score }) => {

  layers(['bg', 'obj', 'ui'], 'obj')
    add([ sprite("bg", {width: width() * 2, height: height() * 2})
    ]);

	const level = addLevel(LEVELS[levelIdx || 0], {
  height: 35,
  width: 40,
  'x' : ()=>[
    sprite('ground'),
    solid(), 
    area(),
  ],
  'g' : ()=>[
    sprite('grave'),
    solid(),
    body(),
    area(),
  ],
  'h' : ()=>[
    sprite('ghost'), 
    area(), 
    pos(), 
    'ghost',
    "dangerous",
  ],
  
  'd' : ()=>[
    sprite('deepground2'),
  ],
  'u' : ()=>[sprite('deepground'),
  ],
  'T' : ()=>[sprite('tooth'),
             area(), 
             "points",
  ],
  'p' : ()=>[sprite('platform'),
             area(),
             solid(),
  ],
  'o' : ()=>[sprite('hole'),
             area(),
             scale(2),
             "next"
  ],
})



const player = add([
    sprite("luigi"),
    pos(80, 60),
    area(),
  body()
])

const mewigi = add([
    sprite("mewigi"),
  scale(0.6),
    pos(20,60),
    area(),
     follow(player, vec2(10, -10)),

])


player.onUpdate(() => {
	camPos(player.pos)
}) 

  player.collides("dangerous", ()=>
  {
    player.destroy();
    mewigi.destroy();
  })

  player.collides('points', (p) => {
    destroy(p)
    score.value++
    score.text = score.value
  })

    player.collides('dangerous', (d) => {
    destroy(player)
  })

  player.onUpdate(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })

keyDown('right', ()=> {
  player.move(MOVE_SPEED, 0);
  player.flipX(false);
  mewigi.flipX(false);
  
})

keyDown('left', ()=> {
  player.move(-MOVE_SPEED, 0);
  player.flipX(true);
  mewigi.flipX(true);
})

//enemy-related

onUpdate('ghost', (h) =>{
  if (h.pos.y <= 200){hspeed = 50} 
  else if (h.pos.y >= 230) {hspeed = -50}
  h.move(0, hspeed)
  }
)

//bullet-related
keyDown('left', ()=>{
  BULLET_SPEED = -400;
})

keyDown('right', ()=>{
  BULLET_SPEED = 400;
})

keyPress('e', () => {
  spawnBullet(mewigi.pos.add(20,0))
})

function spawnBullet(p) {
  add([
    sprite('bullet') ,
    pos(p), 
    area(),
    origin('center'),
    'bullet',
    {speed: BULLET_SPEED}
    
  
    ])
}
  
onUpdate('bullet', (b) =>{
      b.move(b.speed,0)
      if (b.speed < 0){
        b.flipX(true);
      }
    if(b.pos.x < 0 || b.pos.x > width){
      destroy(b)
  }
}
)

onCollide('bullet', 'ghost', (b,h)=> {
  destroy(b)
  destroy(h)
  score.value++
  score.text = score.value
}) 


player.collides("next", ()=>
  {
    console.log("level")
  })

  

})





//player-related


//misc
const score = add([
   text('0'),
   pos(10,10),
  layer('ui'),
   fixed(),
  {
     value: 0,
   }
 ])




function start() {
	go("game", {
		levelIdx: 0,
		score: 0,
	})
}
start()