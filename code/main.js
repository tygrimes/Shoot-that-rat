 //setup
import kaboom from "kaboom"

// initialize context
kaboom()


// load sprites
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
loadPedit("mute", "sprites/mute.pedit");
loadPedit("mutearrow", "sprites/mutearrow.pedit");
loadPedit("musicmute", "sprites/musicmute.pedit");
loadPedit("heart", "sprites/heart.pedit");
loadPedit("yeground", "sprites/yeground.pedit");
loadSprite("goodmorning", "sprites/goodmorning.png");
loadPedit("ammopouch", "sprites/ammopouch.pedit");


//load sounds
loadSound("shoot", "sounds/gunshot.mp3");
loadSound("ghostdeath", "sounds/ghostdeath.mp3");
loadSound("click", "sounds/gunclick.mp3");
loadSound("load", "sounds/gunload.mp3");
loadSound("AWP", "sounds/AWP.mp3");
loadSound("jump", "sounds/jump.mp3");
loadSound("coinpickup", "sounds/coinpickup.mp3");
loadSound("spookymusic", "sounds/spookymusic.mp3");
loadSound("bossshot", "sounds/bossshot.mp3");
loadSound("yoitskanyewest", "sounds/yoitskanyewest.wav");
loadSound("tube", "sounds/tube.mp3");
loadSound("goodnight", "sounds/goodnight.mp3");
loadSound("scream", "sounds/scream.mp3");
loadSound("maxammo", "sounds/;Max_ammo_sound_effect_(getmp3.pro).mp3")

//load variables and consts
const MOVE_SPEED = 310;
const JUMP_FORCE = 500;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let lives = [];
let BULLET_SPEED = 400;
let DBULLET_SPEED = 10;
let score = 0;
let hspeed = -50;
let ammo = 6;
let ENEMY_SPEED = 200;
let bmuted = false;
let volmod = 0;
let hx = 10;
let musicVol = 0;
let hearts = 3;

//level music


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
   '?                      ?  ',
   '?                      ?  ',
   '?                      ?  ',
   '?               a    o ?  ',
   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
   'dudddddddddduddddddddddddd',
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
  '?U                                            ?',
  '?                                             ?',
  '?                                             ?',
  '?                             T              ?',
  '?                 T      h   p               ?',
  '?           T     pp     p                    ?',
  '?           p      d h h h d                    ?',
  '?                  d       dd                  ?',
  '?  g     h    p    dd      ddd      h      o    g ?',
  '___-____----__---_-d_---__-_-______--__---____?',
  'dddddddudddududdddudddddduddddddduddududddduddd',
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
      [
  '?U                                             ?',
  '?                                              ?',
  '?         T  h      g     T                    ?',
  '?   p     p    p   pp     _                    ?',
  '?   T                    -d                    ?',
  '?   p     T             -dd                    ?',
  '?         p           -_dud                    ?',
  '?      h              dudddd-   h    h     h   ?',
  '?   g         g       ddddddd-_    T     T   o ?',
  '___-____----__---_-__-ddddudddd----_-__---_-__-',
  'dddddddudddududddduddddddudddddddduddduddddduddu',
  ],
]


scene("game", ({levelIdx}) => {

  layers(['bg', 'obj', 'ui'], 'obj')

//   var background = (x,y) => {
//     add([
//      scale(2),
//      sprite("bg"),
//      pos(x,y),
//      area(),
//     ])
//   }
// background(-500, -200)
  

	const level = addLevel(LEVELS[levelIdx || 0], {
  height: 35,
  width: 40,
  'x' : ()=>[
    sprite('ground'),
    solid(), 
    area(),
    "impassable"
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
    "impassable"
  ],
  'u' : ()=>[
    sprite('deepground'),
    area(),
    solid(),
    "impassable"
  ],
  'T' : ()=>[
    sprite('tooth'),
    area(), 
    "points",
  ],
  'p' : ()=>[
    sprite('platform'),
    area(),
    solid(),
    "impassable"
  ],
  'o' : ()=>[
    sprite('hole'),
    area(),
    scale(2),
    body(),
    "next"
  ],
  '?' : ()=>[
    sprite('invis'),
    area(),
    body(),
    solid(),
    "impassable"
  ],
  '_' : ()=>[
    sprite('lvl2ground'),
    area(),
    solid(),
    "impassable"
  ],
  '-' : ()=>[
    sprite('newground2'),
    area(),
    solid(),
    "impassable",
  ],
      'U' : ()=>[
    sprite('hole'),
    area(),
    solid(),
    scale(4),
    "entry"
  ],
    's' : ()=>[
    sprite('secret'),
    area(),
    solid(),
           
  ], 
    'a' : ()=>[
    sprite('ammopouch'),
    area(),
    solid(),
    body(),
    scale(2),
    "ammogains",   
  ],
})

//sprite flips and quick adds
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

  const music = play("spookymusic", {
	loop: true,
  volume: musicVol
})

  //UI text
  
  add([
    text('Score:',{
      size: 30
    }),
    pos(10,30), 
    layer('ui'),
    fixed(),
    ])
  
  add([
    text('0', {
      size: 30
    }),
    pos(120,30), 
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
    pos(10,60), 
    layer('ui'),
    fixed(),
    ])
  
    add([
    text('0',{
      size: 30
    }),
    pos(100,60), 
    layer('ui'),
    "ammoCount",
    fixed(),
    {value: ammo}
    ])


  onUpdate('ammoCount', (ac) =>{
    ac.text = ammo;
  }
  );

  const heart = add([
  sprite("heart"),
  scale(2),
  pos(hx,90),
  layer('obj'),
  area(),
  fixed()
])

  add([
    text(':',{
      size: 30
    }),
    pos(40,85), 
    layer('ui'),
    fixed(),
    ])

  
    add([
    text('3',{
      size: 30
    }),
    pos(55,85), 
    layer('ui'),
    "heartcount",
    fixed(),
    ])


onUpdate('heartcount', (hc) =>{
    hc.text = hearts;
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
  health(3),
])

// onUpdate(() => {
//     hearts = player.health
// })

  

const mewigi = add([
    sprite("mewigi"),
    scale(0.6),
    pos(20,60),
    follow(player, vec2(10, -10)),
    layer('obj'),

]) 

  const muteButton = add([
    sprite('mute'),
    scale(1),
    pos(10,5),
    layer('obj'),
    fixed(),
    area(),
    "button"
  ])

  const musicMute = add([
    sprite('musicmute'),
    scale(1.1),
    pos(35,5),
    layer('obj'),
    fixed(),
    area(),
    "mbutton"
  ])
  
  
  onClick("button", ()=>{
    bmuted = true
    const muteline = add([
    sprite('mutearrow'),
    scale(1),
    pos(11,6),
    layer('obj'),
    fixed(),
    area(),
    "muted",
    
  ])
  })

  onClick("mbutton", ()=>{
    musicVol = musicVol - 0.2;
    const muteline = add([
    sprite('mutearrow'),
    scale(1),
    pos(36,6),
    layer('obj'),
    fixed(),
    area(),
  ])
  })

   player.collides("entry", ()=>{
   if(levelIdx == 2){
     go("kanye");
   }
 })

  
if (levelIdx == 1){
let dentist = add([
  sprite("dentist"),
  pos(300,40),
  scale(2.2),
  area(),
  solid(),
  body(),
  health(5),
  state("move",["idle","attack","move"]),
])

  dentist.onStateEnter("idle", async () => {
	await wait(0.5)
    dentist.enterState("attack")
})

dentist.onStateEnter("attack", async () => {
const dshot = play("AWP", {
      volume: 0.1 + volmod,
    })
	if (player.exists()) {

		const dir = player.pos.sub(dentist.pos).unit()

    if(player.pos.x < dentist.pos.x){
      DBULLET_SPEED = -900;
    }else if(player.pos.x > dentist.pos.x){
      DBULLET_SPEED = 900;
    }

		add([
			pos(dentist.pos.x,dentist.pos.y + 10),
			move(dir.x, DBULLET_SPEED),
			sprite("bullet"),
			area(),
			cleanup(),
			origin("center"),
      "dangerous",
			"dbullet",
		])

//if()
  
	}

	await wait(1)
	dentist.enterState("move")

})

dentist.onStateEnter("move", async () => {
	await wait(2)
	dentist.enterState("idle")
})

dentist.onStateUpdate("move", () => {
	if (!player.exists()) return
	const dir = player.pos.sub(dentist.pos).unit()
	dentist.move(dir.scale(ENEMY_SPEED))
})
dentist.enterState("move")

  dentist.collides('bullet', (b)=>{
  const bhurt = play("bossshot", {
      volume: 0.5 + volmod,
    })
  destroy(b);
  dentist.hurt(1);
})

 dentist.on("death",()=>{
  destroy(dentist);
  score = score + 5;
  play ("ghostdeath")
  }) 

}
player.onUpdate(() => {
	camPos(player.pos)
}) 

  player.collides("dangerous", ()=>{
   player.hurt(1);
   hearts = hearts - 1;
    const phurt = play("scream", {
      volume: 1 + volmod,
    })
  })

  player.on("death", ()=>{
     player.destroy();
    mewigi.destroy();
    go("lose")
  })

  player.collides('points', (p) => {
    destroy(p)
    score = score + 1;
    const spoint = play("coinpickup", {
      volume: 1 + volmod,
    })
  })

  player.collides("ammogains", (a)=>{
    ammo = ammo + 6;
    destroy(a);
    const ammog = play("maxammo", {
      volume: 0.5 + volmod,
    })
  })
  
  player.collides("next", () => {
    ammo = 6;
    const gtube = play("tube", {
      volume: 0.5 + volmod,
    })
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
    const pjump = play("jump", {
      volume: 0.1 + volmod,
    })
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
  const shot = play("shoot", {
    volume: 0.2 + volmod,
  });
  spawnBullet(mewigi.pos.add(20,0))
  } else if (ammo <= 0){
    const mfire = play("click", {
      volume: 1 + volmod,
    })
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

onCollide('bullet', 'ghost', (b,h)=>  {
  destroy(b)
  destroy(h)
    score = score + 1;
    ammo = ammo + 1;
  const mload = play("load", {
      volume: 1 + volmod,
    })
  const gdeath = play("ghostdeath", {
      volume: 0.5 + volmod,
    })
})
  
onCollide('bullet', 'impassable', (b,ip)=> {
  destroy(b)
  
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
})

 scene("kanye", ()=> {
   
   addLevel([
   ' U                        ',
   '                          ',
   '                          ',
   '                          ',
   '                          ',
   '          y               ',
   '                          ',
   '                          ',
   '                          ',
   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
   'xxxxxxxxxxxxxxxxxxxxxxxxxx',
   ],{
     width:35,
    height:40,
     
     'x' : ()=>[
    sprite('yeground'),
    solid(), 
    area(),
  ],
     'y' : ()=>[sprite('goodmorning'),
           area(),
           solid(),
           body(),
           scale(4),
],
     'U' : ()=>[sprite('hole'),
            area(),
            solid(),
            scale(4),
            "entry"
  ],
   })
 
 })


  
    // Press any key to go back
  // onKeyPress(){
  //   start()
  // }





function start() {
	go("game", {
		levelIdx: 0,
	})
  score = 0;
  hearts = 3; 
}

start()