<template>
  <button type="button" class="create-button"><router-link :to="`/cities`">도시생성</router-link></button>
  <label>
    Sort By:
    <select v-model="searchReq.citySort" @change="handleChange">
      <option value="INITIAL">최신순</option>
      <option value="COUNT">여행 정보 많은 순</option>
      <!-- 필요한 경우 다른 옵션 추가 -->
      <button type="button" class="create-button"><router-link :to="`/cities`">도시생성</router-link></button>
    </select>
  </label>
  <div>
    <div v-for="province in provinces" :key="province.provinceName">
      <h3 @click="toggleCityList(province)">{{ province.provinceName }}</h3>
      <div v-if="province.showCityList">
        <div class="city-card" v-for="city in province.cityList" :key="city.cityId">
          <h4>
            <router-link :to="`/getTripCourse/${city.cityName}`">{{ city.cityName }}</router-link>
            <button type="button" class="create-button"><router-link :to="`/cities/${city.cityId}/update`">도시 수정</router-link></button>
            <button type="button" class="create-button"><router-link :to="`/cities/${city.cityId}/delete`">도시 삭제</router-link></button>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {


  setup() {
    const provinces = ref([]);

    const searchReq = ref({
      citySort: 'INITIAL'
    });

    const fetchProvinces = () => {
      axios.post('/api/v1/cities/provinces/infoSort', searchReq.value, {
        params: {},
        headers: {'Authorization': localStorage.getItem('Authorization')}
      })
      .then(response => {
        provinces.value = response.data.data.map(city => ({
          provinceName: city.provinceName,
          showCityList: false,
          cityList: [] // 도시 목록을 담을 배열 추가
        }));
        console.log(searchReq);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(searchReq);
      });
    };

    const handleChange = () => {
      // 옵션 변경이 감지되었을 때 fetchCities 호출
      fetchProvinces();
    };

    const fetchCitiesByProvince = (province) => {
      // 클릭한 provinceName으로 도시 목록을 가져오기

      axios.get(`/api/v1/cities/provinces/${province.provinceName}`, {
        headers: {'Authorization': localStorage.getItem('Authorization')}
      })
      .then(response => {
        province.cityList = response.data.data;
        console.log(response)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
    const toggleCityList = (province) => {
      // 클릭한 province의 showCityList 값을 토글
      province.showCityList = !province.showCityList;
      if (province.showCityList) {
        // 클릭한 province의 도시 목록을 가져오기
        fetchCitiesByProvince(province);
      }
    };

    onMounted(fetchProvinces);

    return {
      provinces,
      searchReq,
      fetchProvinces,
      fetchCitiesByProvince,
      handleChange,
      toggleCityList
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.search-field input, .search-field select {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  height: 30px;
}

.create-button {
  margin: 38px 0;
  padding: 5px;
  font-size: 14px;
  height: 30px;
  border: none;
  background-color: #888888;
  color: white;
  cursor: pointer;
  transition: background-color .3s;
}

.create-button:hover {
  background-color: #666666;
}

.search-field {
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-width: 300px;
}

.search-field label {
  margin-bottom: 5px;
}

.trip-table {
  margin: auto;
  border-collapse: separate;
  border-spacing: 10px;
}

.trip-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
