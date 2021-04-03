<template>
  <div>
    <div class="test-title">
      <span>测试用例</span>
    </div>

    <el-container class="test-container">
      <el-aside class="test-aside">
        <el-tooltip content="You can double click on an item to turn it into a folder."
                    placement="right"
                    style="padding: 10px">
          <i class="el-icon-help"></i>
        </el-tooltip>
        <tree-items class="item"
                    :item="treeData"
                    @make-folder="makeFolder"
                    @add-item="addItem"></tree-items>
      </el-aside>

      <el-container>
        <el-main>
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="活动名称"
                          prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域"
                          prop="region">
              <el-select v-model="ruleForm.region"
                         placeholder="请选择活动区域">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间"
                          required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date"
                                  placeholder="选择日期"
                                  v-model="ruleForm.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间"
                                  v-model="ruleForm.date2"
                                  style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送"
                          prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质"
                          prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动"
                             name="type"></el-checkbox>
                <el-checkbox label="地推活动"
                             name="type"></el-checkbox>
                <el-checkbox label="线下主题活动"
                             name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光"
                             name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源"
                          prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式"
                          prop="desc">
              <el-input type="textarea"
                        v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TreeItems from '@/components/TreeItems'

export default {
  name: 'ComponentTest',
  components: {
    TreeItems,
  },
  data() {
    return {
      treeData: {
        name: 'My Root',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child 1-1',
            children: [
              {
                name: 'child 2-1',
                children: [{ name: 'hello' }, { name: 'wat' }],
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child 2-2',
                children: [{ name: 'hello' }, { name: 'wat' }],
              },
            ],
          },
        ],
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change',
          },
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    }
  },
  methods: {
    makeFolder: function (item) {
      this.$set(item, 'children', [])
      this.addItem(item)
    },
    addItem: function (item) {
      item.children.push({
        name: 'new stuff',
      })
      console.log(item.name, item.children)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.test-title {
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 8px;
}
.test-container {
  height: auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.test-aside {
  width: 300px;
  border-right: 1px solid #eee;
  background-color: rgba(144, 147, 153, 0.06);
}
</style>