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
loadPedit("invis", "sprites/invis.pedit");
loadPedit("lvl2ground", "sprites/lvl2ground.pedit");
loadPedit("newground2", "sprites/newground2.pedit");
loadPedit("secret", "sprites/secret.pedit");
loadPedit("dentist", "sprites/dentist.pedit");


let BULLET_SPEED = 1000;
let score = 0;
const MOVE_SPEED = 310;
const JUMP_FORCE = 500;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let hspeed = -50;
let ammo = 6;


//LEVELS TEMPLATE
//  [  
//   '?U                     ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   '?                      ?  ',
//   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
//   'dudddddddddduddddddddddddd',
// ], 
    const LEVELS = [

  [  
   '?U                     ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?        g      T   o  ?  ',
   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
   'dudddddddddduddddddddddddd',
 ], 
   [  
   '?U                     ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?           D           ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
   'dudddddddddduddddddddddddd',
], 
           [
  '?U                                             ?',
  '?                                              ?',
  '?         T  h      g     T                    ?',
  '?   p     p    p   pp     d                    ?',
  '?   T                    dd                    ?',
  '?   p     T             ddd                    ?',
  '?         p           dddud                    ?',
  '?      h              duddddd   h    h     h   ?',
  '?   g         g       dddddddu_    T     T   o ?',
  '___-____----__---_-dudddddudddd----_-__---_-__-',
  'dddddddudddududddduddddddudddddddduddduddddduddu',
  ],
  [  
  '?U                     ?  ',
  '?    sss s             ?  ',
  '?                      ?  ',
  '?         s            ?  ',
  '?             T        ?  ',
  '?          T  p        ?  ',
  '?  T    T  p           ?  ',
  '?     h p   h          ?  ',
  '?     g     g       o  ?  ',
  'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  'dudddddddddduddddddddddddd',
], 
[
  '?U                       ?',
  '?                        ?',
  '?                        ?',
  '?             h          ?',
  '?             g          ?',
  '?          T  p          ?',
  '?  T  p  p               ?',
  '?  p  h  h        h   h  ?',
  '?p    g  g        g o g  ?',
  '___-____----__---_-__---__',
  'dddddddudddududddduddddddu',
], 
   [
  '?U                       ?',
  '?                        ?',
  '?                        ?',
  '?                        ?',
  '?                        ?',
  '?          T  p          ?',
  '?  T    T  p             ?',
  '?     h p   h            ?',
  '?     g     g       o    ?',
  '___-____----__---_-__---__',
  'dddddddudddududddduddddddu',   
  ],
  
]
scene("game", ({levelIdx}) => {

  layers(['bg', 'obj', 'ui'], 'obj')
  

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
    area(),
    solid(),
  ],
  'u' : ()=>[sprite('deepground'),
             area(),
             solid(),
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
             body(),
             "next"
  ],
  '?' : ()=>[sprite('invis'),
             area(),
             body(),
             solid()
  ],
  '_' : ()=>[sprite('lvl2ground'),
            area(),
             solid()
  ],
  '-' : ()=>[sprite('newground2'),
            area(),
             solid()
  ],
      'U' : ()=>[sprite('hole'),
            area(),
            solid(),
            scale(4),
            "entry"
  ],
    's' : ()=>[sprite('secret'),
            area(),
            solid(),
  ], 
    'D' : ()=>[sprite('dentist'),
            area(),
            solid(),
            scale(3),
            body(),
  ],
})


onUpdate('entry', (e) =>{
        e.flipY(true);
      }
)


 add([ 
  sprite("bg", 
    {width: width() * 2, 
     height: height() * 2}),
  layer('bg'),
  ]);

    add([
    text('Score:',{
      size: 30
    }),
    pos(10,20), 
    layer('ui'),
    fixed(),
    ])
  
  add([
    text('0', {
      size: 30
    }),
    pos(120,20), 
    layer('ui'),
    "fuck",
    fixed(),
    {value: score}
    ])

  onUpdate('fuck', (f) =>{
    f.text = score;
  }
);


    add([
    text('Ammo:',{
      size: 30
    }),
    pos(10,50), 
    layer('ui'),
    fixed(),
    ])
  
    add([
    text('0',{
      size: 30
    }),
    pos(100,50), 
    layer('ui'),
    "ammoCount",
    fixed(),
    {value: ammo}
    ])


onUpdate('ammoCount', (ac) =>{
    ac.text = ammo;
  }
);




  if (levelIdx == 0){
  add([
  		text(`Use the arrow keys to move left and right`, {
  			width: 150,
        size: 20,
  		}),
  		pos(24, 180),
      layer('bg'),
  	])

add([
  		text(`Press space to overcome jeff bezos's grave`, {
  			width: 150,
        size: 20,
      }),
  		pos(400, 180),
      layer('bg')
  	])

  add([
  		text(`Collect teeth to raise your score!`, {
  			width: 150,
        size: 20,
  		}),
  		pos(600, 180),
      layer('bg'),
  	])
    
  add([
		text(` To the next level`, {
 			width: 150,
       size: 20,
 		}),
 		pos(800, 240),
    layer('bg'),
 	])
}

  if (levelIdx == 1){
      add([
  		text(`Luigi is deathly afraid of ghosts! Press E to get Mewigi to utilize the second amendment`, {
  			width: 230,
        size: 15,
  		}),
  		pos(24, 180),
      layer('bg'),
  	])
  }

 const player = add([
    sprite("luigi"),
    pos(80, 30),
    area(),
  body(),
  layer('obj'),
])

const mewigi = add([
    sprite("mewigi"),
    scale(0.6),
    pos(20,60),
    follow(player, vec2(10, -10)),
    layer('obj'),

]) 


  
 
player.onUpdate(() => {
	camPos(player.pos)
}) 

  player.collides("dangerous", ()=>
  {
    player.destroy();
    mewigi.destroy();
    go("lose")
  })

  player.collides('points', (p) => {
    destroy(p)
    score = score + 1;
  })

  player.collides("next", () => {
    ammo = 6;
		if (levelIdx < LEVELS.length - 1) {
			go("game", {
				levelIdx: levelIdx + 1,
			})
		} else {
			go("win")
		}
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
  BULLET_SPEED = -1000;
})

keyDown('right', ()=>{
  BULLET_SPEED = 1000;
})

keyPress('e', () => {
  if (ammo > 0) {
  ammo = ammo -1;
  spawnBullet(mewigi.pos.add(20,0))
  }
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
    score = score + 1;
    ammo = ammo + 1;
}) 

})







//scene defs

scene("win", () => {

	add([
		text(`You ripped out ${score} teeth!!! They will make a fine addition to your collection.`, {
			width: 300,
      size: 30,
		}),
		pos(12),
	])

})

scene("lose", () => {

    add([
        text("Luigi never made it to his dentist appointment. The police never found a body, nor did they find his cat. The mystery goes unsolved to this very day.(Press any key to try again)", {
          width: 500,
          size: 30,
        }),
        pos(12),
    ])

  
    // Press any key to go back
    onKeyPress(start)
  })





function start() {
	go("game", {
		levelIdx: 0,
	})
  score = 0;
}

start()