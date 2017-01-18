<template>
  <div class="el-dragger__cover" >
    <transition-group name="fade-in">
    <div class="ued-simpphoto" v-for="(img,index) in image" :key="img">
    <div class="ued-hangsimpphoto">
    <svg  class="ued-filetype ued-editphoto"><use xlink:href="#photo"></svg>        
    <div class="ued-simphotoname">
     <p>{{img.name}}</p>
          <span v-if="img.status != 'uploading'" class="ued-filesize">{{img.size/1000}}kb</span>
      <el-progress
       v-if="img.status === 'uploading'"
        :showtext="percenshow"
        class="el-dragger__cover__progress"
        :percentage="img.percentage"
        :show-text="false"
         type="lineS"
        :status="img.status === 'finished' ? 'success' : ''">
      </el-progress>
         </div> 
    </div>
     <span  v-if="img.status === 'finished'" class="el-upload__btn-delete" @click.stop="onRemove(image)" ><svg class="ued-photodelete"><use xlink:href="#icon-close"/></use></svg></span>      
      </div>
    </transition-group>
    <span class="ued-continuebtn" @click.stop="$parent.$refs.input.click()"><i class="el-icon-upload2"></i><span>{{ t('el.upload.continue') }}</span></span>
    <div
      class="el-dragger__cover__content"
      v-if="image.status === 'finished'"
      @mouseenter="mouseover = true"
      @mouseleave="mouseover = false"
    >
      <!--<img :src="image.url">-->
      <transition name="fade-in">
        <div v-show="mouseover" class="el-dragger__cover__interact">
          <div class="el-draggeer__cover__btns">
            <!--<span class="btn" @click="$parent.handleClick()"><i class="el-icon-upload2"></i><span>{{ t('el.upload.continue') }}</span></span>-->
            <!--<span class="btn" @click="onPreview(image)"><i class="el-icon-view"></i><span>{{ t('el.upload.preview') }}</span></span>-->
            <!--<span class="btn" @click="onRemove(image)"><i class="el-icon-delete2"></i><span>{{ t('el.upload.delete') }}</span></span>-->
          </div>
        </div>
      </transition>
      <transition name="md-fade-top">
        <!--<h4 v-show="mouseover" class="el-dragger__cover__title">{{image.name}}</h4>-->
      </transition>
    </div>
  </div>
</template>
<script>
    import ElProgress from '../../component/web-component-progress';
    import Locale from '../date-picker/src/utils/local';

    export default {
        mixins: [Locale],
        components: {
            ElProgress
        },
        props: {
            image: {},
            onPreview: {
                type: Function,
                default: function() {}
            },
            onRemove: {
                type: Function,
                default: function() {}
            }
        },
        data() {
            return {
                percenshow: false,
                mouseover: false
            };
        }
    };
</script>