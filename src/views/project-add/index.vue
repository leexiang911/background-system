<template>
  <div class="app-container">


    <el-form :model="formData" label-position="top" style="margin-bottom: 2rem;">
      <el-form-item label="项目名称">
        <el-input v-model="formData.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目描述(请用英文逗号分隔)">
        <el-input v-model="formData.description" placeholder="请输入项目描述"></el-input>
      </el-form-item>
      <el-form-item label="项目链接">
        <el-input v-model="formData.url" placeholder="请输入项目链接"></el-input>
      </el-form-item>
      <el-form-item label="Github地址">
        <el-input v-model="formData.github" placeholder="请输入项目地址"></el-input>
      </el-form-item>
      <el-form-item label="预览图">
        <upload v-model="formData.thumb" />
      </el-form-item>
      <el-form-item label="排序等级">
        <el-select v-model="formData.order" placeholder="请选择排序等级" @change="changeHandle">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="confirmHandle">发布项目</el-button>

  </div>

</template>

<script>
import Upload from '@/components/Upload.vue';//上传图片组件
import { addAproject } from '@/api/project'

export default {
  components: {
    upload: Upload,
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: ""
      },
      options: [
        { label: "1级", "value": 1 },
        { label: "2级", "value": 2 },
        { label: "3级", "value": 3 },
        { label: "4级", "value": 4 },
        { label: "5级", "value": 5 },
      ]
    }
  },
  methods: {
    //这是element-ui下拉列表的坑，需要绑定change事件来强制更新
    changeHandle() {
      this.$forceUpdate();
    },
    //发布事件
    confirmHandle() {
      if (this.formData.name && this.formData.order && this.formData.url && this.formData.github && this.formData.description) {
        let obj = { ...this.formData };
        obj.description = obj.description.split(',')
        addAproject(obj).then((res) => {
          this.$message.success("发布成功");
          this.formData = {
            name: "",
            description: "",
            url: "",
            github: "",
            thumb: "",
            order: ""
          }
          setTimeout(() => {
            this.$router.push({ name: "ProjectList" })
          }, 500);
        });
      } else {
        this.$message.error("填写有误,请检查 项目名、描述、链接地址等")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 2rem 5rem;
}
</style>