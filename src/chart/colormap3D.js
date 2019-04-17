import echarts from 'echarts/lib/echarts';

import './colormap3D/Colormap3DSeries';
import './colormap3D/Colormap3DView';
import './colormap3D/colormap3DLayout';

import opacityVisual from './common/opacityVisual';

echarts.registerVisual(opacityVisual('colormap3D'));
