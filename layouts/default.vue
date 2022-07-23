<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      color="secondary"
      disable-resize-watcher
      fixed
      app
    >
      <v-list v-if="!$store.state.auth.loggedIn">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.title"
              class="white--text"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, i) in itemsLogined"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.title"
              class="white--text"
            />
          </v-list-item-content>
        </v-list-item>
        <LogoutComponent />
        <v-list-item
          v-show="$store.state.auth.user.role === 1"
          class="mail-link-item">
          <v-list-item-action>
            <v-icon> mdi-email </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <NuxtLink
                to="/admin/mail"
                class="white--text"
              >
                メール送信ページ
              </NuxtLink>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-show="$store.state.auth.user.role === 1"
          class="mail-link-item">
          <v-list-item-action>
            <v-icon> mdi-account-edit </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <NuxtLink
                to="/admin/role"
                class="white--text"
              >
                飼い主登録
              </NuxtLink>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color="primary"
      elevate-on-scroll
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title
        v-if="$store.state.auth.loggedIn"
        class="white--text text-md-h6"
      >
        ようこそ　{{ $auth.user.name }}さん
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title
        v-text="title"
        class="white--text"
      />
    </v-app-bar>
    <v-main class="background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default{
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-account-plus',
          title: '新規登録',
          to: '/register'
        },
        {
          icon: 'mdi-login',
          title: 'ログイン',
          to: '/login'
        }
      ],
      itemsLogined: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'マイページ',
          to: '/mypage'
        },
      ],
      miniVariant: false,
      title: 'DogMeet'
    }
  }, //end data
}
</script>

<style scoped>
.mail-link-item{
  cursor: pointer;
}
.mail-link-item::before{
  background-color: currentColor;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>