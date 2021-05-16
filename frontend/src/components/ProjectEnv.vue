<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="项目"
                    v-if="showProject">
        <!-- @change在切换下拉选项时调用 @click.native指在点击打开时获取数据 -->
        <el-select v-model="curProjectName"
                   @change="changeProject"
                   @click.native="getProjectList">
          <el-option v-for="(item, index) in projectList"
                     :key="index"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="环境"
                    v-if="showEnv">
        <el-select v-model="curEnvName"
                   @change="changeEnv"
                   @click.native="getEnvList">
          <el-option v-for="(item, index) in envList"
                     :key="index"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProjectEnv',
  props: {
    showProject: {
      type: Boolean,
      default: true,
    },
    showEnv: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      projectEnvList: [],
      projectList: [],
      envList: [],
      curProjectId: '',
      curProjectName: '',
      curEnvName: '',
    }
  },
  created() {
    this.getProjectEnv()
    this.getCurProjectEnv()
  },
  methods: {
    getProjectEnv() {
      // 环境和项目数据从localStorage中读取
      let localProjectEnvList = JSON.parse(
        localStorage.getItem('projectEnvList')
      )
      if (localProjectEnvList) {
        this.projectEnvList = localProjectEnvList
      }
    },
    getCurProjectEnv() {
      let localCurProjectEnv = JSON.parse(localStorage.getItem('curProjectEnv'))
      if (localCurProjectEnv) {
        this.curProjectId = localCurProjectEnv.curProjectId
        this.curProjectName = localCurProjectEnv.curProjectName
        this.curEnvName = localCurProjectEnv.curEnvName
      }
    },
    getProjectList() {
      let projectList = []
      this.projectEnvList.forEach((item) => {
        projectList.push(item.projectName)
      })
      this.projectList = projectList
    },
    getEnvList() {
      this.projectEnvList.forEach((item) => {
        if (item.projectId === this.curProjectId) {
          this.envList = item.envList
        }
      })
    },
    changeProject(val) {
      this.curProjectName = val
      this.projectEnvList.forEach((item) => {
        if (item.projectName === this.curProjectName) {
          this.curProjectId = item.projectId
        }
      })
      let curProjectEnv = {}
      curProjectEnv['curProjectId'] = this.curProjectId
      curProjectEnv['curProjectName'] = this.curProjectName
      this.getEnvList()
      this.curEnvName = this.envList[0]
      curProjectEnv['curEnvName'] = this.curEnvName
      localStorage.setItem('curProjectEnv', JSON.stringify(curProjectEnv))
      this.$emit('changeProject')
    },
    changeEnv(val) {
      this.curEnvName = val
      let curProjectEnv = {}
      curProjectEnv['curProjectId'] = this.curProjectId
      curProjectEnv['curProjectName'] = this.curProjectName
      curProjectEnv['curEnvName'] = this.curEnvName
      localStorage.setItem('curProjectEnv', JSON.stringify(curProjectEnv))
      this.$emit('changeEnv')
    },
  },
}
</script>

<style scoped></style>
