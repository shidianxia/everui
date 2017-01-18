<template> 
    <div class="container">
        <xrow>
          <xcol :span="4"><div class="grid">4/12</div></xcol>
          <xcol :span="4"><div class="grid">4/12</div></xcol>
          <xcol :span="4"><div class="grid">4/12</div></xcol>
        </xrow>
        <xrow>
          <xcol :span="3"><div class="grid">3/12</div></xcol>
          <xcol :span="3"><div class="grid">3/12</div></xcol>
          <xcol :span="3"><div class="grid">3/12</div></xcol>
          <xcol :span="3"><div class="grid">3/12</div></xcol>
        </xrow>
        <xrow>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
          <xcol :span="2"><div class="grid">2/12</div></xcol>
        </xrow>
        <xrow>
          <xcol :span="7"><div class="grid">7/12</div></xcol>
          <xcol :span="5"><div class="grid">5/12</div></xcol>
        </xrow>
        <xrow>
          <xcol :span="12"><div class="grid">12/12</div></xcol>
        </xrow>
    </div>  
</template>
<style scoped>
  .container {
    width: 90%;
    margin: 20px auto;
  }
  /*自定义行间距*/
  .row {
    margin-bottom: 40px;
  }
  /*自定义列样式*/
  .grid {
    min-height: 54px;
    background: #546472;
    text-align: center;
    color: #FFFFFF;
    vertical-align: middle;
    line-height: 54px;
  }
</style>  