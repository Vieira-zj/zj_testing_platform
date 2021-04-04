<template>
  <div>
    <div class="test-title">
      <span>测试用例</span>
    </div>

    <!-- test cases tree -->
    <el-container class="test-container">
      <el-aside class="test-aside"
                width="25%">
        <el-tooltip content="You can double click on an item to turn it into a folder."
                    placement="top">
          <i class="el-icon-help op-icon"></i>
        </el-tooltip>
        <el-tooltip content="Expand All"
                    placement="top">
          <i class="el-icon-s-unfold op-icon"
             @click="unfoldAll"></i>
        </el-tooltip>
        <el-tooltip content="Collapse All"
                    placement="top">
          <i class="el-icon-s-fold op-icon"
             @click="foldAll"></i>
        </el-tooltip>
        <tree-item class="item"
                   :item="treeData"
                   @focus-item="focusItem"
                   @make-folder="makeFolder"
                   @add-item="addItem"
                   @remove-item="removeItem"
                   style="margin-left: 5px"></tree-item>
      </el-aside>

      <!-- test case form -->
      <el-container>
        <el-main>
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
import TreeItem from '@/components/TreeItem'

let mockTreeData = {
  name: 'My Root',
  children: [
    { name: 'hello1' },
    { name: 'wat1' },
    {
      name: 'child 1-1',
      children: [
        {
          name: 'child 2-1',
          children: [{ name: 'hello2' }, { name: 'wat2' }],
        },
        { name: 'hello3' },
        { name: 'wat3' },
        {
          name: 'child 2-2',
          children: [{ name: 'hello4' }, { name: 'wat4' }],
        },
      ],
    },
  ],
}

let initTreeData = function () {
  let setTreeDataStatus = function (root) {
    root.select = false
    if (!root.children || root.children.length === 0) {
      return false
    }

    root.open = false
    for (let i = 0; i < root.children.length; i++) {
      setTreeDataStatus(root.children[i])
    }
  }

  setTreeDataStatus(mockTreeData)
  mockTreeData.select = true
}

initTreeData()

export default {
  name: 'ComponentTest',
  components: {
    TreeItem,
  },
  data() {
    return {
      treeData: mockTreeData,
      selectedItem: mockTreeData,
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
    focusItem(item) {
      this.selectedItem.select = false
      item.select = true
      this.selectedItem = item
      // TODO: fetch test case details
      this.ruleForm.name = item.name
    },
    makeFolder(item) {
      this.$set(item, 'children', [])
      this.addItem(item)
    },
    addItem(item) {
      item.children.push({
        name: 'new stuff',
      })
      item.open = true
    },
    removeItem(item) {
      // 注意：删除一个元素后，会导致列表后面的元素重新加载（mount），item状态被重置。
      this.removeItemFromTree(this.treeData, item)
      if (this.ruleForm.name === item.name) {
        this.ruleForm.name = ''
      }
    },
    removeItemFromTree(root, item) {
      if (!root.children || root.children.length === 0) {
        return false
      }

      for (let i = 0; i < root.children.length; i++) {
        let child = root.children[i]
        if (child.name === item.name) {
          root.children.splice(i, 1)
          return true
        }
        if (this.removeItemFromTree(child, item)) {
          return true
        }
      }
    },
    foldAll() {
      let unfold = function (item) {
        item.open = false
      }
      this.iterateTreeItem(this.treeData, unfold)
    },
    unfoldAll() {
      let unfold = function (item) {
        item.open = true
      }
      this.iterateTreeItem(this.treeData, unfold)
    },
    iterateTreeItem(root, handler) {
      if (!root.children || root.children.length === 0) {
        return false
      }

      handler(root)
      for (let i = 0; i < root.children.length; i++) {
        this.iterateTreeItem(root.children[i], handler)
      }
    },
    submitForm(formName) {
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.op-icon {
  margin: 5px;
}
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