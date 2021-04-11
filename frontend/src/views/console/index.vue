<template>
  <!-- 左侧导航栏 -->
  <nav-left>
    <div slot="menuItem">
      <el-menu-item index="/console/userManagement">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </div>
  </nav-left>
</template>

<script>
import NavLeft from '@/components/NavLeft'

export default {
  components: {
    NavLeft,
  },
}
</script>
