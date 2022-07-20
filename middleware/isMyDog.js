// 自分の飼い犬以外の更新ページにアクセスできないようにする
export default function ({ params, redirect, store }) {
  const myDogList = store.state.auth.user.dog.map(x => x.id);
  const id = Number(params.id);
  if (!myDogList.includes(id)) {
    redirect('/mypage');
  }
}