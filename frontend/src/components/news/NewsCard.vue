<template>
  <div class="news-card">
    <img :src="image" alt="News Image" class="news-image" />
    <h2 class="news-title">{{ title }}</h2>
    <p class="news-description">{{ description }}</p>
    <a :href="link" class="news-link">Read more</a>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.news-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: #fff;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-title {
  font-size: 1.75em;
  margin-bottom: 10px;
  color: #333;
}

.news-description {
  font-size: 1.1em;
  margin-bottom: 20px;
  color: #555;
}

.news-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

.news-link {
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}
.news-link:hover {
  text-decoration: underline;
}
</style>