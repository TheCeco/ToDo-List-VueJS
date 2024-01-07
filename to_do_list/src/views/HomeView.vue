<template>
  <div class="home">
    <div id="search">
      <input v-model="search" @input="searchProfile" />
      <p v-if="this.search.length === 0 || !searchPerformed">No results</p>
      <ul v-else>
        <li v-for="profile in this.result" :key="profile.id">
          {{ profile.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import profiles from '@/profiles.json'

export default {
  name: 'HomeView',
  data () {
    return {
      storedData: [],
      result: [],
      search: '',
      searchPerformed: false
    }
  },
  methods: {
    searchProfile () {
      profiles = JSON.parse(localStorage.getItem('profiles'))

      this.result = []

      profiles.forEach((profile) => {
        if (profile.username.includes(this.search)) {
          this.result.push(profile)
        }
      })

      this.searchPerformed = true

      if (this.result.length === 0) {
        this.searchPerformed = false
      }
    }
  }
}
</script>
