<template>
  <div>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="用例名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="目标区域"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择目标区域">
          <el-option label="上海"
                     value="shanghai"></el-option>
          <el-option label="北京"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自动化"
                    prop="auto">
        <el-switch v-model="ruleForm.auto"></el-switch>
      </el-form-item>
      <el-form-item label="所属模块"
                    prop="module">
        <el-checkbox-group v-model="ruleForm.module">
          <el-checkbox label="Payment"
                       name="module"></el-checkbox>
          <el-checkbox label="Wallet"
                       name="module"></el-checkbox>
          <el-checkbox label="Merchant"
                       name="module"></el-checkbox>
          <el-checkbox label="Promotion"
                       name="module"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用例类型"
                    prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="后端（BE）"></el-radio>
          <el-radio label="前端（FE）"></el-radio>
          <el-radio label="Android"></el-radio>
          <el-radio label="IOS"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用例步骤"
                    prop="desc">
        <el-input type="textarea"
                  placeholder="请输入内容"
                  v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmitForm('ruleForm')">立即创建</el-button>
        <el-button @click="onResetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TestCaseForm',
  props: {
    tcName: String,
  },
  watch: {
    tcName() {
      this.ruleForm.name = this.tcName
    },
    ruleForm: {
      handler(val) {
        if (val.name) {
          this.$emit('tc-name-change', val.name)
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        auto: false,
        module: [],
        type: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用例名称', trigger: 'blur' },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'blur',
          },
        ],
        region: [
          { required: true, message: '请选择目标区域', trigger: 'change' },
        ],
        module: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个模块',
            trigger: 'change',
          },
        ],
        type: [{ required: true, message: '请选择用例', trigger: 'change' }],
        desc: [{ required: true, message: '请填写用例步骤', trigger: 'blur' }],
      },
    }
  },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: 'submit',
            type: 'success',
          })
          alert()
        } else {
          this.$message.error('error submit!')
          return false
        }
      })
    },
    onResetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
