function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor()
{
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const app = new Vue({
    el: '#app',
    data: {
        colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        width: 64,
        height: 64
    },
    computed: {},
    methods: {
        generate: function ()
        {
            let colors = [];
            for (let c = 0; c < this.colors.length; c++)
            {
                colors.push(getRandomColor());
            }
            this.colors = colors;

            generatePattern();
        },
        refresh: function ()
        {
            generatePattern();
        },
        addColor: function ()
        {
            this.colors.push(getRandomColor());
        },
        removeColor: function ()
        {
            if (this.colors.length < 2)
                return;

            this.colors.pop();
        }
    }
});

function generatePattern()
{
    let width = app.width;
    let height = app.height;

    canvas.width = width;
    canvas.height = height;

    let max = width > height ? width : height;
    canvas.style.width = (40 * width / max) + 'vw';
    canvas.style.height = (40 * height / max) + 'vw';

    context.fillStyle = app.colors[0];
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < width; i++)
    {
        for (let j = 0; j < height; j++)
        {
            let index = randomIntFromInterval(0, app.colors.length);
            context.fillStyle = app.colors[index];
            context.fillRect(i, j, 1, 1);
        }
    }
}

window.onload = () =>
{
    app.generate();
};
