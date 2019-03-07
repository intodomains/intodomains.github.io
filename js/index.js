//** SCROLL ARROW
function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

let arrow = document.querySelector('.arrow');
if (arrow) {
  arrow.addEventListener('click', () => {
    console.log('11');
    scrollIt(
      0,
      300,
      'easeOutQuad',
      // () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  });
}


//** RESIZE TEXTAREA
(function () {
  function domReady(f) {
    /in/.test(document.readyState) ? setTimeout(domReady, 16, f) : f()
  }

  function resize(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  /* 0-timeout to get the already changed text */
  function delayedResize(event) {
    window.setTimeout(resize, 0, event);
  }

  domReady(function () {
    let textareas = document.querySelectorAll('textarea');

    for (let i = 0, l = textareas.length; i < l; ++i) {
      let el = textareas.item(i);

      el.addEventListener('change', resize, false);
      el.addEventListener('cut', delayedResize, false);
      el.addEventListener('paste', delayedResize, false);
      el.addEventListener('drop', delayedResize, false);
      el.addEventListener('keydown', delayedResize, false);
    }
  })
}());


//** FOCUS ANIMATION
let text = document.querySelector('#text');
if (text) {
  text.addEventListener('focus', () => {
    document.querySelector('.background rect').classList.add('blink');
  });
  text.addEventListener('blur', () => {
    document.querySelector('.background rect').classList.remove('blink');
  });
}

// document.querySelector('#text').addEventListener('input', () => {
//   document.querySelector('.background rect').classList.remove('blink');
// });
// document.querySelector('#text').addEventListener('keypress', () => {
//   if(document.querySelector('#text').value !== ""){
//     document.querySelector('.background rect').classList.remove('blink');
//   }
//   if(document.querySelector('#text').value === ""){
//     document.querySelector('.background rect').classList.add('blink');
//   }
// });

//** GLIDE
let glide = document.querySelector('.glide');
if (glide) {
  new Glide('.glide', {
    type: 'slider',
    startAt: 0,
    perView: 1,
    rewindDuration: 333
  }).mount();
}

//** DROPDOWN
let dropdown = document.querySelector('.dropdown');
let options = document.querySelectorAll('.option');
let dropdown_text = document.querySelector('.dropdown .text');
if (dropdown) {
  document.addEventListener('click', () => {
    if (dropdown.classList.contains('active')){
      dropdown.classList.remove('active');
    }
  });
  dropdown.addEventListener('click', () => {
    event.stopPropagation();
    dropdown.classList.toggle('active');
  });
  Array.prototype.forEach.call(options, option => {
    option.addEventListener('click', () => {
      event.stopPropagation();
      let holder = dropdown_text.innerHTML;
      dropdown_text.innerHTML = option.innerHTML;
      option.innerHTML =  holder;
      dropdown.classList.toggle('active');
    });
  });
}

