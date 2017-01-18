<template>
  <div class="el-upload__inner"
    :class="{
      'el-dragger': type === 'drag',
      'is-dragOver': dragOver,
      'is-showCover': showCover
    }"
    @click="handleClick"
    @drop.prevent="onDrop"
    @dragover.prevent="dragOver = true"
    @dragleave.prevent="dragOver = false">
    <slot></slot>
    <cover :image="imagefile" :on-preview="onPreview" :on-remove="onRemove" v-if="showCover"></cover>
    <input class="el-upload__input" type="file" ref="input"  @change="handleChange" :multiple="multiple" :accept="accept">
    <div v-if="!lastestFile"> 
    <svg class="uploaddemo_zly"><use xlink:href="#icon-upload"></use></svg>
  <div  class="el-dragger__text">请点击活拖拽文件到这里上传</div>
    </div>
    <div v-if="success" class="ued-uploadsuccess">
        <svg class="ued-ifsuccessicon"><use xlink:href="#icon-o-success"></use></svg>
        <span class="el-dragger__text  ued-ifsuccess">上传成功</span>
    </div>
    <div v-if="error" class="ued-uploadsuccess">
        <svg class="ued-ifsuccessicon"><use xlink:href="#icon-o-error"></use></svg>
        <span class="el-dragger__text  ued-ifsuccess">上传失败</span>
    </div>
     <div v-if="typeerror" class="ued-uploadsuccess">
        <svg class="ued-ifsuccessicon"><use xlink:href="#icon-o-error"></use></svg>
        <span class="el-dragger__text  ued-ifsuccess">请上传图片格式类型</span>
    </div>
  </div>
</template>

<script>
    import ajax from './ajax';
    import Cover from './cover';
    import UploadList from './upload-list';

    export default {
        components: {
            Cover,
            UploadList
        },
        props: {
            type: String,
            action: {
                type: String,
                required: true
            },
            name: {
                type: String,
                default: 'file'
            },
            data: Object,
            headers: Object,
            withCredentials: Boolean,
            multiple: Boolean,
            accept: String,
            onStart: Function,
            onProgress: Function,
            onSuccess: Function,
            onError: Function,
            beforeUpload: Function,
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
                inputvalue: "",
                sign: 1,
                typeerror: false,
                success: false,
                show: false,
                dragOver: false,
                mouseover: false,
                error: false
            };
        },
        watch: {
            success(val) {
                var that = this
                setTimeout(function() {
                    that.success = false
                }, 2000)

            },
            error(val) {
                var that = this
                setTimeout(function() {
                    that.error = false
                }, 2000)

            },
            typeerror(val) {
                var that = this
                setTimeout(function() {
                    that.typeerror = false
                }, 3000)

            }
        },
        computed: {
            imagefile() {
                var fileList = this.$parent.fileList;
                return fileList
            },
            lastestFile() {
                var fileList = this.$parent.fileList;
                return fileList[fileList.length - 1];
            },
            showCover() {
                var file = this.lastestFile;
                return this.thumbnailMode && file && file.status !== 'fail';
            },
            thumbnailMode() {
                return this.$parent.thumbnailMode;
            }
        },
        methods: {
            // isImage(str) {
            //     return str.indexOf('image') !== -1;
            // },
            handleChange(ev) {
                const files = ev.target.files;
                if (!files) {
                    return;
                }
                this.uploadFiles(files);
                this.$refs.input.value = "";
                console.log("111" + this.$refs.input.value)
            },
            uploadFiles(files) {
                let postFiles = Array.prototype.slice.call(files);
                if (!this.multiple) {
                    postFiles = postFiles.slice(0, 1);
                }

                if (postFiles.length === 0) {
                    return;
                }

                postFiles.forEach(file => {
                    let start = file.name.indexOf(".")
                    let filetype = file.name.substring(start)
                    if (!this.multiple) {
                        if (filetype == ".png" || filetype == ".jpg") {
                            this.upload(file);
                        } else {
                            this.typeerror = true
                        }

                    } else {
                        this.upload(file);

                    }
                    // }
                });
            },
            editsign() {

            },
            upload(file) {
                if (!this.beforeUpload) {
                    return this.post(file);
                }

                const before = this.beforeUpload(file);
                if (before && before.then) {
                    before.then(processedFile => {
                        if (Object.prototype.toString.call(processedFile) === '[object File]') {
                            this.post(processedFile);
                        } else {
                            this.post(file);
                        }
                    }, () => {});
                } else if (before !== false) {
                    this.post(file);
                } else {}
            },
            post(file) {
                this.onStart(file);
                let formData = new FormData();
                formData.append(this.name, file);
                ajax({
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: file,
                    data: this.data,
                    filename: this.name,
                    action: this.action,
                    onProgress: e => {
                        this.onProgress(e, file);
                    },
                    onSuccess: res => {
                        this.onSuccess(res, file);
                        this.success = true

                    },
                    onError: (err, response) => {
                        this.onError(err, response, file);
                        this.error = true
                    }
                });

            },
            onDrop(e) {
                this.dragOver = false;
                this.uploadFiles(e.dataTransfer.files);
            },
            handleClick() {
               
                    this.$refs.input.click();
                
            }
        }
    };
</script>