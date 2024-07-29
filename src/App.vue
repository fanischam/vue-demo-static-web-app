<template>
  <div>
    <h1>Submit Data to Storage Account</h1>
    <form @submit.prevent="submitData">
      <div>
        <label for="storageFileName">File Name::</label>
        <input
          type="text"
          id="storageFileName"
          v-model="storageFileName"
          required
        />
      </div>
      <div>
        <label for="fileBody">File Body:</label>
        <input type="text" id="fileBody" v-model="fileBody" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      storageFileName: "",
      fileBody: "",
    };
  },
  methods: {
    async submitData() {
      try {
        const response = await axios.post("/api/message", {
          storageFileName: this.storageFileName,
          fileBody: this.fileBody,
        });
        console.log("Response: ", response.data);
      } catch (e) {
        console.error("Error: " + e);
      }
    },
  },
};
</script>
