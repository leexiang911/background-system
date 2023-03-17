<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="data" v-loading="loading" border width="100%" hightlight-current-row>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope"><a class="projectName" :href="scope.row.url" target="_blank">{{ scope.row.name
        }}</a></template>
      </el-table-column>

      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{ scope.row.description.toString() }}</template>
      </el-table-column>

      <el-table-column label="预览图" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; max-height: 200px;user-select: none;" :src="scope.row.thumb" fit="fit"
            :preview-src-list="imagePreviewList"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">

        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github" placement="top" :hide-after="2000">
            <el-button icon="el-icon-link" class="elbutton" circle size="mini" @click="openGithubHandle(scope.row)">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="info" icon="el-icon-edit" circle size="mini" @click="editProjectHandle(scope.row)">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteProjectHandle(scope.row)">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>


    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog title="请编辑该项目信息" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">

      <!-- 表单 -->
      <div class="form-container">
        <el-form :model="formData" style="font-size: 1.3rem;" label-position="top">
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
      </div>


      <span slot="footer" class="dialog-footer" style="display: block;margin-right: 10rem;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { getAllProject, deleteAproject, reviseAproject } from '@/api/project';
// import { server_URL } from '@/urlConfig.js';

import Upload from '@/components/Upload.vue';//上传图片组件


export default {
  components: {
    upload: Upload,
  },
  data() {
    return {
      loading: true,
      data: [],
      imagePreviewList: [],//图片预览素组

      //编辑框默认不打开
      dialogVisible: false,
      formData: {
        description: "",
        github: "",
        id: "",
        name: "",
        order: "",
        thumb: "",
        url: "",
        id: "",
      },//表单数据，默认为空
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
    //获取所有数据
    fetchData() {
      getAllProject().then((res) => {
        this.data = res.data;
        for (const item of res.data) {
          //数据里面没有thumb2，这是处理过的链接
          // item.thumb2 = `${server_URL}${item.thumb}`;//处理图片的url地址
          this.imagePreviewList.push(item.thumb);
        }
        this.loading = false;
      });
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    //打开github（链接）
    openGithubHandle(projectInfo) {
      window.open(projectInfo.github)
    },

    //编辑按钮
    editProjectHandle(projectInfo) {
      this.formData = projectInfo;
      this.formData.description = this.formData.description.toString();//这里处理的是方便v-mode绑定，input绑定会报错
      console.log(this.formData);
      this.dialogVisible = true;
    },

    //删除
    deleteProjectHandle(projectInfo) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAproject(projectInfo).then(() => {
          this.$message.success("删除成功");
          this.fetchData();//重新加载数据
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //这是element-ui下拉列表的坑，需要绑定change事件来强制更新
    changeHandle() {
      this.$forceUpdate();
    },
    /* 确认编辑 */
    confirmEditProjectHandle() {
      let data = {};//创建一个空对象来放数据
      data.data = { ...this.formData };//复制一份
      data.data.description = data.data.description.split(',');//把字符串转换为素组
      delete (data.data.thumb2);//删除多余的属性
      data.id = data.data.id;//这里只是方便api
      delete (data.data.id);//删除多余属性
      console.log(data)
      reviseAproject(data).then((res) => {
        this.$message.success("编辑成功");
        setTimeout(() => {
          this.dialogVisible = false;
          this.fetchData();//重新拿取数据
        }, 500);
      })
    }

  },
  created() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.projectName:hover {
  text-decoration-line: underline;
}

.form-container {
  padding: 2rem 10rem;
}
</style>