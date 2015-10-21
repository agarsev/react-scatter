import React from 'react';

export default class Plot extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            // plot center
            x: 0, y: 0,
            // plot scale
            sx: 1/100, sy: 1/100,
        };
    }

    render () {
        return <div>
            <canvas
                ref={(c) => this.canvas = c}
                onMouseDown={this.mousedown.bind(this)}
            />
        </div>;
    }

    componentDidMount () {
        this.draw();
    }

    componentDidUpdate () {
        this.draw();
    }

    mousedown (e) {
        let oldx = this.state.x,
            oldy = this.state.y;
        let startx = e.clientX,
            starty = e.clientY;
        let sx = this.state.sx,
            sy = this.state.sy;
        let mmove = (e) => {
            this.setState({
                x: (oldx + (e.clientX - startx)/sx),
                y: (oldy + (e.clientY - starty)/sy)
            });
        };
        let mup = () => {
            document.removeEventListener('mousemove', mmove);
            document.removeEventListener('mouseup', mup);
        };
        document.addEventListener('mousemove', mmove);
        document.addEventListener('mouseup', mup);
    }

    draw () {
        let canvas = this.canvas,
            c = canvas.getContext('2d');

        c.clearRect(0,0,canvas.scrollWidth,canvas.scrollHeight);

        let x = this.state.x*this.state.sx,
            y = this.state.y*this.state.sy;

        c.beginPath();
        c.arc(x, y, 2, 0, 2*Math.PI);
        c.fill();
    }

}
