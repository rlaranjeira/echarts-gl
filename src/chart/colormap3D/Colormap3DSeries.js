import SurfaceSeries from '../surface/SurfaceSeries';
import createList from '../common/createList';
import zrUtil from 'zrender/lib/core/util';

var isEmptyObject = zrUtil.isEmptyObject;

var Colormap3DSeries = SurfaceSeries.extend({

    type: 'series.colormap3D',

    init: function (option, parentModel, ecModel, extraOpt) {

        // Flag that option has changed, or view won't draw anything.
        this.optionChanged = true;

        // Call parent init
        Colormap3DSeries.superApply(this, 'init', arguments);
    },

    mergeOption: function (newSeriesOption, ecModel) {

        // By default, let's assume that something has changed
        this.optionChanged = true;

        // If nothing has changed
        if (isEmptyObject(newSeriesOption)) {

            // flag that option didn't changed
            this.optionChanged = false;

            // Avoid calling parent mergeOption
            return;
        }

        Colormap3DSeries.superApply(this, 'mergeOption', arguments);
    },

    optionHasChanged: function () {
        return this.optionChanged;
    },

    getInitialData: function (option, ecModel) {
        var mode = option.mode;
        var data = option.data;
        var dataLength = data.length;
        var list = this.getRawData();
        var dims = ['x', 'y', 'z'];

        if (mode == 'append') {
            var shift = list.count() >= option.size;

            if (shift) {
                list.setItemVisuals(
                  list.getItemVisuals().slice(dataLength)
                );
            }

            list.appendData(data, shift);
        } else if (mode == 'update') {
            list.getItemVisuals().length -= dataLength;
            list.updateData(data);
        } else {
            return createList(this, dims, data);
        }

        return list;
    },

    defaultOption: {

        wireframe: {
            show: false
        },

        silent: true,

        preserveVisuals: true
    }
});

export default Colormap3DSeries;
