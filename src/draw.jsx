var textStyle = "#000",
    axisStyle = "#000",
    minorStyle = "#eee",
    majorStyle = "#ccc";

export function grid (cctx, dim) {

    var pad = 2;

    if (dim.units === undefined) { dim.units = ''; }

    function drawVStrips (beg, end, step) {
        cctx.beginPath();
        for (var x = beg; x <= end; x+= step) {
            cctx.moveTo(x, 0);
            cctx.lineTo(x, dim.h);
        }
        cctx.stroke();
    }

    function writeVVals (beg, end, step) {
        cctx.textAlign = "left";
        for (var x = beg; x <= end; x+= step) {
            let l = Math.round(((x-dim.cpx)/dim.pxpu)*10)/10;
            if (l==0) { continue; }
            cctx.textBaseline = "top";
            cctx.fillText(l+dim.units, x+pad, pad);
            cctx.textBaseline = "bottom";
            cctx.fillText(l+dim.units, x+pad, dim.h-pad);
        }
    }

    function drawHStrips (beg, end, step) {
        cctx.beginPath();
        for (var y = beg; y <= end; y+= step) {
            cctx.moveTo(0, y);
            cctx.lineTo(dim.w, y);
        }
        cctx.stroke();
    }

    function writeHVals (beg, end, step) {
        cctx.textBaseline = "bottom";
        for (var y = beg; y <= end; y+= step) {
            let l = Math.round(((dim.cpy-y)/dim.pxpu)*10)/10;
            if (l==0) { continue; }
            cctx.textAlign = "left";
            cctx.fillText(l+dim.units, pad, y-pad);
            cctx.textAlign = "right";
            cctx.fillText(l+dim.units, dim.w-pad, y-pad);
        }
    }

    dim.minor = dim.major/10;

    cctx.font = "10pt Arial";
    cctx.textAlign = "left";

    if (dim.grid) {
        cctx.strokeStyle = minorStyle;
        drawVStrips(dim.cpx % (dim.minor*dim.pxpu), dim.w, dim.minor*dim.pxpu);
        drawHStrips(dim.cpy % (dim.minor*dim.pxpu), dim.h, dim.minor*dim.pxpu);

        cctx.strokeStyle = majorStyle;
        drawVStrips(dim.cpx % (dim.major*dim.pxpu), dim.w, dim.major*dim.pxpu);
        drawHStrips(dim.cpy % (dim.major*dim.pxpu), dim.h, dim.major*dim.pxpu);
    }

    if (dim.axes) {
        cctx.strokeStyle = axisStyle;
        drawVStrips(dim.cpx, dim.w, 1.0/0);
        drawHStrips(dim.cpy, dim.h, 1.0/0);
    }

    if (dim.labels) {
        cctx.strokeStyle = textStyle;
        writeVVals(dim.cpx % (dim.major*dim.pxpu), dim.w, dim.major*dim.pxpu);
        writeHVals(dim.cpy % (dim.major*dim.pxpu), dim.h, dim.major*dim.pxpu);
    }

}
