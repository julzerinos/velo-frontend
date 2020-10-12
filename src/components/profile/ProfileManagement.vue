<template>
  <v-container>
    <v-img
            SameSite=Lax height="300" max-height="300"
            src="https://source.unsplash.com/1600x900/?bike,cycling"
    >

    </v-img>
    <v-row
            align="end"
            class="fill-height"
    >
      <v-col cols="8">
        <profile-card/>
      </v-col>
      <v-col cols="4">
        <file-upload-card/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import ProfileCard from "./ProfileCard";
    import FileUploadCard from "./FileUploadCard";

    export default {
        name: "ProfileManagement",
        components: {FileUploadCard, ProfileCard},
    }
</script>

