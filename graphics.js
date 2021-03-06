const ctx = require('axel');

let tree = require('tree-kit');
let termkit = require('./node_modules/terminal-kit/lib/termkit.js');
let term = termkit.terminal;

const gfx = {
  drawInterface: () => {

    term.clear() ;

    const background = termkit.ScreenBufferHD.create({ dst: term , width: 80 , height: 24 }) 
    background.fill({ attr: {bgR: 51 , bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
    background.draw() ;

    const frame = termkit.ScreenBufferHD.create({ dst: term , width: 80 , height: 1 }) 
      frame.fill({ attr: {bgR: 0 , bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
      frame.x = 1 ,
      frame.y = 1 ,
      frame.draw() ;
   
      frame.x = 1 ,
      frame.y = 24 ,
      frame.draw() ;

    const frame2 = termkit.ScreenBufferHD.create({ dst: term , width: 1 , height: 22 }) 
      frame2.fill({ attr: {bgR: 0 , bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
      frame2.x = 1 ,
      frame2.y = 2 ,
      frame2.draw() ;

      frame2.x = 80 ,
      frame2.y = 2 ,
      frame2.draw() ;

      frame2.x = 57 ,
      frame2.y = 2 ,
      frame2.draw() ;

    const frame3 = termkit.ScreenBufferHD.create({ dst: term , width: 23 , height: 1 }) ; 
      frame3.fill({ attr: {bgR: 0 , bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
      frame3.x = 57 ,
      frame3.y = 16 ,
      frame3.draw() ;

    term('\n') ;
    
    let commands = termkit.ScreenBuffer.create( { dst: term } ) ; 

    commands.put( {
	    x: 62 , y: 1 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      'Command list:') ;
      commands.draw() ;

    commands.put( {
      x: 64 , y: 3 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      '⇧    Up') ;
      commands.draw() ;

    commands.put( {
      x: 64 , y: 5 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      '⇩    Down') ;
      commands.draw() ;

    commands.put( {
      x: 64 , y: 7 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      '⇦    Left') ;
      commands.draw() ;

    commands.put( {
      x: 64 , y: 9 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      '⇨    Right') ;
      commands.draw() ;

    commands.put( {
      x: 64 , y: 11 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      '_    Enter') ;
      commands.draw() ;

    commands.put( {
      x: 62 , y: 13 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      'ESC    Menu') ;
      commands.draw() ;

    commands.put( {
      x: 59 , y: 17 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      'Level: ') ;
      commands.draw() ;

    commands.put( {
      x: 59 , y: 19 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      'Time: ') ;
      commands.draw() ;

    commands.put( {
      x: 59 , y: 21 ,
      attr: { color: 'yellow' , bgR: 0 , bgG: 0 , bgB: 0, bgA: 0 , bold: true }} , 
      'Remained: ') ;
      commands.draw() ;

    let line = termkit.ScreenBufferHD.create({ dst: term , width: 8 , height: 1 }) ; 
    line.fill({ attr: {bgR: 200 , bgG: 160 ,	bgB: 0 ,	bgA: 125} }) ;
    line.x = 70 ,
    line.y = 18 ,
    line.draw() ;  

    line.fill({ attr: {bgR: 200 , bgG: 160 ,	bgB: 0 ,	bgA: 125} }) ;
    line.x = 70 ,
    line.y = 20 ,
    line.draw() ;  

    line.fill({ attr: {bgR: 200 , bgG: 160 ,	bgB: 0 } }) ;
    line.x = 70 ,
    line.y = 22 ,
    line.draw() ;  
  },

  drawMenu: (levelNum, timer, remainedCell, ) => {
    let level = 'N/A';
    let time = calculateTime(timer);
    if (levelNum === 1) level = 'easy';
    else if (levelNum === 2) level = 'medium';
    else if (levelNum === 3) level = 'hard';
    term.bgColorRgb(200, 160, 0).colorRgb(51, 51, 51).bold.moveTo(71, 18, level.toString());
    term.bgColorRgb(200, 160, 0).colorRgb(51, 51, 51).bold.moveTo(73, 22, remainedCell.toString());
  },

  drawLogo: (x, y) => {

    let logo = termkit.ScreenBuffer.create( { dst: term } ) ; 

    logo.put( {
		x: 3 , y: 3 ,
		attr: { color: 'yellow' , }} , '███████╗██╗   ██╗██████╗  ██████╗ ██╗  ██╗██╗   ██╗') ;
    logo.draw() ;

    logo.put( {
    x: 3 , y: 4 ,
    attr: { color: 'yellow' , }} , '██╔════╝██║   ██║██╔══██╗██╔═══██╗██║ ██╔╝██║   ██║') ;
    logo.draw() ;

    logo.put( {
    x: 3 , y: 5 ,
    attr: { color: 'yellow' , }} , '███████╗██║   ██║██║  ██║██║   ██║█████╔╝ ██║   ██║') ;
    logo.draw() ;

    logo.put( {
    x: 3 , y: 6 ,
    attr: { color: 'yellow' , }} , '╚════██║██║   ██║██║  ██║██║   ██║██╔═██╗ ██║   ██║') ;
    logo.draw() ;
    
    logo.put( {
    x: 3 , y: 7 ,
    attr: { color: 'yellow' , }} , '███████║╚██████╔╝██████╔╝╚██████╔╝██║  ██╗╚██████╔╝') ;
    logo.draw() ;
       
    logo.put( {
    x: 3 , y: 8 ,
    attr: { color: 'yellow' , }} , '╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ') ;
    logo.draw() ;

  },

  drawInfoBar: () => {
    //?
  },

  drawChoosePanel: () => {
  
    const frame = termkit.ScreenBufferHD.create({ dst: term , width: 21 , height: 10 }) 
    frame.fill({ attr: {bgR: 200 , bgG: 160 ,	bgB: 0 ,	bgA: 100} }) ;
    frame.x = 18 ,
    frame.y = 12 ,
    frame.draw() ;

    const line = termkit.ScreenBufferHD.create({ dst: term , width: 21 , height: 1 }) 
    line.fill({ attr: {bgR: 255 , bgG: 255 ,	bgB: 255 ,	bgA: 125} }) ;
    line.x = 18 ,
    line.y = 12 ,
    line.draw() ;

  },

  printGametype: (select) => {
    let menu = termkit.ScreenBuffer.create({ dst: term });
    menu.put( {
		x: 17 , y: 11 ,
		attr: {color: 'black' , bgColor: 'brightWhite' } }  , '  Choose boardsize:  ') ;
    menu.draw() ;

    if (select === 1) {
      menu.put( {
        x: 20 , y: 13 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   2 x 2 [4]   ') ;
    } else {
      menu.put( {
        x: 22 , y: 13 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' 2 x 2 [4]') ;
    } 
    menu.draw() ;

    if (select === 2) {
      menu.put( {
        x: 20 , y: 16 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   3 x 3 [9]   ') ;
    } else {
      menu.put( {
        x: 22 , y: 16 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' 3 x 3 [9] ') ;
    }

    menu.draw() ;
    if (select === 3) {
      menu.put( {
        x: 21 , y: 19 ,
        attr: {color: 'white' , bgColor: 'black' } } , '  4 x 4 [16]  ') ;
    } else {
      menu.put( {
        x: 22 , y: 19 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' 4 x 4 [16] ') ;
     }
     menu.draw() ;
  
  },

  printLevel: (select) => {
    let menu = termkit.ScreenBuffer.create({ dst: term });

    menu.put( {
		x: 17 , y: 11 ,
		attr: {color: 'black' , bgColor: 'brightWhite' } }  , '    Choose level:    ') ;
    menu.draw() ;
    
    if (select === 1) {
      menu.put( {
        x: 22 , y: 13 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   EASY   ') ;
    } else {
      menu.put( {
        x: 24 , y: 13 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' EASY ') ;
    } 
    menu.draw() ;
    if (select === 2) {
      menu.put( {
        x: 21 , y: 16 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   MEDIUM   ') ;
    } else {
      menu.put( {
        x: 23 , y: 16 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' MEDIUM ') ;
    }

    menu.draw() ;

    if (select === 3) {
      menu.put( {
        x: 22 , y: 19 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   HARD   ') ;
    } else {
      menu.put( {
        x: 24 , y: 19 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' HARD ') ;
     }
     menu.draw() ;
  },

  printMenu: (select) => {
    let menu = termkit.ScreenBuffer.create( { dst: term } ) ; 

    menu.put( {
		x: 17 , y: 11 ,
		attr: {color: 'black' , bgColor: 'brightWhite' } }  , '   Info Window:   ') ;
    menu.draw() ;
    
    if (select === 1) {
      menu.put( {
        x: 21 , y: 13 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   New Game   ') ;
    } else {
      menu.put( {
        x: 23 , y: 13 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' New Game ') ;
    } 
    menu.draw() ;
    if (select === 2) {
      menu.put( {
        x: 21 , y: 16 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   New Game   ') ;
    } else {
      menu.put( {
        x: 23 , y: 16 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' New Game ') ;
    }
    menu.draw() ;
    if (select === 3) {
      menu.put( {
        x: 21 , y: 19 ,
        attr: {color: 'white' , bgColor: 'black' } } , '   Exit Game   ') ;
    } else {
      menu.put( {
        x: 23 , y: 19 ,
        attr: {color: 'black' , bgColor: 'yellow' } } , ' Exit Game ') ;
     }
     menu.draw() ;
  },

  drawGameBoard: (gameBoard, fixed) => {

    switch (gameBoard.length) {
      case 4:
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            let x = 11 + (21 * j);
            let y = 4 + (11 * i);
            if ((i + j) % 2 === 0) { 
              let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 16 , height: 8 }) ; 
                grayBg.fill({ attr: {bgR: 153, bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
                grayBg.x = x ,
                grayBg.y = y ,
                grayBg.draw() ;

            } else {
              let grayBg = termkit.ScreenBufferHD.create({ dst: term, width: 16, height: 8 });
              grayBg.fill({ attr: { bgR: 102, bgG: 102, bgB: 102, bgA: 125 } });
              grayBg.x = x,
                grayBg.y = y,
                grayBg.draw();
            }
          }
        }
        break;
      case 9:
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let x = 10 + (13 * j);
            let y = 3 + (7 * i);
            if ((i + j) % 2 === 0) { 
              let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 13 , height: 7 }) ; 
                grayBg.fill({ attr: {bgR: 153, bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
                grayBg.x = x ,
                grayBg.y = y ,
                grayBg.draw() ;
              } else {
            let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 13 , height: 7 }) ; 
            grayBg.fill({ attr: {bgR: 102 , bgG: 102 ,	bgB: 102 ,	bgA: 125} }) ;
            grayBg.x = x ,
            grayBg.y = y ,
            grayBg.draw() ;

            }
          }
        }
        break;
      case 16:
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let x = 3 + (13 * j);
            let y = 3 + (5 * i);

            if ((i + j) % 2 === 0) { 
              let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 12 , height: 6 }) ; 
                grayBg.fill({ attr: {bgR: 102, bgG: 102 ,	bgB: 102 ,	bgA: 125} }) ;
                grayBg.x = x ,
                grayBg.y = y ,
                grayBg.draw() ;
              } else {
            let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 12 , height: 6 }) ; 
            grayBg.fill({ attr: {bgR: 153 , bgG: 153 ,	bgB: 153 ,	bgA: 125} }) ;
            grayBg.x = x ,
            grayBg.y = y ,
            grayBg.draw() ;
           }
          }
        }
        
        let grayBg = termkit.ScreenBufferHD.create({ dst: term , width: 53 , height: 1 }) ; 
            grayBg.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg.x = 2 ,
            grayBg.y = 3 ,
            grayBg.draw() ;

            grayBg.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg.x = 2 ,
            grayBg.y = 8 ,
            grayBg.draw();

            grayBg.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg.x = 2 ,
            grayBg.y = 13 ,
            grayBg.draw();

            grayBg.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg.x = 2 ,
            grayBg.y = 18 ,
            grayBg.draw();

            grayBg.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg.x = 2 ,
            grayBg.y = 23 ,
            grayBg.draw();

        let grayBg2 = termkit.ScreenBufferHD.create({ dst: term , width: 2 , height: 22 }) ; 
            
            grayBg2.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg2.x = 2 ,
            grayBg2.y = 2 ,
            grayBg2.draw() ;
        
            grayBg2.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg2.x = 15 ,
            grayBg2.y = 2 ,
            grayBg2.draw() ;

            grayBg2.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg2.x = 28 ,
            grayBg2.y = 2 ,
            grayBg2.draw() ;

            grayBg2.fill({ attr: {bgR: 51, bgG: 51 ,	bgB: 51 ,	bgA: 125} }) ;
            grayBg2.x = 41 ,
            grayBg2.y = 2 ,
            grayBg2.draw() ;
        break;
    }

    for (let j = 0; j < gameBoard.length; j++) {
      for (let i = 0; i < gameBoard.length; i++) {
        let m = gfx.calcPosition(i, j, gameBoard.length)[0];
        let n = gfx.calcPosition(i, j, gameBoard.length)[1];
        let sectionX = Math.floor(i / Math.sqrt(gameBoard.length));
        let sectiony = Math.floor(j / Math.sqrt(gameBoard.length));

        if ((sectionX + sectiony) % 2 === 0) {
          let grayBg = termkit.ScreenBufferHD.create({ dst: term, width: 1, height: 1 });
          grayBg.fill({ attr: { bgR: 102, bgG: 102, bgB: 102, bgA: 255 } });
          grayBg.draw();
        } else {
          let grayBg = termkit.ScreenBufferHD.create({ dst: term, width: 1, height: 1 });
          grayBg.fill({ attr: { bgR: 153, bgG: 153, bgB: 153, bgA: 255 } });
          grayBg.draw();
        }

        switch (gameBoard.length) {
          case 4:
            ctx.box(m - 1, n, 3, 1);
            break;
          case 9: // ok
            ctx.box(m - 1, n, 3, 1);
            break;
          case 16:
            if (parseInt(gameBoard[i][j]) < 10) m++;
            ctx.box(m, n, 1, 1);
            break;
        }
        if (fixed[i][j] !== null) term.colorRgb(0, 0, 0).bold.moveTo(m, n, gameBoard[i][j].toString());
        else term.colorRgb(51, 51, 51).moveTo(m, n, gameBoard[i][j].toString());
      }
    }
  },

  drawCursor: (menuIndex, cursorState, gameBoard) => {
    let x = gfx.calcPosition(cursorState[0], cursorState[1], gameBoard.length)[0];
    let y = gfx.calcPosition(cursorState[0], cursorState[1], gameBoard.length)[1];
    ctx.bg(204, 153, 0);
    ctx.fg(0, 0, 0);
    let value = gameBoard[cursorState[0]][cursorState[1]].toString();
    switch (menuIndex[0]) {
      case 1:
        ctx.box(x - 2, y, 5, 1);
        ctx.text(x, y, value);
        break;
      case 2:
        ctx.box(x - 1, y, 3, 1);
        ctx.text(x, y, value);
        break;
      case 3:
        ctx.box(x, y, 2, 1);
        if (value.length > 1) ctx.text(x, y, value);
        else ctx.text(x + 1, y, value);
        break;
    }
    ctx.cursor.restore();
  },

  calcPosition: (x, y, tableLength) => {
    let m = 0;
    let n = 0;
    let gfxPos = [];
    switch (tableLength) {
      case 4:
        m = 15 + (7 * x) + ((Math.floor(x / 2) * 7));
        n = 6 + (3 * y) + ((Math.floor(y / 2) * 5));
        break;
      case 9: // ok
        m = 12 + (4 * x) + ((Math.floor(x / 3) * 1));
        n = 4 + (2 * y) + ((Math.floor(y / 3) * 1));
        break;
      case 16:
        m = 4 + (3 * x) + ((Math.floor(x / 4) * 1));
        n = 4 + (y) + ((Math.floor(y / 4) * 1));
        break;
    }
    gfxPos.push(m, n);
    return gfxPos;
  },

  exitQuestion: (state) => {
    let exitFrame = termkit.ScreenBufferHD.create({ dst: term, width: 33, height: 6 });
    exitFrame.fill({ attr: { bgR: 255, bgG: 0, bgB: 0, bgA: 125 } });
    exitFrame.x = 12;
    exitFrame.y = 8;
    exitFrame.draw();
    let header1 = termkit.ScreenBuffer.create({ dst: term });
    header1.put({
      x: 13, y: 8, attr: { color: 'black', bgColor: 'brightWhite' }
    }, '  D o   y o u   r e a l l y  ');
    header1.draw();
    let header2 = termkit.ScreenBuffer.create({ dst: term });
    header2.put({
      x: 13, y: 9, attr: { color: 'black', bgColor: 'brightWhite' }
    }, '  w a n t   t o   q u i t ?  ');
    header2.draw();

    let yesBtn = termkit.ScreenBuffer.create({ dst: term });
    let noBtn = termkit.ScreenBuffer.create({ dst: term });
    if (state) {
      yesBtn.put({ x: 15, y: 11, attr: { color: 'black', bgColor: 'white' } }, ' >> Yes << ');
      noBtn.put({ x: 30, y: 11, attr: { color: 'white', bgColor: 'black' } }, '    No    ');
    } else {
      yesBtn.put({ x: 15, y: 11, attr: { color: 'white', bgColor: 'black' } }, '    Yes    ');
      noBtn.put({ x: 30, y: 11, attr: { color: 'black', bgColor: 'white' } }, ' >> No << ');
    }
    yesBtn.draw();
    noBtn.draw();
  }
};

module.exports = gfx;


function calculateTime(second) {
  let time;
  let min, sec;
  min = Math.floor(second / 60);
  sec = second - (min * 60);
  if (sec < 10) time = min + ':0' + sec;
  else time = min + ':' + sec;
  return time;
}
