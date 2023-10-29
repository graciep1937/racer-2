namespace SpriteKind {
    export const heart = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (info.life() < 3) {
        info.changeLifeBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    mySprite.startEffect(effects.disintegrate, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    mySprite.ay += -10
    info.changeScoreBy(10)
    mySprite.setVelocity(50, -50)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
let heart_life: Sprite = null
let coin: Sprite = null
let baddie: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`cityscape2`)
scroller.scrollBackgroundWithSpeed(-50, 0)
mySprite = sprites.create(assets.image`car`, SpriteKind.Player)
controller.moveSprite(mySprite)
characterAnimations.loopFrames(
mySprite,
assets.animation`car-idle`,
200,
characterAnimations.rule(Predicate.NotMoving)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`car-rolling`,
200,
characterAnimations.rule(Predicate.MovingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`car-reversing`,
200,
characterAnimations.rule(Predicate.MovingLeft)
)
mySprite.setStayInScreen(true)
music.play(music.stringPlayable("E E D F A D A F ", 120), music.PlaybackMode.LoopingInBackground)
info.setScore(0)
info.setLife(3)
forever(function () {
    baddie = sprites.createProjectileFromSide(img`
        f f a a a e e a a 9 9 e e 9 9 9 
        f f a a a a a a a 9 9 9 9 9 9 9 
        a a a a a a a a a 9 9 9 9 9 f f 
        a a a a a a a a a 9 9 9 9 9 f f 
        a a a a a a a a a 9 9 9 9 9 9 9 
        f f a a 3 3 3 3 3 3 3 3 3 9 9 9 
        f f a a 3 4 4 4 4 4 4 4 3 9 f f 
        a a a a 3 4 4 4 4 4 4 4 3 9 f f 
        5 a a a 3 4 4 4 4 4 4 4 3 9 9 5 
        a a a a 3 4 4 4 4 4 4 4 3 9 9 9 
        a a a a 3 4 4 4 4 4 4 4 3 9 f f 
        f f a a 3 3 3 3 3 3 3 3 3 9 f f 
        f f a a a a a 9 9 9 9 9 9 9 9 9 
        a a a a a a a 9 9 9 9 9 9 9 9 9 
        a a a a a a a 9 9 9 9 9 9 9 9 9 
        a a a a a a a 9 9 9 9 9 9 9 9 9 
        `, 50, 0)
    baddie.y = randint(15, 115)
    pause(2000)
})
forever(function () {
    coin = sprites.create(assets.image`coin`, SpriteKind.Food)
    coin.setVelocity(-30, 0)
    coin.setPosition(randint(15, 115), randint(15, 115))
    pause(3000)
})
forever(function () {
    heart_life = sprites.create(assets.image`heart`, SpriteKind.heart)
    heart_life.setVelocity(-30, 0)
    heart_life.setPosition(randint(15, 115), randint(15, 115))
    pause(5000)
})
game.onUpdateInterval(500, function () {
    if (info.score() > 100) {
        scene.setBackgroundImage(assets.image`beach`)
    }
    if (info.score() > 200) {
        scene.setBackgroundImage(assets.image`forest`)
    }
    if (info.score() > 300) {
        scene.setBackgroundImage(assets.image`moon`)
    }
    if (info.score() > 400) {
        scene.setBackgroundImage(assets.image`beach_at_night`)
    }
    if (info.score() > 500) {
        scene.setBackgroundImage(assets.image`snowynight`)
    }
})
