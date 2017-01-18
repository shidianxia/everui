<template>
    <div>
        <span>单选 只能上传图片类型</span>
    <div class="uploaddemo">
        <xupload
   action="//jsonplaceholder.typicode.com/posts/"
  type="drag"
  :thumbnail-mode="true"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :default-file-list="fileList"
>
</xupload>
    </div>
   
    <div>
        <span>多选。什么类型的文件都可以</span>
         <xupload
  action="//jsonplaceholder.typicode.com/posts/"
  type="drag"
  :multiple="true"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  :on-error="handleError"
  :default-file-list="fileList1"
>
</xupload>
</div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                // typestyle: {
                //     filePic: "companyPic"
                // },
                fileList1: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
                // alert(1111)
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>
<style>
    .uploaddemo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 100px auto
    }
</style>