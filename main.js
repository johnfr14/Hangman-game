const fs = require('fs')
const readline = require('readline-sync')
const { randomInt } = require('crypto')
const { HANGMANPICS } = require('./template-hangman')
const { Joueur } = require('./joueur')
const chalk = require('chalk')

do{
  //--------------------------------INTRO-----------------------------------------//
  // initialisation of the mystery word 
  let dico = fs.readFileSync('./dictionnaire', 'utf-8').toLowerCase().split('\n')                     // we recupe all the words in our dictionnary and store them in a array 
  let n = randomInt(0, dico.length)                                                                   // we create an random number as an index to get a random word 
  let mysteryWord = dico[n].split('')                                                                 // ↑                                                         ↑
  let wordAlreadyUsed = []
  let wordToFind = []                                                                                  //
  for (let i = 0; i < mysteryWord.length; i++) {                                                       // Filling the string with underscores when player will find the good letters this will be displayed
    wordToFind.push('_')                                                                               //
  }

  console.log(chalk.bold('BOONjour BONjour tout le monde et bienvenue dans le jeu du PENDU GAME !!!!!!!'))

  // Getting the player's data 
  console.log('\nVeuillez dans un premier temps nous donner votre joli petit nom\n(entre 1 et 20 charactères svp faite pas le forceur)\n')

  let life = 7
  let joueurId = readline.question(chalk.yellow('votre nom: '))
  while (joueurId.length < 1 || joueurId.length > 20) {
    joueurId = readline.question(`\nNope ! entre 1 et 20 charactères\n${chalk.yellow('votre nom: ')}`)
  }
  
  console.log(`\n\nBien Bien Bien ${chalk.yellow(joueurId)}, tu as maintenant ${chalk.green(life)} vies (pas comme les chats) pour trouver le mot très mystère !
Si tu fais ${life} erreurs, tu seras...... MORT !!!!!\n\nà toi de jouer`)







  //-----------------------------START GAME------------------------------------//
  let h = 0
  while (life && wordToFind.includes('_')) {
    // displaying the hanging
    console.log(chalk.blackBright(HANGMANPICS[h]))

    // Player choose a letter (very stressful !!!!)
    let letter = ''
    console.log(`Le mot : ${wordToFind.join(' ')}\t\tvie restant : ${life > 5 ? chalk.green(life) : life < 3 ? chalk.red(life) : chalk.yellow(life)}`)
    console.log(`Lettre déjà utilisé : ${wordAlreadyUsed}\n`)

    letter = readline.question('Votre lettre : ').toLowerCase()
    while (letter < 'a' || letter > 'z' || letter.length !== 1) {
      letter = readline.question(`NOPE ! ne choisissez qu\'une lettre entre 'a' et 'z' !!!!\n${chalk.yellow('Votre lettre : ')}`).toLowerCase()
    }

    // check if the letter match ones of the mystery word
    for (let i = 0; i < mysteryWord.length; i++) {
      mysteryWord[i] === letter ? wordToFind[i] = letter : '' 
    }

    if (mysteryWord.includes(letter)) {
      console.log('\nBien joué !!!\n')
    } else {
      life--
      h++
      console.log(`\nAie aie aie ! coups dure pour le joueur français !\n-1 point il ne vous reste que ${life} vies\n`)
    }
    wordAlreadyUsed.push(letter)
    wordAlreadyUsed.sort()
  }





  //------------------------------END OF THE GAME---------------------------------//
  // We save the score if new high score !!!

  // Start again ?
  for (let i = 0; i < 20; i++) {
    console.log('')
  }

  if (life) {
    console.log(chalk.green('YOU WIN !!!'))
    console.log(`Le mot était bien : ${mysteryWord.join('')} !!!!!\n\n`)
  } else {
    console.log(chalk.red('GAME OVER !'))
    console.log(`Le mot était : ${mysteryWord.join('')}\n\n`)
  }
} while (readline.keyInYN('Voulez-vous rejouer ?'))