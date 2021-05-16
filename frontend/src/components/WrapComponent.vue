<template>
  <div class="page-wrap">
    <!-- 顶部按钮 -->
    <div style="margin-right: 10px">
      <slot name="projectEnv"></slot>
    </div>
    <div class="control-list"
         v-if="showOperateCont">
      <slot name="operate"></slot>
    </div>

    <!-- 顶部信息 -->
    <div class="content-info">
      <template v-if="searchLayout === 2">
        <!-- 上下布局 -->
        <div class="content-header">
          <div class="info-name">{{ tableTitle }}</div>
        </div>
        <slot name="form"></slot>
      </template>
      <div class="content-header clear"
           v-else>
        <!-- 左右布局 -->
        <div class="self-left info-name">{{ tableTitle }}</div>
        <div class="self-right">
          <slot name="form"></slot>
        </div>
      </div>
      <!-- 表格和操作列 -->
      <div class="content-table">
        <slot name="table"></slot>
      </div>
      <!-- 底部分页 -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrapComponent',
  props: {
    tableTitle: {
      type: String,
      default: '全部内容',
    },
    searchLayout: {
      type: Number,
      default: 2,
    },
    showOperateCont: {
      type: Boolean,
      default: true,
    },
  },
}
</script>