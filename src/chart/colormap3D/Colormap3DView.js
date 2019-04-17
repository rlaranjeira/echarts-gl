import SurfaceView from '../surface/SurfaceView';

var Colormap3DView = SurfaceView.extend({

    type: 'colormap3D',

    render: function (seriesModel, ecModel, api) {

        // if series option didn't changed, do not re-render
        if (!seriesModel.optionHasChanged()) {
            return;
        }

        Colormap3DView.superApply(this, 'render', arguments);
    }
});

export default Colormap3DView;
