import axisDefault from './axis3DDefault';

import OrdinalMeta from 'echarts/lib/data/OrdinalMeta';

import zrUtil from 'zrender/lib/core/util';

var AXIS_TYPES = ['value', 'category', 'time', 'log'];
/**
 * Generate sub axis model class
 * @param {string} dim 'x' 'y' 'radius' 'angle' 'parallel'
 * @param {module:echarts/model/Component} BaseAxisModelClass
 * @param {Function} axisTypeDefaulter
 * @param {Object} [extraDefaultOption]
 */
export default function (dim, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {

    zrUtil.each(AXIS_TYPES, function (axisType) {

        BaseAxisModelClass.extend({

            type: dim + 'Axis3D.' + axisType,

            /**
             * @type readOnly
             */
            __ordinalMeta: null,

            mergeDefaultAndTheme: function (option, ecModel) {

                var themeModel = ecModel.getTheme();
                zrUtil.merge(option, themeModel.get(axisType + 'Axis3D'));
                zrUtil.merge(option, this.getDefaultOption());

                option.type = axisTypeDefaulter(dim, option);
            },

            /**
             * @override
             */
            optionUpdated: function (newOption, isInit) {
                var thisOption = this.option;

                // By default, let's assume that something has changed
                this.optionChanged = true;

                // Avoid updating model if option is empty
                if (
                    !isInit &&
                    zrUtil.isEmptyObject(newOption)
                ) {

                    // flag that option didn't changed
                    this.optionChanged = false;

                    // Avoid calling parent optionUpdated
                    return;
                }

                if (thisOption.type === 'category') {
                    this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
                }
            },

            optionHasChanged: function () {
                return this.optionChanged;
            },

            getCategories: function () {
                if (this.option.type === 'category') {
                    return this.__ordinalMeta.categories;
                }
            },

            getOrdinalMeta: function () {
                return this.__ordinalMeta;
            },

            defaultOption: zrUtil.merge(
                zrUtil.clone(axisDefault[axisType + 'Axis3D']),
                extraDefaultOption || {},
                true
            )
        });
    });

    // TODO
    BaseAxisModelClass.superClass.registerSubTypeDefaulter(
        dim + 'Axis3D',
        zrUtil.curry(axisTypeDefaulter, dim)
    );
};
