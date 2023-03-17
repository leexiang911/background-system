<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <div class="searchBox">
      <el-input placeholder="请输入要添加的分类，并在左边选择该分类的等级" style="width: 25vw;margin-right: 0.8rem;" role="input"
        v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 6rem;">
          <el-option label="级别1" value="1" algin="center"></el-option>
          <el-option label="级别2" value="2" algin="center"></el-option>
          <el-option label="级别3" value="3" algin="center"></el-option>
          <el-option label="级别4" value="4" algin="center"></el-option>
          <el-option label="级别5" value="5" algin="center"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="addBlogTypeHandle">添加</el-button>
    </div>

    <!-- 表格 -->
    <div class="formData">
      <el-table :data="data" style="width: 100%;margin-bottom: 3rem;" border stripe>
        <!-- 序号 -->
        <el-table-column prop="order" label="序号" width="80" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 /* + (currentPage - 1) * eachPage */ }}</template>
        </el-table-column>

        <!-- 文章类别 -->
        <el-table-column prop="name" label="文章类别" width="auto" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <!-- 文章级别 -->
        <el-table-column prop="name" label="重要级别" width="auto" align="center">
          <template slot-scope="scope">{{ scope.row.order }}</template>
        </el-table-column>
        <!-- 文章数量 -->
        <el-table-column label="文章数量" align="center">
          <template slot-scope="scope">{{ scope.row.articleCount
          }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
              <el-button type="info" icon="el-icon-edit" circle size="mini" @click="editBlogTypeHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
              <el-button type="danger" icon="el-icon-delete" circle size="mini"
                @click="deleteBlogTypeHandle(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑提示框 -->
    <el-dialog title="请编辑该分类信息" :visible.sync="dialogFormVisible" top="5vh" width="30%">
      <el-form :model="editData">
        <!-- 分类名称 -->
        <el-form-item label="分类名称" label-width="400">
          <el-input v-model="editData.name"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="请选择重要等级">
          <el-select v-model="editData.order">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBlogTypeEditHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,//添加文章分类
  getAblogType,//获取一个分类
  getBlogType,//获取文章分类
  deleteBlogType,//删除文章分类
  reviseBlogType,//修改文章分类
} from '@/api/blogType.js';//引入api
export default {
  data() {
    return {
      //绑定输入框的内容
      input: "",
      select: "",

      //table
      data: [],
      listIsLoading: false,
      dialogFormVisible: false,//编辑对话框提示
      editData: {
        name: '',
        order: '',
        id: '',
      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBlogType().then((res) => {
        console.log(res)
        this.data = res.data;
      });
    },
    //添加文章类别
    addBlogTypeHandle() {
      let order = this.select;//重要级别order
      let name = this.input;//输入的类别名字
      if (this.select === '') { order = '5' };//如果重要级别没有输入默认是5
      if (this.input === '') {
        this.$message.error("请填写分类名称");
      } else {
        addBlogType({ name, order }).then(() => {//添加好了之后就重新拿数据，弹出提示
          this.fetchData();
          this.$message.success("添加成功");
          this.input = '';
        });
      }

    },

    //编辑文章类别
    editBlogTypeHandle(blogTypeInfo) {
      this.editData.name = blogTypeInfo.name;
      this.editData.order = blogTypeInfo.order;
      this.editData.id = blogTypeInfo.id;
      this.dialogFormVisible = true;
      //这个获取单个函数其实用不用也无所谓，本人改写，不需要用也行，用的话等于是两次验证,上面代码和下面代码随便选一个，都可以
      getAblogType(blogTypeInfo.id).then(({ data }) => {
        console.log(data, "resres");
        this.editData.name = data.name;
        this.editData.order = data.order;
        this.editData.id = data.id;
      })
    },

    //删除文章类别
    deleteBlogTypeHandle(blogTypeInfo) {
      let blogTypeId = blogTypeInfo.id;//文章分类id
      this.$confirm('此操作将永久删除该文章分类，该分类状态下的文章将变为未分类状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlogType(blogTypeId).then(() => {
          this.$message.success("删除成功");
          this.fetchData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //确认文章编辑按钮
    confirmBlogTypeEditHandle() {
      let data = {
        id: this.editData.id,
        data: {
          name: this.editData.name,
          order: this.editData.order,
        },
      }

      //   reviseBlogType({d}).then(res => {
      //     this.dialogFormVisible = false; // 关闭掉对话框
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success'
      //     });
      //     this.fetchData();}
      //   console.log(data, 'data6')
      reviseBlogType(data).then(res => {
        this.dialogFormVisible = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.fetchData();
        console.log(res, 'resss')
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox {
  padding-bottom: 3rem;
}
</style>