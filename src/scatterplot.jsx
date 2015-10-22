import React from 'react';

import * as draw from './draw.jsx';

export default class Plot extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            // plot center
            x: 0, y: 0,
            scale: 10
        };
    }

    render () {
        return <div
                onMouseDown={this.mousedown.bind(this)}
            >
            <canvas
                ref={(c) => this.canvas = c}
            />
        </div>;
    }

    updateSize () {
        let w = this.canvas.width = this.canvas.scrollWidth;
        let h = this.canvas.height = this.canvas.scrollHeight;
        this.pxpu = (w>h?h:w)/(2.0*this.state.scale);
        this.draw();
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateSize.bind(this));
        this.updateSize();
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateSize.bind(this));
    }

    componentDidUpdate () {
        this.updateSize();
    }

    mousedown (e) {
        let oldx = this.state.x,
            oldy = this.state.y;
        let startx = e.clientX,
            starty = e.clientY;
        let mmove = (e) => {
            requestAnimationFrame(() => {
                this.setState({
                    x: oldx + (e.clientX - startx),
                    y: oldy + (e.clientY - starty)
                });
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
            c = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height;

        c.clearRect(0,0,w,h);

        draw.grid(c, { grid: true, axes: true, labels: true,
                      cpx: w/2+this.state.x,
                      cpy: h/2+this.state.y,
                      major: 1,
                      pxpu: this.pxpu,
                      w, h
        });
    }

}
