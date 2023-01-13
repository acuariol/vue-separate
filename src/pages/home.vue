<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const leftWidth = ref(250);
const offsetTop = ref(200);
const innerWidth = ref(0);
const innerHeight = ref(0);


const onmouseup = () => {

  document.onmousemove = null;
  document.onmouseup = null;
};
const onmousemove = (evt: MouseEvent) => {
  const { clientX } = evt;

  if (clientX <= 100) return;

  if (innerWidth.value - clientX <= 100) return;
  leftWidth.value = clientX;
};
const onmouseup2 = () => {

  document.onmousemove = null;
  document.onmouseup = null;
};
const onmousemove2 = (evt: MouseEvent) => {
  const { clientY } = evt;

  if (clientY <= 100) return;

  if (innerHeight.value - clientY <= 100) return;
  offsetTop.value = clientY;
};


const onmousedown = () => {

  document.onmousemove = onmousemove;
  document.onmouseup = onmouseup;

};

const onmousedown2 = () => {

  document.onmousemove = onmousemove2;
  document.onmouseup = onmouseup2;
};


const getWindowRect = () => {
  innerHeight.value = window.innerHeight;
  innerWidth.value = window.innerWidth;


  if (innerHeight.value - offsetTop.value <= 100) {
    offsetTop.value = innerHeight.value-100
  }

  if (innerWidth.value - leftWidth.value <= 100) {
    leftWidth.value = innerWidth.value-100
  }



};
onMounted(() => {
  getWindowRect();
  window.addEventListener('resize', getWindowRect);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', getWindowRect);
});
</script>

<template>
  <div class="container">
    <div
        class="left-drag" @mousedown="onmousedown"
        :style="`transform:translate(${leftWidth-10}px,0)`"
    ></div>
    <div
        class="bottom-drag"
        @mousedown="onmousedown2"
        :style="`transform:translate(0,${offsetTop-10}px);width:calc(100vw - ${leftWidth-10}px);left:${leftWidth-10}px`"
    ></div>
    <div class="left" :style="{width:leftWidth+'px'}">
    </div>

    <div class="right">
      <div class="content" :style="`height:${offsetTop}px`">
      </div>
      <div class="footer">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'home'
};
</script>

<style lang="scss" scoped>

.left-drag {

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: #57C8FF;
  user-select: none;
  cursor: col-resize;

}

.bottom-drag {
  position: absolute;
  left: 0;
  top: 0;
  height: 10px;
  background: #57C8FF;
  user-select: none;
  cursor: row-resize;
}

.container {
  background: pink;

  height: 100vh;

  display: flex;

  position: relative;
}

.left {
  width: 300px;
  background: aqua;

}

.right {
  flex: 1;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.content {
  background: #fff;

}

.footer {
  background: red;
  flex: 1;
}

</style>
