import React from 'react';
import ReactDOM from 'react-dom';
import ScatterPlot from '..';

let datasets = [
    { color: '#f90'
    , points: []
    }
    ,{ color: '#78f'
     , points: []
     }
];

for (let i = 0; i<1000; i++) {
    datasets[0].points.push([Math.random()*6-3, Math.random()*4-2]);
    datasets[1].points.push([Math.random()*4-2, Math.random()*6-3]);
}

ReactDOM.render(<ScatterPlot datasets={datasets} init={{center:[2, 2], scale:5}} />, document.getElementById('plot'));
