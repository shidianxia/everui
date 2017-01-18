<script>
    // import Emitter from 'element-ui/src/mixins/emitter';
    export default {
        name: 'ElCheckboxGroup',
        componentName: 'ElCheckboxGroup',
        // mixins: [Emitter],
        props: {
            value: {}
        },

        watch: {
            value(value) {
                this.$emit('change', value);
                // this.dispatch('form-item', 'el.form.change', [value]);
            }
        },
        methods: {}
    };
</script>

<template>
  <div class="el-checkbox-group">
    <slot></slot>
  </div>
</template>