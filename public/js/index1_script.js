function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 });
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener("resize", resize);
  }

  var  sphereAnimation =(function() {
    var sphereEl = document.querySelector(".sphere-animation");
    var spherePathEls = sphereEl.querySelectorAll(".sphere path");
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var animations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
      begin: function () {
        for (var i = 0; i < pathLength; i++) {
          animations.push(
            anime({
              targets: spherePathEls[i],
              stroke: {
                value: ["rgba(255,75,75,1)", "rgba(80,80,80,.35)"],
                duration: 500,
              },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: "easeOutQuad",
              autoplay: false,
            })
          );
        }
      },
      update: function (ins) {
        animations.forEach(function (animation, i) {
          var percent =
            (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false,
    });

    var introAnimation = anime
      .timeline({
        autoplay: false,
      })
      .add(
        {
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: "easeInOutCirc",
            delay: anime.stagger(190, { direction: "reverse" }),
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: "reverse" }),
          easing: "linear",
        },
        0
      );

    var shadowAnimation = anime(
      {
        targets: "#sphereGradient",
        x1: "25%",
        x2: "25%",
        y1: "0%",
        y2: "75%",
        duration: 30000,
        easing: "easeOutQuint",
        autoplay: false,
      },
      0
    );

    function init(flag) {
      if (flag) {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
      } else {
        introAnimation.pause();
        breathAnimation.pause();
        shadowAnimation.pause();
      }
    }

    // New burst animation
    function burstAnimation() {
      anime({
        targets: spherePathEls,
        translateX: function () {
          return anime.random(-2000, 2000);
        },
        translateY: function () {
          return anime.random(-2000, 2000);
        },
        rotate: function () {
          return anime.random(-360, 360);
        },
        fill: "#0F103F",
        duration: 1500,
        easing: "easeOutExpo",
      });
      let blast_btn = document.getElementById("blast_btn");
      let sph_cont = document.getElementById("sphere_cont");
      
      
      blast_btn.hidden=true;
      setInterval(()=>{
          sph_cont.hidden=true;
          showMovingAnimation();
      },1500);
      init(false);
    }
    function showMovingAnimation(){
      let side_bar = document.getElementById("side-bar");
      let soc_icon = document.getElementById("social-icon");
      let header = document.getElementById("header");
      let mid_cont = document.getElementById("mid-cont");
      
      header.classList.add('animate');
      header.classList.remove("left-[10%]");
      header.classList.add("left-[0]");
      side_bar.classList.add('animate');
      soc_icon.classList.add('animate');
      soc_icon.classList.remove("left-[50%]");
      soc_icon.classList.add("right-[0]");
      setInterval(()=>{
        mid_cont.classList.add('animate');

      }, 1600);
    }
    // Event listener for burst animation
    sphereEl.addEventListener("click", burstAnimation);
    init(true);



})();



let head_elements = document.getElementsByClassName("head");
Array.from(head_elements).forEach((element)=>{
  element.addEventListener("mouseover", (e)=>{
    e.preventDefault();
    let nxt_element = element.nextElementSibling;
    nxt_element.hidden=false;
  });
  element.addEventListener("mouseout", (e)=>{
    e.preventDefault();
    let nxt_element = element.nextElementSibling;
    nxt_element.hidden=true;
  });
});
let side_elements = document.getElementsByClassName("side");
Array.from(side_elements).forEach((element)=>{
  element.addEventListener("mouseover",(e)=>{
    e.preventDefault();
    let nxt_element = element.parentElement.nextElementSibling;
    let parent = element.parentElement;
    parent.classList.add('hover:border-[#C961DE]', 'hover:border-2');
    nxt_element.hidden = false;
    let img_file= element.getAttribute('src').substring(14).split('_')[0];
    element.setAttribute('src', `../assets/img/${img_file}_p.svg`);

  });
  element.addEventListener("mouseout",(e)=>{
    e.preventDefault();
    let nxt_element = element.parentElement.nextElementSibling;
    let parent = element.parentElement;
    parent.classList.remove('hover:border-[#C961DE]', 'hover:border-2');
    nxt_element.hidden = true;
    let img_file= element.getAttribute('src').substring(14).split('_')[0];
    element.setAttribute('src', `../assets/img/${img_file}_b.svg`);
    
        
  });
});



// const toggleIcon = document.getElementById('toggle-icon');
//         const body = document.body;

//         toggleIcon.addEventListener('click', () => {
//             body.classList.toggle('dark-mode');
//         });
