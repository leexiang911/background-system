<template>
    <div class="personal-container">

        <el-form :rules="rules" :model="dataForm" ref="ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input placeholder="请输入用户名" v-model="dataForm.name" maxlength="12" minlength="5"></el-input>
            </el-form-item>

            <el-form-item label="旧密码" prop="oldPwd">
                <el-input placeholder="请输入旧密码" v-model="dataForm.oldPwd"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPwd">
                <el-input placeholder="请输入新密码" v-model="dataForm.newPwd" show-password></el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="confirmPwd">
                <el-input placeholder="请再次输入新密码" v-model="dataForm.confirmPwd" show-password></el-input>
            </el-form-item>
        </el-form>

        <el-row style="display: flex; justify-content: space-between">
            <el-button type="primary" style="margin-right: 3rem;" @click="reviseHandle">修改</el-button>
            <el-button type="info" style="margin-left: 3rem;" @click="backHandle">返回</el-button>
        </el-row>

    </div>
</template>

<script>
import { getInfo, reviseInfo } from '@/api/user'
export default {
    data() {

        let validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
        };

        let validateOldPwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('旧密码不能为空'));
            }
            if (value.length < 5) {
                return callback(new Error('长度必须大于5'));
            }
            if (value.length > 16) {
                return callback(new Error('长度不能大于16'));
            }
        };

        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.dataForm.confirmPwd !== '') {
                    this.$refs.ruleForm.validateField('confirmPwd');
                }
                callback();
            }
        };

        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.dataForm.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };


        return {
            dataForm: {
                name: "",
                oldPwd: "",
                newPwd: "",
                confirmPwd: "",
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' }
                ],
                oldPwd: [
                    { validator: validateOldPwd, trigger: 'blur' }
                ],
                newPwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                confirmPwd: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },

        }
    },
    methods: {
        fetchData() {
            getInfo().then((res) => {
                this.dataForm.name = res.data.name;
                this.dataForm.id = res.data.id;
                this.dataForm.loginId = res.data.loginId;
                console.log(res)
            });
        },

        //修改
        reviseHandle() {
            let obj = { name: "", loginId: "", loginPwd: "", oldLoginPwd: "" }
            if (this.dataForm.name && this.dataForm.oldPwd && this.dataForm.newPwd && this.dataForm.confirmPwd) {
                obj.name = this.dataForm.name;
                obj.loginPwd = this.dataForm.confirmPwd;
                obj.loginId = this.dataForm.loginId
                obj.oldLoginPwd = this.dataForm.oldPwd;
                console.log(obj)

                reviseInfo(obj).then((res) => {
                    this.$message.success("密码修改成功");
                    this.$store.dispatch('user/logout').then(() => {
                        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
                    });
                })
            } else {
                this.$message.error("请检查每一项是否有误")
            }

        },
        backHandle() {
            this.$router.push('/')
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style lang="scss" scoped>
.personal-container {
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 8rem 20%;
}
</style>