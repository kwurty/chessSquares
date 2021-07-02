
const canvas = document.getElementById('canvas');
const headshot = document.querySelector('.headshot');
const billboard = document.getElementById('billboard');
const container = document.querySelector('.container');
const title = document.getElementById('title');
const slogan = document.getElementById('slogan');
const paint = document.getElementById('paint');
const brushSize = document.getElementById('brushsize');
const ctx = canvas.getContext("2d");
const eraser = document.getElementById('eraser');
const paintBrush = document.getElementById('paintbrush');
const circle = document.querySelector('.circle');
const modal = document.getElementById('modal')
const close = document.getElementById('close');
const sloganInput = document.getElementById('sloganInput');
const titleInput = document.getElementById('titleInput');

let isDrawing = false;
let x, y;
let color = paint.value;
let lineWidth = brushSize.value;
let erasing = false;

const billboards = [
    {
        title: "Health Care & Erectile Dysfunction Cases",
        slogan: "We're hard... at work for you!"
    },
    {
        title: "Criminal Defense Attorney",
        slogan: "Just because you did it doesn't mean you're guilty!"
    },
    {
        title: "West Virginia Divorce Law",
        slogan: "Make your Daddy your Dad again"
    },
    {
        title: "Anti-Sweatshop Law",
        slogan: "I'll sue the pants off of them!"
    },
    {
        title: "Livestock Law",
        slogan: "I'll milk them for all they're worth!"
    },
    {
        title: "Adultery and Divorce Cases",
        slogan: "When the gavel isn't the only thing banging..."
    },
    {
        title: "Prostitution Law",
        slogan: "You screw 'em, we'll sue 'em!"
    },
    {
        title: "Wrongful Termination Cases",
        slogan: "They sack you, I'll back you"
    },
    {
        title: "Finance Law",
        slogan: "This was a bad investment"
    },
    {
        title: "Constitutional Law",
        slogan: "Because a bunch of guys from over 200 years ago shouldn't dictate how you live your life"
    },
    {
        title: "Workplace Descrimination Cases",
        slogan: "You can trust me. I have a black wife."
    },
    {
        title: "International Space Law",
        slogan: "E.T. Phone Me!"
    },
    {
        title: "Veteran Services",
        slogan: "I'll make them see P.T.S.Deez Nuts!"
    },
    {
        title: "Juvenile Law",
        slogan: "I'll take care of your little brat"
    },
    {
        title: "Lawyer",
        slogan: "Don't you work about blank, let me worry about blank"
    },
    {
        title: "Bird Law",
        slogan: "The prosecution roosts"
    },

]

const setDimensions = () => {
    width = billboard.offsetWidth;
    height = billboard.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

const download = () => {
    html2canvas(container).then(canvas => {
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "bryan_rowler.png";
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
    });
}

const animate = (e) => {
    if (!isDrawing) {
        circle.style.visibility = 'visible';
        circle.style.height = lineWidth + 'px';
        circle.style.width = lineWidth + 'px';
        circle.style.top = `${e.pageY}px`;
        circle.style.left = `${e.pageX}px`;
        return;
    };
    circle.style.visibility = 'visible';
    circle.style.height = lineWidth + 'px';
    circle.style.width = lineWidth + 'px';
    circle.style.top = `${e.pageY}px`;
    circle.style.left = `${e.pageX}px`;
    ctx.strokeStyle = `${color}`;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth;
    if (erasing) {
        ctx.clearRect(e.offsetX, e.offsetY, lineWidth / 1.2, lineWidth / 1.2);
    } else {


        ctx.beginPath();
        // start from
        ctx.moveTo(lastX, lastY);
        // go to
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

const setBillboard = () => {
    let board = billboards[Math.floor(Math.random() * billboards.length)];
    title.innerText = board.title;
    slogan.innerText = board.slogan;
}

const openModal = () => {
    modal.style.display = "block";
}

const closeModal = () => {
    modal.style.display = "none";
}

const changeLabels = (e) => {
    let t = document.getElementById('titleInput').value;
    let s = document.getElementById('sloganInput').value;
    title.innerText = t;
    slogan.innerText = s;
    document.getElementById('titleInput').value = ""
    document.getElementById('sloganInput').value = ""

    modal.style.display = "none";
}

titleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { changeLabels() };
})
sloganInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { changeLabels() };
})

close.addEventListener('click', () => {
    modal.style.display = "none";
})

document.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', animate);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    circle.style.visibility = 'hidden';
});

paintBrush.addEventListener('click', () => {
    if (erasing) {
        erasing = !erasing;
        paintBrush.classList.add('is-active');
        eraser.classList.remove('is-active');
    }
})

eraser.addEventListener('click', () => {
    if (!erasing) {
        erasing = !erasing;
        paintBrush.classList.remove('is-active');
        eraser.classList.add('is-active');
    }
})



paint.addEventListener("input", (e) => color = e.target.value);
paint.addEventListener("change", (e) => color = e.target.value);
brushSize.addEventListener('change', (e) => { lineWidth = e.target.value });




setDimensions();
setBillboard();