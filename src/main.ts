class ImageSlider {
    private container: HTMLDivElement;
    private prevButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private dots: NodeListOf<HTMLButtonElement>;
    private scrollAmount: number;
    private slideNumber: number = 0;
    private isDown: boolean = false;
    private autoSlideInterval: number;

    constructor(containerSelector: string, prevButtonSelector: string, nextButtonSelector: string, dotSelector: string, timeInterval) {
        this.container = document.querySelector<HTMLDivElement>(containerSelector)!;
        this.prevButton = document.querySelector<HTMLButtonElement>(prevButtonSelector)!;
        this.nextButton = document.querySelector<HTMLButtonElement>(nextButtonSelector)!;
        this.dots = document.querySelectorAll<HTMLButtonElement>(dotSelector)!;
        this.scrollAmount = this.container.offsetWidth;

        this.prevButton.addEventListener("click", () => this.scrollLeft());
        this.nextButton.addEventListener("click", () => this.scrollRight());
        this.container.addEventListener("mousedown", () => this.mouseDown());
        this.container.addEventListener("mouseup", () => this.mouseUp());
        this.container.addEventListener("mousemove", (e) => this.mouseMove(e));
        this.dots.forEach((dot, index) => dot.addEventListener("click", () => this.dotClick(index)));

        this.autoSlideInterval = window.setInterval(() => this.autoSlide(), timeInterval);
    }

    private scrollLeft(): void {
        this.container.scrollLeft -= this.scrollAmount;
        this.updateActiveDot(true);
    }

    private scrollRight(): void {
        this.container.scrollLeft += this.scrollAmount;
        this.updateActiveDot();
    }

    private updateActiveDot(right: boolean = false): void {
        this.dots.forEach((dot) => dot.classList.remove("active"));
        if (right) {
            if (this.slideNumber > 0) {
                this.slideNumber--;
            }
        } else {
            if (this.slideNumber < this.dots.length - 1) {
                this.slideNumber++;
            }
        }
        this.dots[this.slideNumber].classList.add("active");
    }

    private mouseDown(): void {
        this.isDown = true;
        this.container.style.cursor = "pointer";
    }

    private mouseUp(): void {
        this.isDown = false;
    }

    private mouseMove(e: MouseEvent): void {
        if (this.isDown) {
            if (e.movementX < 0) {
                this.scrollRight();
            } else if (e.movementX > 0) {
                this.scrollLeft();
            }
            this.isDown = false;
            this.container.style.cursor = "auto";
        }
    }

    private dotClick(index: number): void {
        this.container.scrollLeft = index * this.scrollAmount;
        this.dots.forEach((dot) => dot.classList.remove("active"));
        this.dots[index].classList.add("active");
        this.slideNumber = index;
    }

    private autoSlide(): void {
        this.container.scrollLeft += this.scrollAmount;
        this.dots.forEach((dot) => dot.classList.remove("active"));
        this.slideNumber++;
        this.dots[this.slideNumber].classList.add("active");

        if (this.slideNumber >= this.dots.length - 1) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

const slider = new ImageSlider(".image__wrapper", ".prev__button", ".next__button", ".dot", 5000);
