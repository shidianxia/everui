<script>
    import UploadList from './upload-list';
    import Upload from './upload';
    import IframeUpload from './iframe-upload';
    import ElProgress from '../../component/web-component-progress';

    function noop() {}

    export default {
        name: 'el-upload',

        components: {
            ElProgress,
            UploadList,
            Upload,
            IframeUpload
        },

        props: {
            action: {
                type: String,
                required: true
            },
            headers: {
                type: Object,
                default () {
                    return {};
                }
            },
            data: Object,
            multiple: Boolean,
            name: {
                type: String,
                default: 'file'
            },
            withCredentials: Boolean,
            thumbnailMode: Boolean,
            showUploadList: {
                type: Boolean,
                default: true
            },
            accept: String,
            type: {
                type: String,
                default: 'select'
            },
            beforeUpload: Function,
            onRemove: {
                type: Function,
                default: noop
            },
            onChange: {
                type: Function,
                default: noop
            },
            onPreview: {
                type: Function,
                default: noop
            },
            onSuccess: {
                type: Function,
                default: noop
            },
            onError: {
                type: Function,
                default: noop
            }
        },

        data() {
            return {
                fileList: [],
                dragOver: false,
                draging: false,
                tempIndex: 1
            };
        },

        methods: {
            handleStart(file) {
                file.uid = Date.now() + this.tempIndex++;
                let start = file.name.indexOf(".")
                file.filetype = file.name.substring(start)
                file.success = "no"
                let _file = {
                    status: 'uploading',
                    name: file.name,
                    size: file.size,
                    percentage: 0,
                    uid: file.uid,
                    filetype: file.filetype,
                    showProgress: true
                };

                if (this.thumbnailMode) {
                    try {
                        _file.url = URL.createObjectURL(file);
                    } catch (err) {
                        // console.log(err);
                        return;
                    }
                }
                this.fileList.push(_file);
            },
            handleProgress(ev, file) {
                var _file = this.getFile(file);
                _file.percentage = ev.percent || 0;
            },
            handleSuccess(res, file) {
                var _file = this.getFile(file);

                if (_file) {
                    _file.status = 'finished';
                    _file.response = res;

                    _file.success = "yes"
                    this.onSuccess(res, _file, this.fileList);

                    setTimeout(() => {
                        _file.showProgress = false;
                    }, 1000);
                }
            },
            handleError(err, response, file) {
                var _file = this.getFile(file);
                var fileList = this.fileList;

                _file.status = 'fail';

                fileList.splice(fileList.indexOf(_file), 1);
                this.onError(err, response, file);
            },
            handleRemove(file) {
                var fileList = this.fileList;
                fileList.splice(fileList.indexOf(file), 1);
                this.onRemove(file, fileList);
            },
            getFile(file) {
                var fileList = this.fileList;
                var target;
                fileList.every(item => {
                    target = file.uid === item.uid ? item : null;
                    return !target;
                });
                return target;
            },
            handlePreview(file) {
                if (file.status === 'finished') {
                    this.onPreview(file);
                }
            },
            clearFiles() {
                this.fileList = [];
            }
        },

        render(h) {
            var uploadList;

            if (this.showUploadList && !this.thumbnailMode && this.fileList.length) {
                uploadList = ( <
                    UploadList files = {
                        this.fileList
                    }
                    onRremove = {
                        this.handleRemove
                    }
                    onPreview = {
                        this.handlePreview
                    } >
                    <
                    /UploadList>
                );
            }

            var props = {
                props: {
                    type: this.type,
                    action: this.action,
                    multiple: this.multiple,
                    'before-upload': this.beforeUpload,
                    'with-credentials': this.withCredentials,
                    headers: this.headers,
                    name: this.name,
                    data: this.data,
                    accept: this.accept,
                    'on-start': this.handleStart,
                    'on-progress': this.handleProgress,
                    'on-success': this.handleSuccess,
                    'on-error': this.handleError,
                    'on-preview': this.handlePreview,
                    'on-remove': this.handleRemove
                },
                ref: 'upload-inner'
            };

            var uploadComponent = typeof FormData !== 'undefined' ?
                <
                upload {...props
                } > {
                    this.$slots.default
                } < /upload> : <
            iframeUpload {...props
            } > {
                this.$slots.default
            } < /iframeUpload>;

            if (this.type === 'select') {
                return ( <
                    div class = "el-upload" > {
                        uploadList
                    } {
                        uploadComponent
                    } {
                        this.$slots.tip
                    } <
                    /div>
                );
            }

            if (this.type === 'drag') {
                return ( <
                    div class = "el-upload" > {
                        uploadComponent
                    } {
                        this.$slots.tip
                    } {
                        uploadList
                    } <
                    /div>
                );
            }
        }
    };
</script>
<style>
    .ued-zlyadd {
        width: inherit;
        height: inherit;
    }
    
    .ued-ifsuccess {
        display: block;
    }
    
    .ued-ifsuccessicon {
        margin-top: 77px;
        width: 26px;
        height: 26px;
    }
    
    .ued-uploadsuccess {
        background-color: #fff;
        position: absolute;
        z-index: 9999999;
        width: inherit;
        height: inherit;
        top: 0;
        left: 0;
    }
    
    .ued-photodelete {
        width: 28px;
        height: 28px;
    }
    
    .el-dragger__cover p {
        /*font-family: PingFangSC-Regular;*/
        font-size: 14px;
        color: #546472;
        line-height: 14px;
        margin: 0
    }
    
    .ued-hangsimpphoto {
        height: 34px;
        width: 100%
    }
    
    .ued-editphoto {
        margin-left: 20px;
    }
    
    .ued-addprogress {
        padding-left: 30px;
    }
    
    .ued-photolist {
        position: fixed;
        overflow-y: auto;
        overflow-x: hidden;
        height: inherit;
        width: inherit;
    }
    
    .ued-addmult {
        margin-top: 20px !important;
    }
    
    .ued-simphotoname {
        float: left;
        text-align: left;
        margin-left: 5px;
    }
    
    .ued-adddelete {
        /*margin-top: 5px;*/
    }
    
    .ued-simpphoto {
        position: relative;
        margin-top: 10px;
        clear: both;
    }
    
    .uploaddemo_zly {
        width: 26px;
        height: 26px;
        fill: #D8D8D8;
        margin-top: 77px;
        /*display: flex;*/
        /*align-items: center;*/
        justify-content: center
    }
    
    .el-dragger__text {
        margin-top: 14px;
    }
    
    .ued-multfile {
        margin-left: 10px;
        width: 90%;
    }
    
    .ued-addsize {
        padding-left: 4px;
    }
    
    .ued-filefile {
        margin-left: 10px
    }
    
    .el-upload__file__name p {
        padding-left: 30px;
        margin-top: -10px;
        /*font-family: PingFangSC-Regular;*/
        font-size: 14px;
        color: #546472;
        line-height: 14px;
        margin-left: 0;
    }
    
    .ued-filesize {
        font-size: 12px;
        color: #A4ACB4;
        line-height: 14px;
    }
    
    .ued-filetype {
        fill: #63a2e6;
        width: 26px;
        height: 38px;
        float: left;
    }
    
    .el-dragger__cover__title,
    .el-upload__file {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    
    .el-dragger__cover:after,
    .el-progress-bar__inner:after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle
    }
    
    .el-progress {
        position: relative;
        line-height: 1
    }
    
    .el-progress.is-exception .el-progress-bar__inner {
        background-color: #ff4949
    }
    
    .el-progress.is-exception .el-progress__text {
        color: #ff4949
    }
    
    .el-progress.is-success .el-progress-bar__inner {
        background-color: #13ce66
    }
    
    .el-progress.is-success .el-progress__text {
        color: #13ce66
    }
    
    .el-progress__text {
        font-size: 14px;
        color: #475669;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        line-height: 1
    }
    
    .el-progress__text i {
        vertical-align: middle;
        display: block
    }
    
    .el-progress--circle {
        display: inline-block
    }
    
    .el-progress--circle .el-progress__text {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 0;
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%)
    }
    
    .el-progress--circle .el-progress__text i {
        vertical-align: middle;
        display: inline-block
    }
    
    .el-progress--without-text .el-progress__text {
        display: none
    }
    
    .el-progress--without-text .el-progress-bar {
        padding-right: 0;
        margin-right: 0;
        display: block
    }
    
    .el-progress--text-inside .el-progress-bar {
        padding-right: 0;
        margin-right: 0
    }
    
    .el-progress-bar {
        padding-right: 50px;
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        margin-right: -55px;
        box-sizing: border-box
    }
    
    .el-progress-bar__outer {
        height: 6px;
        border-radius: 100px;
        background-color: #e5e9f2;
        overflow: hidden;
        position: relative;
        vertical-align: middle
    }
    
    .el-progress-bar__inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: #20a0ff;
        text-align: right;
        border-radius: 100px;
        line-height: 1
    }
    
    .el-dragger,
    .el-dragger+.el-upload__tip {
        text-align: center
    }
    
    .el-progress-bar__innerText {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 12px;
        margin: 0 5px
    }
    
    @keyframes progress {
        0% {
            background-position: 0 0
        }
        100% {
            background-position: 32px 0
        }
    }
    
    .el-upload {
        position: relative;
        height: 180px;
        overflow: auto;
        width: 360px
    }
    
    .el-upload__input {
        display: none
    }
    
    .el-upload__inner {
        display: inline-block;
        position: relative
    }
    
    .el-upload__inner iframe {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        opacity: 0;
        filter: alpha(opacity=0)
    }
    
    .el-upload__files {
        margin: 0 0 10px;
        padding: 0;
        list-style: none
    }
    
    .el-upload__file {
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        font-size: 14px;
        color: #475669;
        /*line-height: 32px;*/
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        position: relative
    }
    
    .el-upload__file a {
        color: #475669;
        transition: color .3s;
        padding-left: 4px
    }
    
    .el-upload__file a [class^=el-icon] span {
        display: inline-block;
        color: #546472;
        font-size: 14px;
        /*font-family: Arial;*/
        line-height: inherit;
    }
    
    .el-upload__file a [class^=el-icon] {
        float: left;
        color: #546472;
        margin-right: 7px;
        height: 14px;
        /*font-size: 14px;*/
        /*line-height: inherit*/
    }
    
    .el-upload__file .el-progress-bar {
        margin-right: 0;
        padding-right: 0
    }
    
    .el-upload__file .el-progress {
        position: absolute;
        bottom: -3px;
        width: 100%
    }
    
    .el-upload__file .el-progress__text {
        position: absolute;
        top: -10px;
        right: 0
    }
    
    .el-upload__file:hover {
        background-color: #eff2f7
    }
    
    .el-upload__file.is-finished a:hover {
        color: #20a0ff;
        cursor: pointer
    }
    
    .el-upload__file.is-finished:hover .el-upload__btn-delete {
        display: block;
        cursor: pointer;
        z-index: 999999;
        
    }
    
    .ued-simpphoto:hover {
        width: 99%;
        height: 34px;
        background-color: #F5F6F6;
    }
    
    .ued-simpphoto:hover .el-upload__btn-delete {
        display: block;
        cursor: pointer;
        z-index: 999999;
    }
    
    .el-upload__tip {
        font-size: 12px;
        color: #8492a6;
        margin-top: 7px
    }
    
    .el-upload__btn-delete {
        position: absolute;
        right: 5px;
        top: 3px;
        font-size: 12px;
        line-height: 34px;
        color: #20a0ff;
        display: none;
         z-index: 9999999999999999;
    }
    
    .el-dragger {
        /*background-color: #f9fafc;*/
        border: 1px solid #c0ccda;
        box-sizing: border-box;
        width: 360px;
        height: 180px;
        border-radius: 4px;
        cursor: pointer;
        position: absolute;
        overflow: hidden
    }
    
    .el-dragger .el-upload__inner {
        display: block;
        height: 100%
    }
    
    .el-dragger .el-icon-upload {
        font-size: 67px;
        color: #99a9bf;
        margin: 40px 0 16px;
        line-height: 50px
    }
    
    .el-dragger~.el-upload__files {
        margin-top: 7px;
        padding-top: 5px;
        /*border-top: 1px solid rgba(192, 204, 218, .2)*/
    }
    
    .el-dragger:not(.is-showCover):hover .uploaddemo_zly {
        fill: #20a0ff
    }
    
    .el-dragger:not(.is-showCover):hover {
        border-color: #20a0ff;
    }
    
    .el-dragger.is-dragOver {
        background-color: rgba(32, 159, 255, .06);
        border: 2px dashed #20a0ff
    }
    
    .el-dragger__cover {
        width: 100%;
        height: 100%;
        overflow: auto;
        cursor: default
    }
    
    .el-dragger__cover img {
        display: block;
        width: 100%;
        height: auto
    }
    
    .el-dragger__cover+.el-upload__inner {
        opacity: 0;
        position: relative;
    }
    
    .ued-continuebtn {
        cursor: pointer;
        display: block;
        position: absolute;
        left: 42%;
        bottom: 10px;
        z-index: 9999;
        font-size: 12px;
        color: #2088EC;
        line-height: 12px;
        z-index: 9999;
        /*font-family: Light;*/
    }
    
    .el-dragger__cover__progress {
        display: inline-block;
        vertical-align: middle;
        position: static;
        width: 243px;
        /*margin-left: -40px;*/
    }
    
    .el-dragger__cover__progress+.el-upload__inner {
        opacity: 0
    }
    
    .el-dragger__cover__content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%
    }
    
    .el-dragger__cover__interact {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .72);
        text-align: center
    }
    
    .el-dragger__cover__interact .btn {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        vertical-align: middle;
        transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
        margin-top: 60px
    }
    
    .el-dragger__cover__interact .btn span {
        opacity: 0;
        transition: opacity .15s linear
    }
    
    .el-dragger__cover__interact .btn:not(:first-child) {
        margin-left: 35px
    }
    
    .el-dragger__cover__interact .btn:hover {
        -ms-transform: translateY(-13px);
        transform: translateY(-13px)
    }
    
    .el-dragger__cover__interact .btn:hover span {
        opacity: 1
    }
    
    .el-dragger__cover__interact .btn i {
        color: #fff;
        display: block;
        font-size: 24px;
        line-height: inherit;
        margin: 0 auto 5px
    }
    
    .el-dragger__cover__title {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fff;
        height: 36px;
        width: 100%;
        font-weight: 400;
        text-align: left;
        padding: 0 10px;
        margin: 0;
        line-height: 36px;
        font-size: 14px;
        color: #475669
    }
    
    .el-dragger__text {
        color: #99a9bf;
        font-size: 14px;
        text-align: center
    }
    
    .el-dragger__text em {
        color: #20a0ff;
        font-style: normal
    }
    svg #icon-o-error path:nth-of-type(1) {
        fill: #FEF0EF
    }
    svg #icon-o-error path:nth-of-type(2) {
        fill: #F56960
    }
    svg #icon-o-error path:nth-of-type(3) {
        fill: #F56960
    }
</style>