<template>
    <div>
        <!-- 标题 -->
        <div class="block">{{ uploadTitle }}</div>

        <!-- 上传控件 -->
        <el-upload class="avatar-uploader" action="/api/upload" :headers="headers" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="value" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
// import { server_URL } from '@/urlConfig.js'
export default {
    props: ['uploadTitle', 'value'],
    computed: {
        imgUrl() {//处理图片地址
            if (this.value) {
                // return server_URL + this.value
                return this.value;
            }
        },
        headers() {//设置请求头
            return {
                Authorization: "Bearer " + localStorage.getItem('adminToken'),//获取token添加到header
            }
        }
    },
    methods: {
        handleAvatarSuccess(res) {//上传成功之后的函数，res是一些响应
            if (!res.code && res.data) {//上传成功服务器给我们返回了地址
                this.$emit("input", res.data);
            } else {
                this.$message.error("图片尺寸过大，请重试")
            }
        },
        beforeAvatarUpload() {//上传之前的回调
            console.log('图片正在上传')
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    margin: 0.9rem 0;
    font-weight: 100;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;

    &:hover {
        border-color: #409EFF;
    }
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>