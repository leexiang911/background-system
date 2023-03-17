<template>
  <div class="app-container">
    <span class="about-label">关于我</span>

    <el-input placeholder="请输入关于我的链接地址" v-model="urlData" :disabled="isDisabled" style="margin-bottom: 2rem;">
    </el-input>
    <el-button type="primary" @click="settingHandle" :disabled="btnIsDisabled">{{ btnContent }}
    </el-button>
  </div>
</template>

<script>
import { getAboutUrl, setAboutUrl } from '@/api/about'
export default {
  data() {
    return {
      urlData: "",
      isDisabled: true,//默认禁用
      btnContent: "编辑",
    }
  },
  computed: {
    btnIsDisabled() {
      return this.urlData === "" ? true : false;
    }
  },
  methods: {
    fetchData() {
      getAboutUrl().then((res) => {
        console.log(res)
        this.urlData = res.data
      });
    },
    settingHandle() {
      this.isDisabled = false;
      if (this.btnContent === "编辑") {
        this.btnContent = '确认';
      } else if (this.btnContent === "确认") {
        let urlString = this.urlData.replaceAll(" ", '')
        console.log(urlString)
        if (urlString === "") { this.$message.warning("请不要填写空格") } else {
          setAboutUrl({ url: this.urlData }).then(() => {
            this.$message.success("设置成功");
            this.btnContent = '编辑';
            this.isDisabled = true;
            this.fetchData();//重新拿数据
          });
        }
      }
    }

  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 3rem 5rem;
}

.about-label {
  font-size: 1.5rem;
  font-weight: 200;
  display: block;
  margin-bottom: 2rem;
}
</style>