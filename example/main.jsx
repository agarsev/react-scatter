import React from 'react';
import ReactDOM from 'react-dom';
import ScatterPlot from '..';

ReactDOM.render(<ScatterPlot init={{center:[2, 2], scale:5}} />, document.getElementById('plot'));
