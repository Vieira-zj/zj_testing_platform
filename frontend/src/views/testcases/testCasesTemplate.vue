<template>
  <div>
    <div class="test-title">
      <span>测试用例集</span>
    </div>
    <!-- test cases tree -->
    <el-container class="test-container">
      <el-aside class="test-aside" width="25%">
        <slot name="testcasesTree"></slot>
      </el-aside>
      <!-- test case form -->
      <el-container>
        <el-main>
          <slot name="testcaseForm"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'TestCasesTemplate',
}
</script>

<style lang="scss" scoped>
.test-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}
.test-container {
  height: auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.test-aside {
  border-right: 1px solid #eee;
  background-color: rgba(144, 147, 153, 0.06);
}
</style>
