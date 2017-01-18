<template>
    <div class="demo1">
     <h1>DemoList</h1>
     <div class="form">
         <h3>Form</h3><br>
         <ul>
           <li><input type="button" value="radio" @click="radiodemo"></li>
           <li><input type="button" value="button" @click="buttondemo"></li>
           <li><input type="button" value="input" @click="inputdemo"></li>
           <li><input type="button" value="textarea" @click="textareademo"></li>
           <li><input type="button" value="lable" @click="labledemo"></li>
           <li><input type="button" value="checkbox" @click="checkboxdemo"></li>
           <li><input type="button" value="select" @click="selectdemo"></li>
         </ul>
     </div>
     <div class="data">
         <h3>Data</h3><br>
         <ul>
           <li><input type="button" value="table" @click="tabledemo"></li>
           <li><input type="button" value="switch" @click="switchdemo"></li>
           <li><input type="button" value="inputnumber" @click="inputnumberdemo"></li>
           <li><input type="button" value="calendar" @click="calendardemo"></li>
           <li><input type="button" value="autocomplete" @click="autocompletedemo"></li>
           <li><input type="button" value="range" @click="rangedemo"></li>
           <li><input type="button" value="rate" @click="ratedemo"></li>
           <li><input type="button" value="upload" @click="uploaddemo"></li>
           <li><input type="button" value="multselect" @click="multselectdemo"></li>
         </ul>
     </div>
      <div class="Layer">
         <h3>Layer</h3><br>
         <ul>
           <li><input type="button" value="layer" @click="layerdemo"></li>
         </ul>
     </div>
      <div class="component">
         <h3>component</h3><br>
         <ul>
           <li><input type="button" value="progress" @click="progressdemo"></li>
           <li><input type="button" value="tabs" @click="tabsdemo"></li>
           <li><input type="button" value="menu" @click="menudemo"></li>
           <li><input type="button" value="page" @click="pagedemo"></li>
           <li><input type="button" value="badge" @click="badgedemo"></li>
           <li><input type="button" value="dropdown" @click="dropdowndemo"></li>
         </ul>
     </div>
      <div class="basic">
         <h3>basic</h3><br>
         <ul>
           <li><input type="button" value="grid" @click="griddemo"></li>
         </ul>
     </div>
     <router-view></router-view>
    </div>
      
</template>

<script>
    export default {
        methods: {
            uploaddemo() {
                this.$router.push('/upload')
            },
            pagedemo() {
                this.$router.push('/dpage')
            },
            autocompletedemo() {
                this.$router.push('/dautocomplete')
            },
            calendardemo() {
                this.$router.push('/dcalendar')
            },
            selectdemo() {
                this.$router.push('/dselect')
            },
            checkboxdemo() {
                this.$router.push('/dcheckbox')
            },
            layerdemo() {
                this.$router.push('/layer')

            },
            labledemo() {
                this.$router.push('/dlable')
            },
            textareademo() {
                this.$router.push('/dtextarea')
            },
            inputdemo() {
                this.$router.push('/dinput')
            },
            radiodemo() {
                this.$router.push('/dradio')
            },
            buttondemo() {
                this.$router.push('/dbutton')
            },
            tabledemo() {
                this.$router.push('/dtable')
            },
            switchdemo() {
                this.$router.push('/dswitch')
            },
            inputnumberdemo() {
                this.$router.push('/dinputnumber')
            },
            rangedemo() {
                this.$router.push('/drange')
            },
            ratedemo() {
                this.$router.push('/drate')
            },
            progressdemo() {
                this.$router.push('/dprogress')
            },
            griddemo() {
                this.$router.push('/dgrid')
            },
            tabsdemo() {
                this.$router.push('/dtabs')
            },
            multselectdemo() {
                this.$router.push('/dmultselect')
            },
            menudemo() {
                this.$router.push('/dmenu')
            },
            badgedemo() {
                this.$router.push('/dbadge')
            },
            dropdowndemo() {
                this.$router.push('/ddropdown')
            }
        }
    }
</script>
<style scoped="scoped">
    .demo1 {
        /*margin: 0 auto;*/
        width: 80%;
        display: flex;
        justify-content: center;
    }
    
    * {
        padding: 0;
        margin: 0;
        list-style-type: none
    }
    
    body,
    html {
        text-align: center;
    }
    
    h1 {
        text-align: center;
    }
    
    div {
        margin-left: 10px;
    }
    
    .form,
    .data,
    .Layer,
    .component,
    .basic {
        margin: 50px;
        float: left;
        /*align-items: center;*/
        /*justify-content: center;*/
    }
    
    input[type='button'] {
        margin-top: 10px;
        width: 100px;
        height: 30px;
        color: #000000;
        border: 1px solid #5ABA69;
        border-radius: 5px;
        background: #5ABA69;
        &:hover {
            background: #77D388;
            border: 1px solid #77D388;
        }
        &:active {
            background: #51A75E;
            border: 1px solid #51A75E;
        }
    }
</style>