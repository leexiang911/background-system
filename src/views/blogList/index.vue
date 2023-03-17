<template>
  <div class="app-container">
    <h3>文章列表</h3>

    <el-table :data="data" style="width: 100%;margin-bottom: 3rem;" border stripe>
      <!-- 序号 -->
      <el-table-column prop="date" label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * eachPage }}</template>
      </el-table-column>
      <!-- 文章标题 -->
      <el-table-column prop="title" label="文章标题" width="auto" align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="博客预览图" width="230" trigger="hover">
            <p style="user-select: none;" slot="reference" @click="demo(scope.row)">{{ scope.row.title }}</p>
            <el-image style="width: auto; height: auto" :src="scope.row.thumb" fit="contain" :preview-src-list="srcList"
              @click="demo"></el-image>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 文章描述 -->
      <el-table-column prop="description" label="文章描述" width="auto">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="浏览量" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber
        }}</template>
      </el-table-column>
      <!-- 评论量 -->
      <el-table-column label="评论量" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <!-- 所属分类 -->
      <el-table-column label="所属分类" align="center">
        <template slot-scope="scope">{{ scope.row.category == null ? "未分类" : scope.row.category.name }}</template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column label="创建日期" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="info" icon="el-icon-edit" circle size="mini" @click="editBannerHandle(scope.row)">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlog(scope.row.id)">
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination background layout="prev, pager, next, total, ->, sizes, jumper" :total="count" :page-size="eachPage"
      :page-sizes="[1, 5, 10, 15]" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      @prev-click="prveClickHandle" @next-click="nextClickHandle">
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, deleteOneBlog } from '@/api/blog.js';
import { formatDate } from '@/utils/tools';//引入时间工具
// import { server_URL, frontEnd_URL } from '@/urlConfig.js';
import { editBlog } from '@/api/blog.js';

export default {
  data() {
    return {
      data: [],//空数组用来存放数据
      srcList: [],
      eachPage: 1,//每页显示多少条数据，
      currentPage: 1,//当前页码，默认进来是第一页
      totalPage: 0,//总页码数   /* 需要动态计算 */
      count: 0,//数据总条数     /* 需要动态计算 */
      // pagerCurrentPage: 1,//分页栏的当前页码
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (let item of this.data) {
          item.createDate = formatDate(item.createDate);//处理时间
          // item.thumb = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 这里的if可能会在删除文章的时候触发
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();//重新请求数据
        }
      }
      );

    },
    demo(i) {
      console.log(i)
      window.open(`${frontEnd_URL}/article/${i.id}`)
    },
    //文章编辑
    editBannerHandle(blogInfo) {
      editBlog(blogInfo.id).then(() => {
        this.$router.push({ name: "EditBlog", params: { id: blogInfo.id } });//跳转到编辑
      })
    },
    /* 删除按钮点击的事件 */
    deleteBlog(id) {
      this.$confirm('此操作将永久删除该文章以及评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOneBlog(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();//重新获取数据
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 分页相关事件
    sizeChangeHandle(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      // this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    /* 上一页 */
    prveClickHandle() {
      this.currentPage -= 1;
    },
    /* 下一页 */
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
  mounted() { }
}
</script>

<style>

</style>