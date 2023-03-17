<template>
  <div class="app-container">
    <h3>评论列表</h3>

    <el-table :data="data" style="width: 100%;margin-bottom: 3rem;" border stripe>
      <!-- 序号 -->
      <el-table-column prop="date" label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * eachPage }}</template>
      </el-table-column>
      <!-- 文章 -->
      <el-table-column prop="title" label="头像" width="auto" align="center">
        <template slot-scope="scope">
          <!-- <el-popover placement="top-start" title="博客预览图" width="230" trigger="hover">
            <p style="user-select: none;" slot="reference" @click="demo(scope.row)">{{ scope.row.title }}</p>
            <el-image style="width: auto; height: auto" :src="scope.row.thumb" fit="contain" :preview-src-list="srcList"
              @click="demo"></el-image>
          </el-popover> -->
          <el-image :src="scope.row.avatar"></el-image>

        </template>
      </el-table-column>
      <!--  -->
      <el-table-column prop="昵称" label="昵称" width="auto" align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="评论文章" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber
        }}</template>
      </el-table-column>
      <!-- 评论量 -->
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <!-- 所属分类 -->
      <el-table-column label="所属分类" align="center">
        <template slot-scope="scope">{{ scope.row.category == null ? "未分类" : scope.row.category.name }}</template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column label="评论日期" align="center" width="300">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlog(scope.row.id)">
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination background layout="prev, pager, next, total, ->, sizes, jumper" :total="count" :page-size="eachPage"
      :page-sizes="[1, 5, 10, 15]" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      @prev-click="prveClickHandle" @next-click="nextClickHandle" :current-page.sync="pagerCurrentPage">
    </el-pagination>
  </div>
</template>

<script>
// import { getMessages } from '@/api/message';
import { getComments, deleteComments } from '@/api/comment'
import { formatDate } from '@/utils/tools.js'
export default {
  data() {
    return {
      data: [],//空数组用来存放数据
      srcList: [],
      eachPage: 1,//每页显示多少条数据，
      currentPage: 1,//当前页码，默认进来是第一页
      totalPage: 0,//总页码数   /* 需要动态计算 */
      count: 0,//数据总条数     /* 需要动态计算 */
      pagerCurrentPage: 1,//分页栏的当前页码
    }
  },
  methods: {
    fetchData() {
      getComments(this.currentPage, this.eachPage).then((res) => {
        this.data = res.data.rows;
        this.count = res.data.total;
        for (let item of this.data) {
          item.createDate = formatDate(item.createDate);//处理时间
        }
        console.log(this.data)
      });


      // findBlog().then(({ data }) => {
      //   this.data = data.rows;
      //   for (let item of this.data) {
      //     item.createDate = formatDate(item.createDate);//处理时间
      //     item.thumb = server_URL + item.thumb;
      //     this.srcList.push(item.thumb);
      //   }
      //   this.count = data.total;
      //   this.totalPage = Math.ceil(this.count / this.eachPage);
      //   // 这里的if可能会在删除文章的时候触发
      //   if (this.currentPage > this.totalPage) {
      //     this.currentPage = this.totalPage;
      //     this.fetchData();//重新请求数据
      //   }
      // }
      // );
    },
    sizeChangeHandle(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
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
    deleteBlog(id) {
      this.$confirm("是否删除此条评论信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          deleteComments(id).then((res) => {
            console.log(res);
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },

  created() {
    this.fetchData();
  }
}
</script>

<style></style>































