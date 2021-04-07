const numSteps = 25.0;
let prevRatio = 0.0;

let prvImgElement;
let workTitleElement;

let mq = window.matchMedia("(max-width: 768px)");
let increasingOpacity = "ratio";
let decreasingOpacity = "ratio";

prvImgElement = document.querySelectorAll(".prv");
workTitleElement = document.querySelectorAll(".middle");

// Window width is at less than 768px
if (mq.matches) {
    scrollerHover();
}
else { }
// Fired if window width has changed
mq.addEventListener( "change", (e) => {
    if (e.matches) {
        scrollerHover();
    } else { }
})

function scrollerHover () {
    
    window.addEventListener("scroll", (event) => {createObservers();}, false);
    
    $(document).one('scroll', function() {
        prvImgElement.forEach(prvImgElements => {
            prvImgElements.style.opacity = .3
        });
    });
    
}
  
function createObservers() {
    let observer;
  
    let options = {
      rootMargin: "-160px 0px",
      threshold: buildThresholdList()
    };

    let titleOptions = {
      rootMargin: "-210px 0px",
      threshold: buildThresholdList()
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    prvImgElement.forEach(prvImgElements => {
        observer.observe(prvImgElements);
    });
    
    observer = new IntersectionObserver(handleTitleIntersect, titleOptions);
    workTitleElement.forEach(workTitleElements => {
        observer.observe(workTitleElements);
    });

}

function buildThresholdList() {
    let thresholds = [];
    let numSteps = 25;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
        let invRatio = 1 - entry.intersectionRatio

        if (invRatio > .28)  {

        if (entry.intersectionRatio > prevRatio) {
            entry.target.style.opacity = increasingOpacity.replace("ratio", invRatio);
        } else {
            entry.target.style.opacity = decreasingOpacity.replace("ratio", invRatio);
        }
            
      }
      prevRatio = entry.intersectionRatio;
    });
}

function handleTitleIntersect(entries, observer) {
    entries.forEach((entry) => {
        let regRatio = entry.intersectionRatio
        
        if (entry.intersectionRatio > prevRatio) {
            entry.target.style.opacity = increasingOpacity.replace("ratio", regRatio);
        } else {
            entry.target.style.opacity = decreasingOpacity.replace("ratio", regRatio);
        }    
        prevRatio = entry.intersectionRatio;

    });
}