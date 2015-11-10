import React from 'react';

import * as draw from './draw.jsx';

export default class Plot extends React.Component {

    constructor (props) {
        super(props);
        let {
            scale = 10,
        } = props.init;
        let x = 0, y = 0;
        this.state = {
            x, y, scale
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
        this.pxpu = (w>h?h:w)/this.state.scale;
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
            ctx = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height,
            center = this.props.init.center,
            pxpu = this.pxpu,
            x = this.state.x-center[0]*pxpu,
            y = this.state.y+center[1]*pxpu,
            cpx = w/2+x,
            cpy = h/2+y;

        ctx.clearRect(0,0,w,h);

        draw.grid({ ctx, grid: true, axes: true, labels: true,
            cpx, cpy, w, h, major: 1, pxpu
        });

        for (let d of this.props.datasets) {
            draw.points({ ctx, cpx, cpy, pxpu,
                points: d.points,
                color: d.color
            });
        }
    }

}
