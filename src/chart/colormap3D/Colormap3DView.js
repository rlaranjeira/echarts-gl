import SurfaceView from '../surface/SurfaceView';

import zrUtil from 'zrender/lib/core/util';

var Colormap3DView = SurfaceView.extend({

    type: 'colormap3D',

    render: function (seriesModel, ecModel, api) {

        // if series option didn't changed, do not re-render
        if (
            !seriesModel.optionHasChanged() &&
            !this.axesHasChanged(seriesModel)
        ) {
            return;
        }

        Colormap3DView.superApply(this, 'render', arguments);
    },

    axesHasChanged: function (seriesModel) {
        var coordinateSystem = seriesModel.coordinateSystem;
        var axes = coordinateSystem.getAxes();

        // By default, let's assume that nothing has changed
        var hasChanged = false;

        // Iterate over all axes to find if something has changed
        zrUtil.each(axes, function (axis) {
            var model = axis.model;
            hasChanged = hasChanged || model && model.optionHasChanged();
        });

        // true if one or more series has changed
        return hasChanged;
    }
});

export default Colormap3DView;
