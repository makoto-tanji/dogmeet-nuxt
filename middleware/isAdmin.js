export default function ({ redirect, store }) {
  if (store.state.auth.user.role !== 1) {
    redirect('/');
  };
}