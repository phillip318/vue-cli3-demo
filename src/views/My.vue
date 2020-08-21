<template>
  <div class="my-container">
    <div id="main_content_wrap" class="outer">
      <section id="main_content" class="inner">
        <h5>画板  <input type="button" value="保存" @click="save"/></h5>
        <div style="text-align: center">
					<canvas class="sketchpad" ref="sketchpad" id="sketchpad"></canvas>
				</div>
        <div class="color-line">
          <span>颜色:</span>
          <input v-model="color" type="color">
          <span>画笔大小:</span>
          <input v-model="size" type="range" min="1" max="20">
        </div>
			</section>
			<van-overlay :show="show" @click="show = false">
				<div style="width: 100%;height: 100%; background: white">
					<img :src="src" alt="" style="width: 100%; height: 100%">
				</div>
			</van-overlay>
    </div>
  </div>
</template>
<script>
  // 创建sketchpad面向对象
  import Sketchpad from './sketchpad'
  export default {
    name: 'My',
    data () {
      return {
        sketchpad: null,
        color: '#000000',
				size: 1,
				src: [],
				show: false
      }
    },
    created () {
      console.log('My created')
    },
    watch: {
      'color' : function (newVal, oldVal) {
        this.sketchpad.color = newVal
      },
      'size' : function (newVal, oldVal) {
        this.sketchpad.penSize = newVal
      }
    },
    mounted () {
      this.sketchpad = new Sketchpad({
				element: '#sketchpad',
				width: 320,
				height: 500,
			});
      this.sketchpad.reset()
      this.sketchpad.change()
      let canvas = this.sketchpad.canvas
			let ctx = canvas.getContext("2d");
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		},
		beforeDestroy () {
		},
    methods: {
			save () {
				var myCanvas = this.$refs.sketchpad
				this.src = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
				this.show = true
				console.log(this.src)
			}
    }
  }
</script>
<style lang="less" scoped>
 body,html {
	font-size:100%;
	padding:0;
	margin:0;
}
/* Reset */
*,*:after,*:before {
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	box-sizing:border-box;
}
.clearfix:before,.clearfix:after {
	content:" ";
	display:table;
}
.clearfix:after {
	clear:both;
}
body {
	background:#494A5F;
	color:#D5D6E2;
	font-weight:500;
	font-size:1.05em;
	font-family:"Microsoft YaHei","宋体","Segoe UI","Lucida Grande",Helvetica,Arial,sans-serif,FreeSans,Arimo;
}
a {
	color:#2fa0ec;
	text-decoration:none;
	outline:none;
}
a:hover,a:focus {
	color:#74777b;
}
/*nav*/
button {
	display:inline-block;
	margin:0.5em;
	padding:0.6em 1em;
	border:3px solid #fff;
	font-weight:700;
	background:#1d7db1;
	color:#fff;
}
.center {
	text-align:center;
}
h5 {
	width:100%;
	padding:0;
	margin:0;
	font-size:24px;
	text-align:center;
	height:40px;
	line-height:40px;
}
.sketchpad {
	background:#FFF;
	width:320px;
	height:500px;
	border-radius:2px;
	-webkit-box-shadow:2px 2px 5px 0px rgba(50,50,50,0.75);
	-moz-box-shadow:2px 2px 5px 0px rgba(50,50,50,0.75);
	box-shadow:2px 2px 5px 0px rgba(50,50,50,0.75);
}
.color-line {
	text-align:center;
	height:50px;
	line-height:50px;
}
.color-line input {
	vertical-align:middle;
}
.color-line span {
	font-size:18px;
}
</style>