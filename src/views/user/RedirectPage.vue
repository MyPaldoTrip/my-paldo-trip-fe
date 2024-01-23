<script>
import axios from "axios";
import router from "@/router";

const getKakaoInfo = async (code) => {
  const response = await axios.get('/api/v1/users/kakao-login', {params: {code: code}})
  const authorization = response.headers.getAuthorization();
  localStorage.setItem('Authorization', authorization)
}
let code = null
export default {

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get('code')
    getKakaoInfo(code)
    router.push("/")
    alert("카카오 로그인 성공")
  },
}
</script>