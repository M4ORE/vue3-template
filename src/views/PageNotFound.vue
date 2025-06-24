<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="7" lg="5">
                <v-img :src="notFoundImage" width="800" height="800" contain></v-img>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-card elevation="0" max-width="480px">
                    <v-card-text>
                        <p class="display-3 font-weight-bold">糟糕...</p>
                        <p class="display-1">頁面<span class="font-weight-bold">不存在</span></p>
                        <p class="text-h6">抱歉，您請求的頁面不存在。</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="$router.push('/home')">返回首頁</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script setup>
import notFoundImage from '@/assets/404.png';
</script>