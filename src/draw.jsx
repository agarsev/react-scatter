export function grid ({
    ctx, cpx, cpy,
    w, h, pxpu,
    major, minor = major/10,
    grid, axes = grid, labels = grid,
    units = '', style: {
        text: textStyle = "#000",
        axis: axisStyle = "#000",
        minor: minorStyle = "#eee",
        major: majorStyle = "#ccc",
        font = '10pt Arial'
    } = {}
    }) {

    var pad = 2;

    function drawVStrips (beg, end, step) {
        ctx.beginPath();
        for (var x = beg; x <= end; x+= step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        ctx.stroke();
    }

    function writeVVals (beg, end, step) {
        ctx.textAlign = "left";
        for (var x = beg; x <= end; x+= step) {
            let l = Math.round(((x-cpx)/pxpu)*10)/10;
            if (l==0) { continue; }
            ctx.textBaseline = "top";
            ctx.fillText(l+units, x+pad, pad);
            ctx.textBaseline = "bottom";
            ctx.fillText(l+units, x+pad, h-pad);
        }
    }

    function drawHStrips (beg, end, step) {
        ctx.beginPath();
        for (var y = beg; y <= end; y+= step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();
    }

    function writeHVals (beg, end, step) {
        ctx.textBaseline = "bottom";
        for (var y = beg; y <= end; y+= step) {
            let l = Math.round(((cpy-y)/pxpu)*10)/10;
            if (l==0) { continue; }
            ctx.textAlign = "left";
            ctx.fillText(l+units, pad, y-pad);
            ctx.textAlign = "right";
            ctx.fillText(l+units, w-pad, y-pad);
        }
    }

    ctx.font = font;
    ctx.textAlign = "left";

    if (grid) {
        ctx.strokeStyle = minorStyle;
        drawVStrips(cpx % (minor*pxpu), w, minor*pxpu);
        drawHStrips(cpy % (minor*pxpu), h, minor*pxpu);

        ctx.strokeStyle = majorStyle;
        drawVStrips(cpx % (major*pxpu), w, major*pxpu);
        drawHStrips(cpy % (major*pxpu), h, major*pxpu);
    }

    if (axes) {
        ctx.strokeStyle = axisStyle;
        drawVStrips(cpx, w, 1.0/0);
        drawHStrips(cpy, h, 1.0/0);
    }

    if (labels) {
        ctx.strokeStyle = textStyle;
        writeVVals(cpx % (major*pxpu), w, major*pxpu);
        writeHVals(cpy % (major*pxpu), h, major*pxpu);
    }

}
