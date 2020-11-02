<template>
  <v-container class="grid" fill-height fluid>
    <v-img
            SameSite=Lax height="300" max-height="300"
            src="https://source.unsplash.com/1600x900/?bike,cycling"
    >
      <v-row>
        <v-col cols="2" offset="1">
          <profile-card/>
        </v-col>
      </v-row>

    </v-img>
    <v-row
    >
      <v-col cols="6">
        <athletes/>
      </v-col>
      <v-col cols="6">
        <file-upload-card/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import ProfileCard from "./ProfileCard";
    import FileUploadCard from "./FileUploadCard";
    import Athletes from "./Athletes";

    export default {
        name: "ProfileManagement",
        components: {Athletes, FileUploadCard, ProfileCard},
    }
</script>

