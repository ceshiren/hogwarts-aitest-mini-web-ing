<template>
    <div>
        <v-app-bar dark dense>
            <v-toolbar-title style="width:100px">AITEST</v-toolbar-title>
            <v-tabs>
                <v-tab @click="$router.push('/jenkins')">Jenkins管理</v-tab>
                <v-tab @click="$router.push('/case')">用例管理</v-tab>
                <v-tab @click="$router.push('/task')">任务管理</v-tab>
                <v-tab @click="$router.push('/report')">报告管理</v-tab>
            </v-tabs>
            <v-btn @click="logout()">退出</v-btn>
        </v-app-bar>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        logout(){
            this.$api.user.logout().then(
                res =>{
                    this.$router.push('/')
                }
            )
        }
    }
}
</script>

<style scoped>

</style>