<template>
  <div class="app-container">
    <!-- 表单 -->
    <div class="form">
      <span class="titleLable">网站信息</span>

      <span class="remark">网站标题</span>
      <div class="inputBox">
        <el-input v-model="formData.siteTitle" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">邮箱</span>
      <div class="inputBox">
        <el-input v-model="formData.mail" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">备案号</span>
      <div class="inputBox">
        <el-input v-model="formData.icp" :disabled="isDisabled"></el-input>
      </div>
      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>

      <span class="titleLable">网站头像信息</span>
      <div class="inputBox">
        <!-- <el-input v-model="formData.avatar2" :disabled="isDisabled"></el-input> -->
        <el-image style="width: 8rem;height: 8rem;" :src="formData.avatar"></el-image>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>

      <span class="titleLable">网站图标信息</span>
      <span class="remark">网站图标地址</span>
      <div class="inputBox">
        <el-input v-model="formData.favicon" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">网站图标预览</span>
      <div class="inputBox">
        <el-image :src="formData.favicon" style="widht: 8rem;height: 8rem;"></el-image>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>

      <span class="titleLable">Github信息</span>

      <span class="remark">Github名字</span>
      <div class="inputBox">
        <el-input v-model="formData.githubName" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">Github地址</span>
      <div class="inputBox">
        <el-input v-model="formData.github" :disabled="isDisabled"></el-input>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>

      <span class="titleLable">QQ信息</span>

      <span class="remark">QQ号码</span>
      <div class="inputBox">
        <el-input v-model="formData.qq" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">QQ号码二维码预览</span>
      <div class="inputBox">
        <el-image :src="formData.qqQrCode" style="width: 8rem;height: 8rem;"></el-image>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>

      <span class="titleLable">微信信息</span>
      <span class="remark">微信号</span>
      <div class="inputBox">
        <el-input v-model="formData.qq" :disabled="isDisabled"></el-input>
      </div>

      <span class="remark">微信号二维码预览</span>
      <div class="inputBox">
        <el-image :src="formData.weixinQrCode" style="width: 8rem;height: 8rem;"></el-image>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <hr>
      </div>


      <div class="inputBox">
        <div class="btn-container" style="padding: 2rem 0rem;">
          <el-button type="primary" @click="editClickHandle">进入编辑模式</el-button>
        </div>
      </div>
    </div>

    <!-- 编辑 -->
    <div class="edit">
      <el-dialog title="请编辑信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" fullscreen>
        <div class="dialog-content-container">

          <span class="editLabel">网站标题</span>
          <div class="inputBox">
            <el-input v-model="editData.siteTitle"></el-input>
          </div>

          <span class="editLabel">邮箱</span>
          <div class="inputBox">
            <el-input v-model="editData.mail"></el-input>
          </div>

          <span class="editLabel">备案号</span>
          <div class="inputBox">
            <el-input v-model="editData.icp"></el-input>
          </div>

          <span class="editLabel">网站头像地址</span>
          <div class="inputBox">
            <upload v-model="editData.avatar" />
          </div>

          <span class="editLabel">网站图标地址</span>
          <div class="inputBox">
            <el-input v-model="editData.favicon"></el-input>
          </div>

          <span class="editLabel">github名字</span>
          <div class="inputBox">
            <el-input v-model="editData.githubName"></el-input>
          </div>

          <span class="editLabel">github地址</span>
          <div class="inputBox">
            <el-input v-model="editData.github"></el-input>
          </div>

          <span class="editLabel">QQ号码</span>
          <div class="inputBox">
            <el-input v-model="editData.qq"></el-input>
          </div>

          <span class="editLabel">QQ二维码图片地址</span>
          <div class="inputBox">
            <upload v-model="editData.qqQrCode" />
          </div>

          <span class="editLabel">微信号</span>
          <div class="inputBox">
            <el-input v-model="editData.weixin"></el-input>
          </div>

          <span class="editLabel">微信二维码图片地址</span>
          <div class="inputBox">
            <upload v-model="editData.weixinQrCode" />
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEditSettingHandle">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSetting, reviseSetting } from '@/api/setting.js';
// import { server_URL } from '@/urlConfig';
import Upload from '@/components/Upload.vue';

export default {
  components: {
    upload: Upload,
  },
  data() {
    return {
      formData: {
        siteTitle: "",//网站标题
        mail: "",//网站邮箱
        icp: "",//备案号
        avatar: "",//网站头像地址
        favicon: "",//网站图标信息
        githubName: "",//github名字
        github: "",//github地址
        qq: "",//QQ号码
        weixin: "",//微信号
        qqQrCode: "",//qq二维码
        weixinQrCode: "",//微信二维码
      },
      editData: {
        siteTitle: "",//网站标题
        mail: "",//网站邮箱
        icp: "",//备案号
        avatar: "",//网站头像地址
        favicon: "",//网站图标信息
        githubName: "",//github名字
        github: "",//github地址
        qq: "",//QQ号码
        weixin: "",//微信号
        qqQrCode: "",//qq二维码
        weixinQrCode: "",//微信二维码
      },
      isDisabled: true,//是否禁用输入框
      dialogVisible: false,//是否显示dialog
    }
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        console.log(res.data)
        this.formData = res.data;
        //下面是处理一些图片的地址，前面需要拼接服务器的地址
        // this.formData.avatar2 = server_URL + this.formData.avatar;
        // this.formData.qqQrCode2 = server_URL + this.formData.qqQrCode;
        // this.formData.weixinQrCode2 = server_URL + this.formData.weixinQrCode;
        //提交给服务器的数据，稍作处理，并且删除多余的东西
        this.editData = { ...this.formData };
        // delete (this.editData.avatar2);
        // delete (this.editData.qqQrCode2);
        // delete (this.editData.weixinQrCode2);
      });
    },
    /* 点击编辑按钮的事件 */
    editClickHandle() {
      // 展开对话框
      this.dialogVisible = true;
    },
    /* 点击对话框的关闭按钮事件 */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    /* 确认修改 */
    confirmEditSettingHandle() {
      reviseSetting(this.editData).then((res) => {
        this.fetchData();
        this.$message.success("修改成功");
        this.dialogVisible = false;
      });
    }

  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.titleLable {
  padding: 1.5rem 2rem;
  font-size: 1.5rem;
  display: block;
}

.remark {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  color: #888;
  user-select: none;
  display: block;
}

.inputBox {
  padding: 0 2rem;
  margin-bottom: 1rem;
  width: 35vw;
}

.divider {
  padding: 0 2rem;
}

.dialog-content-container {
  padding: 0 5rem;
}

.editLabel {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  display: block;
  font-weight: bold;
}
</style>