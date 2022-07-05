let hstrokes;
let vstrokes;
let max_strokes;
let min_strokes;
let alphabet_size;

let seed;

let char_w;
let off_x;
let off_y;
let tot_w;
let tot_h;
let xlim;
let ylim;
let l2r;
let regularity;

let textarea, da_form;
let count_span;

function setup() {
  let box = document.querySelector('#text_')

  let width = int(box.offsetWidth)
  let height = int(box.offsetHeight)
  createCanvas(width, height);

  background(255)

  char_w = width/20
  off_x = width*0.1
  off_y = height*0.1
  tot_w = width*0.8
  tot_h = height*0.8

  xlim = int(tot_w/char_w)
  ylim = int(xlim*0.9)

  textarea = document.getElementById('user_input')
  da_form = document.getElementById('da_form')
  da_form.reset()

  let tmp = textarea.value
  textarea.value = tmp.slice(0, xlim*ylim)
  textarea.setAttribute('maxlength', xlim*ylim)

  count_span = document.getElementById('counter')
  count_span.innerHTML = xlim*ylim - 1
  textarea.addEventListener("keyup", doStuff);
  textarea.addEventListener("keydown", count);

  changeParams()
}

function count(e){
  var len =  textarea.value.length;
  if (len >= xlim*ylim){
  } else{
    count_span.innerHTML = xlim*ylim - len-1;
  }
  doStuff()
}

function doStuff(e){
  background(255)

  let _text = textarea.value

  randomSeed(seed)
  writeText(_text, xlim, ylim, tot_w, tot_h, off_x, off_y, color(0), 3, seed, l2r, regularity)
}

function changeParams(){
  seed = Math.random()*Number.MAX_SAFE_INTEGER
  l2r = random(1) < 0.5
  regularity = random(1)*0.2

  hstrokes = 2 + Math.floor(Math.random()*4)
  vstrokes = 2 + Math.floor(Math.random()*4)
  max_strokes = 2 + Math.floor(Math.random()*3)
  min_strokes = 1
  alphabet_size = 15 + Math.floor(16*Math.random())

  document.getElementById('settings').innerHTML =
    `current: ${l2r ? 'left to right' : 'right to left'},
    ${hstrokes}x${vstrokes} grid,
    ${min_strokes}-${max_strokes} strokes,
    alphabet size ${alphabet_size}`

  doStuff()
}

function writeText(source, xlim, ylim, w, h, off_x, off_y, color, _stroke, seed, l2r, regularity){
  source = source.toUpperCase()
  noiseSeed(seed)

  let start = l2r ? 0 : xlim-1;
  let i = start
  let j = 1;
  let capital = true
  let ignore = [',', '.', ':', ';', '\t', '!', '?']

  for(let x = 0; x < source.length; x++){
    if (ignore.includes(source[x])) continue

    if (l2r && i == xlim) j += 1
    else if (!l2r && i == -1) j += 1

    if (j == ylim+1) break
    i += xlim
    i %= xlim
    if (source[x] == '\n'){
      j++
      i = start
      capital = true
      continue
    }
    if (source[x] == ' '){
      i += l2r ? 1 : -1
      continue
    }

    let c = source.charCodeAt(x);
    c %= alphabet_size
    letter(i*w/xlim + w/(2*xlim) + off_x + char_w*(0.5-random())*regularity,
      j*h/ylim - h/(2*ylim) + off_y + char_w*(0.5-random())*regularity,
      w/(2*xlim) - w/(5*xlim) + char_w*(0.5-random())*regularity,
      h/(2*ylim) - h/(10*ylim) + char_w*(0.5-random())*regularity,
      c*100, color, _stroke)

    i += l2r ? 1 : -1

    capital = false
  }
}


function letter(x, y, w, h, seed, color, _stroke){
  randomSeed(seed)
  stroke(color)
  strokeWeight(_stroke)
  noFill()

  let count = 0
  while(count < min_strokes){
    let xoffset = 2*w/(vstrokes-1)
    let yoffset = 2*h/(hstrokes-1)
    for(let i = 0; i < hstrokes; i++){
      let yy = y + i*yoffset - h
      for(let j = 0; j < vstrokes; j++){
        if (count == max_strokes) break
        if(random(1) < 0.8) continue
        count++
        let xx = x + j*xoffset - w
        let xs = sshuffle([xx, xx, x-w, x+w])
        let ys = sshuffle([yy, yy, y-h, y+h])
        let coords = []
        for(let t = 0; t < xs.length; t++){
          coords.push(xs[t])
          coords.push(ys[t])
        }
        bezier(...coords)
      }
      if (count == max_strokes) break
    }
  }
}
function sshuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

