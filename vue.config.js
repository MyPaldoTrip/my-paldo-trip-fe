const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.200.254.60:8080' //ec2 퍼블릭 주소, 배포용
        // target: 'http://localhost:8080' //로컬호스트 기본 주소, 개발용
      }
    }
  }
})
