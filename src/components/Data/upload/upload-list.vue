<template>
    <div class="ued-zlyadd">
         <div class="ued-photolist">     
  <transition-group  class="el-upload__files" name="list">
      <div class="ued-simpphoto ued-addmult" v-for="file in files" :key="file" @click="$emit('clickFile', file)">
   <div class="ued-hangsimpphoto">
    <div v-if="file.filetype=='.docx' || file.filetype=='.png' || file.filetype=='.xlsx' || file.filetype=='.excel' || file.filetype=='.ppt' || file.filetype=='.zip' || file.filetype=='.txt'">
    <svg v-if="file.filetype=='.docx'" class="ued-filetype ued-filefile"><use xlink:href="#word"></svg>        
    <svg v-if="file.filetype=='.png' || file.filetype=='.jpg'" class="ued-filetype ued-filefile"><use xlink:href="#photo"></svg>        
    <svg v-if="file.filetype=='.xlsx'" class="ued-filetype ued-filefile"><use xlink:href="#excel"></svg>        
    <svg v-if="file.filetype=='.excel'" class="ued-filetype ued-filefile"><use xlink:href="#excel"></svg>        
    <svg v-if="file.filetype=='.ppt'" class="ued-filetype ued-filefile"><use xlink:href="#ppt"></svg>        
    <svg v-if="file.filetype=='.zip'" class="ued-filetype ued-filefile"><use xlink:href="#zip"></svg>        
    <svg v-if="file.filetype=='.pdf'" class="ued-filetype ued-filefile"><use xlink:href="#pdf"></svg>        
    <svg v-if="file.filetype=='.txt'" class="ued-filetype ued-filefile"><use xlink:href="#txt"></svg>    
    </div> 
    <div v-else>
        <svg class="ued-filetype ued-filefile"><use xlink:href="#txt"></svg>  
    </div>   
    <a class="el-upload__file__name" @click="$emit('preview', file)">
    <div class="ued-multfile">
          <p>{{file.name}}</p>
          <span v-if="!file.showProgress" class="ued-filesize ued-addsize">{{file.size/1000}}kb</span>
    <el-progress
    class="ued-addprogress"
      :showtext="percenshow"
     v-if="file.status === 'uploading'"      
        :stroke-width="2"
        type="lineS"
        :percentage="parsePercentage(file.percentage)"
        :status="file.status === 'finished' && file.showProgress ? 'success' : ''">
      </el-progress>
       </div>
      </a>
   </div>
       <span  v-if="file.status === 'finished'" class="el-upload__btn-delete" @click="remover(file)" ><svg class="ued-photodelete ued-adddelete"><use xlink:href="#icon-close"/></use></svg></span> 
    </div>
  </transition-group>
   
   </div>
    <span class="ued-continuebtn" @click="handleClick()"><i class="el-icon-upload2"></i><span>{{ t('el.upload.continue') }}</span></span>  
   </div>
</template>
<script>
    import Locale from '../date-picker/src/utils/local';
    import ElProgress from '../../component/web-component-progress';
    export default {
        mixins: [Locale],
        components: {
            ElProgress
        },
        data() {
            return {
                show: false,
                percenshow: false
            }
        },
        props: {
            onSuccess: Function,
            files: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        computed: {

        },
        methods: {
            remover(file) {
                this.files.splice(this.files.indexOf(file), 1);
            },
            handleClick() {
                this.$parent.$children[0].$refs.input.click()
            },
            parsePercentage(val) {
                return parseInt(val, 10);
            }
        }
    };
</script>