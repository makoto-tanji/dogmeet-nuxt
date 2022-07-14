export default function ({ params, redirect, store }) {
  const paramsId = Number(params.id);
  const userId = store.state.auth.user.id;
  if (paramsId !== userId) {
    redirect('/');
  };

}