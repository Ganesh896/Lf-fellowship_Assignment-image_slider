var ImageSlider = /** @class */ (function () {
    function ImageSlider(containerSelector, prevButtonSelector, nextButtonSelector, dotSelector, timeInterval) {
        var _this = this;
        this.slideNumber = 0;
        this.isDown = false;
        this.container = document.querySelector(containerSelector);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.dots = document.querySelectorAll(dotSelector);
        this.scrollAmount = this.container.offsetWidth;
        this.prevButton.addEventListener("click", function () { return _this.scrollLeft(); });
        this.nextButton.addEventListener("click", function () { return _this.scrollRight(); });
        this.container.addEventListener("mousedown", function () { return _this.mouseDown(); });
        this.container.addEventListener("mouseup", function () { return _this.mouseUp(); });
        this.container.addEventListener("mousemove", function (e) { return _this.mouseMove(e); });
        this.dots.forEach(function (dot, index) { return dot.addEventListener("click", function () { return _this.dotClick(index); }); });
        this.autoSlideInterval = window.setInterval(function () { return _this.autoSlide(); }, timeInterval);
    }
    ImageSlider.prototype.scrollLeft = function () {
        this.container.scrollLeft -= this.scrollAmount;
        this.updateActiveDot(true);
    };
    ImageSlider.prototype.scrollRight = function () {
        this.container.scrollLeft += this.scrollAmount;
        this.updateActiveDot();
    };
    ImageSlider.prototype.updateActiveDot = function (right) {
        if (right === void 0) { right = false; }
        this.dots.forEach(function (dot) { return dot.classList.remove("active"); });
        if (right) {
            if (this.slideNumber > 0) {
                this.slideNumber--;
            }
        }
        else {
            if (this.slideNumber < this.dots.length - 1) {
                this.slideNumber++;
            }
        }
        this.dots[this.slideNumber].classList.add("active");
    };
    ImageSlider.prototype.mouseDown = function () {
        this.isDown = true;
        this.container.style.cursor = "pointer";
    };
    ImageSlider.prototype.mouseUp = function () {
        this.isDown = false;
    };
    ImageSlider.prototype.mouseMove = function (e) {
        if (this.isDown) {
            if (e.movementX < 0) {
                this.scrollRight();
            }
            else if (e.movementX > 0) {
                this.scrollLeft();
            }
            this.isDown = false;
            this.container.style.cursor = "auto";
        }
    };
    ImageSlider.prototype.dotClick = function (index) {
        this.container.scrollLeft = index * this.scrollAmount;
        this.dots.forEach(function (dot) { return dot.classList.remove("active"); });
        this.dots[index].classList.add("active");
        this.slideNumber = index;
    };
    ImageSlider.prototype.autoSlide = function () {
        this.container.scrollLeft += this.scrollAmount;
        this.dots.forEach(function (dot) { return dot.classList.remove("active"); });
        this.slideNumber++;
        this.dots[this.slideNumber].classList.add("active");
        if (this.slideNumber >= this.dots.length - 1) {
            clearInterval(this.autoSlideInterval);
        }
    };
    return ImageSlider;
}());
var slider = new ImageSlider(".image__wrapper", ".prev__button", ".next__button", ".dot", 5000);
